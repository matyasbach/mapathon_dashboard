'use strict';

import moment from 'moment';
import PubSub from './PubSub';
import { getAccumulatedFeatures } from './Charts';
import { getProjectData, getBBox, getProjectContributions, getChangesets, getOSMBuildings } from './Ajax';

function getCharts(startDateTime, endDateTime, OSMData) {
  const charts = {};
  if (OSMData.building) charts.building = getAccumulatedFeatures(startDateTime, endDateTime, OSMData.building.features);

  return charts;
};

function updateUserStats(userStats, OSMData, contributions) {
  function sortByCount(a, b) { return b.count - a.count; }
  function getMappedFeaturesPerUser(features) {
    const aggregatedFeatures = new Map();
    features.forEach(feature => {
      const { user } = feature.properties;
      aggregatedFeatures.set(user, (aggregatedFeatures.get(user) + 1 || 1));
    });
    return [...aggregatedFeatures]
      .map(feature => ({ user: feature[0], count: feature[1] }))
      .sort(sortByCount);
  }

  function getContributions(type) {
    return contributions
      .filter(contribution => contribution[type] != 0)
      .map(contribution => ({ user: contribution.username, count: contribution[type] }))
      .sort(sortByCount);
  }

  if (OSMData && OSMData.building) userStats.mappedBuildingsPerUser = getMappedFeaturesPerUser(OSMData.building.features);
  if (contributions) {
    userStats.tasksPerMapper = getContributions('mapped');
    userStats.tasksPerValidator = getContributions('validated');
  }
};

export function reduceState(state, action) {
  function reset(state) {
    return state;
  }

  state = reset(state);
  if (!state.dashboard) {
    state.delay = 30 * 1000,
    state.dashboard = {
      userStats: {}
    };
  }

  const dataUpdate = function () {
    state.timeoutId = null;

    getProjectContributions(state.project.id);
    getChangesets(state.bbox, state.startDateTime, getEndDateTime(), state.project.id);
  };

  const getEndDateTime = () => state.endDateTime.isValid() ? state.endDateTime : moment();

  switch (action.type) {
    case 'SET_ERROR':
      // TODO: error handling
      // - longer timeout in case of OSM API overfetching
      // - show error somewhere
      return state;
    case 'GET_OSM_DATA':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }

      const { projectId, startDateTime, endDateTime, server } = action.payload;
      console.log(endDateTime);
      state.errorMessage = null;
      state.project = {};
      state.project.id = projectId;
      state.startDateTime = startDateTime;
      state.endDateTime = endDateTime;
      state.server = server;
      state.bbox = null;
      state.changesets = null;
      state.OSMData = null;
      state.leaderboard = null;
      state.calculations = null;
      getProjectData(projectId);
      getBBox(projectId);
      getProjectContributions(projectId);

      PubSub.publish("DASHBOARD_RESET", state);

      return state;
    case 'SET_PROJECT_DATA':
      Object.assign(state.project, action.payload);
      PubSub.publish("DATASOURCE_UPDATED_HOTOSM", state);
      return state;
    case 'SET_BBOX':
      state.bbox = action.payload;
      getChangesets(state.bbox, state.startDateTime, getEndDateTime(), state.project.id)
      return state;
    case 'SET_CONTRIBUTIONS_DATA':
      updateUserStats(state.dashboard.userStats, null, action.payload.userContributions);
      PubSub.publish("DATASOURCE_UPDATED_HOTOSM_CONTRIB", state );
      return state;
    case 'SET_CHANGESETS':
      state.changesets = action.payload;
      getOSMBuildings(state.bbox, state.startDateTime, getEndDateTime(), state.server, state.changesets);
      return state;
    case 'SET_OSM_DATA_AND_LEADERBOARD':
      state.OSMData = action.payload.OSMData;
      state.leaderboard = action.payload.leaderboard;
      state.calculations = action.payload.calculations;
      state.dashboard.charts = getCharts(state.startDateTime, getEndDateTime(), state.OSMData);
      state.loadingMessage = null;
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      updateUserStats(state.dashboard.userStats, state.OSMData);

      PubSub.publish("DATASOURCE_UPDATED_OSM", state );
      return state;
    case 'UPDATE_CHANGESETS_AND_OSM_DATA':
      state.changesets = action.payload.changesets;
      state.OSMData = action.payload.OSMData;
      state.leaderboard = action.payload.leaderboard;
      state.calculations = action.payload.calculations;
      state.dashboard.charts = getCharts(state.startDateTime, getEndDateTime(), state.OSMData);
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      updateUserStats(state.dashboard.userStats, state.OSMData);

      PubSub.publish("DATASOURCE_UPDATED_OSM", state );
      return state;
  }

  return state;
}