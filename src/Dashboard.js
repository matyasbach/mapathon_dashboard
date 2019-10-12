'use strict';

import moment from 'moment';
import PubSub from './PubSub';
import { getAccumulatedFeatures } from './Charts';

function getCharts(startDateTime, endDateTime, OSMData) {
  const charts = {};
  if (OSMData.building) charts.building = getAccumulatedFeatures(startDateTime, endDateTime, OSMData.building.features);

  return charts;
};

export function reduceState(state, action) {
  function reset(state) {
    return state;
  }
  
  state = reset(state);
  if (!state.dashboard) state.dashboard = {};

  const dataUpdate = function()
  {
    state.timeoutId = null;
    PubSub.publish('ACTIONS', state);
  };

  switch (action.type) {
    case 'SET_ERROR':
      state.errorMessage = action.payload.errorMessage;
      state.loadingMessage = null;
      state.project = null;
      state.bbox = null;
      state.changesets = null;
      state.OSMData = null;
      state.leaderboard = null;
      if(state.timeoutId)
      {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
      state.calculations = null;
      return state;
    case 'GET_OSM_DATA':
      if(state.timeoutId)
      {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
      state.errorMessage = null;
      state.project = {};
      state.project.id = action.payload.projectId;
      state.startDateTime = action.payload.startDateTime;
      state.endDateTime = action.payload.endDateTime;
      state.server = action.payload.server;
      state.bbox = null;
      state.changesets = null;
      state.OSMData = null;
      state.leaderboard = null;
      state.calculations = null;
      return state;
    case 'SET_PROJECT_DATA':
      Object.assign(state.project, action.payload);
      return state;
    case 'SET_BBOX':
      state.bbox = action.payload;
      return state;
    case 'SET_CHANGESETS':
      state.changesets = action.payload;
      return state;
    case 'SET_OSM_DATA_AND_LEADERBOARD':
      state.OSMData = action.payload.OSMData;
      state.leaderboard = action.payload.leaderboard;
      state.calculations = action.payload.calculations;
      state.dashboard.charts = getCharts(state.startDateTime, state.endDateTime, state.OSMData);
      state.loadingMessage = null;
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      return state;
    case 'UPDATE_CHANGESETS_AND_OSM_DATA':
      state.changesets = action.payload.changesets;
      state.OSMData = action.payload.OSMData;
      state.leaderboard = action.payload.leaderboard;
      state.calculations = action.payload.calculations;
      state.dashboard.charts = getCharts(state.startDateTime, state.endDateTime, state.OSMData);
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      return state;
  }

  return state;
}