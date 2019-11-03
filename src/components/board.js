'use strict';

import h from 'snabbdom/h';

import { init } from 'snabbdom';
const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/dataset').default,
  require('snabbdom/modules/style').default
]);



export function createBoardTasks(msg, model) {

	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.tasksPerMapper) return null;
	
	var list = model.dashboard.userStats.tasksPerMapper.map(task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});

	var e = document.getElementById("board2");
	
	if (e) {
		patch(e, h('div', {}, list));
	}
}

export function createBoardBuildings(msg, model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.mappedBuildingsPerUser) return null;
	
	var list = model.dashboard.userStats.mappedBuildingsPerUser.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});
	
	var e = document.getElementById("board1");
	
	if (e) {
		patch(e, h('div', {}, list));
	}
}

export function createBoardValidators(msg, model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.tasksPerValidator) return null;
	
	var list = model.dashboard.userStats.tasksPerValidator.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});

	var e = document.getElementById("board5");
	
	if (e) {
		patch(e, h('div', {}, list));
	}
	
}
