'use strict';

import h from 'snabbdom/h';



export function createBoard(model) {
	
	if(!model || !model.dashboard || !model.dashboard.userStats || !model.dashboard.userStats.tasksPerMapper) return null;
	
	var list = model.dashboard.userStats.tasksPerMapper.map( task => {
		return h('div', {style: {color: '#000'}}, [ h('p', task.user), h('p', task.count) ]);		
	});
	
	console.log(list);
	
	var list = h('div', {style: {color: '#000'}}, [ h('p', 'aaaa'), h('p', 3) ]);
	
	return h('div', {}, list);
	
}
