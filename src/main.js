'use strict';

import moment from 'moment';
import { init } from 'snabbdom';
import h from 'snabbdom/h';
import PubSub from './PubSub';
import App from './components/App';
import { reduceState as reduceDashboardState } from './Dashboard';

const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/dataset').default,
  require('snabbdom/modules/style').default
]);

let node = {};
let state = {};

const initialState = {
  loadingMessage: null,
  startDateTime: moment().add(-60, 'm').set('minute', 0),
  endDateTime: moment().add(1, 'h').set('minute', 0),
  delay: 5*60*1000,
  project: null,
  bbox: null,
  changesets: null,
  OSMData: null,
  leaderboard: null,
  timeoutId: null,
  calculations: null,
  dashboard: null
};

export function reduce(state, action) {

  function reset(state) {
    state.dashboard = null;
    return state;
  }

  state = reset(state);

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
      state.loadingMessage = null;
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      return state;
    case 'UPDATE_CHANGESETS_AND_OSM_DATA':
      state.changesets = action.payload.changesets;
      state.OSMData = action.payload.OSMData;
      state.leaderboard = action.payload.leaderboard;
      state.calculations = action.payload.calculations;
      state.lastUpdateTime = moment();
      state.timeoutId = window.setTimeout(dataUpdate, state.delay);
      return state;
  }

  return state;
}

export function updateState(msg, action) {
  state = reduce(state, action);
  update();
}

export function updateDashboardState(msg, action) {
  state = reduceDashboardState(state, action);
  update();
}

function update() {
  console.log(state);
  const newNode = App(state);
  patch(node, newNode);
  node = newNode;
}

function main(initState, initVnode, App) {
  node = initVnode;
  state = initState;

  PubSub.subscribe('ACTIONS', updateState);
  PubSub.publish('ACTIONS', { type: 'START' });
}

main(initialState, document.querySelector('#root'), App);