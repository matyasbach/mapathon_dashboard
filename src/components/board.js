'use strict';

import h from 'snabbdom/h';



export function createBoardTasks(model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.tasksPerMapper) return null;
	
	var list = model.dashboard.userStats.tasksPerMapper.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});
	
	console.log(list);
	
	//var list = h('div', {style: {color: '#000'}}, [ h('p', 'aaaa'), h('p', 3) ]);
	
	return h('div', {}, list);
	
}

export function createBoardBuildings(model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.mappedBuildingsPerUser) return null;
	
	var list = model.dashboard.userStats.mappedBuildingsPerUser.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});
	
	console.log(list);
	
	return h('div', {}, list);
	
}

export function createBoardValidators(model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.tasksPerValidator) return null;
	
	var list = model.dashboard.userStats.tasksPerValidator.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user + ": "+ task.count) ]);		
	});
	
	console.log(list);
	
	return h('div', {}, list);
	
}
