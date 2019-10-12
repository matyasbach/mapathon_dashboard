'use strict';

import PubSub from './PubSub';

export function reduceState(state, action) {
  
  switch (action.type) {
    default:
      state = Object.assign(state || {}, { charts: { building: [] } });
      PubSub.publish('ACTIONS', action); 
  }

  return state;
}