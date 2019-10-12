'use strict';

import '../styles/layout.css';
import h from 'snabbdom/h';
import { inputCheckbox, inputNumber, inputText, form, select, option, div, paragraph, progressBar, a } from './basic';

import createFeatureChart from './chart';

export default function dashboard(model) {
  return div({
    classes: ['task-sub-section', 'three-column-task-sub-section'],
    children: [
      div({
        id: '',
        children: [
          h('h4', {}, 'Dashboard'),
        ]
      }),
      chart(model)
    ]
  })
}

export function chart(model)
{
  return div({
    classes: ['task-info-key'],
    children: [
      h('canvas', {attrs: {id:'featureChart', width: 300, height: 200},
        hook: {
          insert: (vnode) => { createFeatureChart(model); }
        }
      })
    ]
  })
}