'use strict';

import '../styles/layout.css';
import { HOTOSM_PROJECT_URL } from '../Variables';
import h from 'snabbdom/h';

import { init } from 'snabbdom';
const patch = init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/eventlisteners').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/dataset').default,
  require('snabbdom/modules/style').default
]);

import { div, paragraph, a } from './basic';

import { createFeatureChart, createStatusChart } from './chart';
import { createBoardTasks, createBoardBuildings, createBoardValidators } from './board';
import PubSub from '../PubSub';


const loader = () => div({
  classes: ['loader'],
  children: [
    paragraph({ text: 'Loading' }),
    div({
      classes: ['loader-ring'],
      children: [div({}), div({}), div({}), div({})]
    })
  ]
});

export default function dashboard(model) {

  if (!model.project.name)
    return loader();

  return div({
    children: [
      div({
        classes: ['task-box'],
        children: [
          div({
            children: [
              h('h2', {}, [
                a({
                  href: HOTOSM_PROJECT_URL + model.project.id,
                  target: '_blank',
                  children: [
                    h('span', {
                      attrs: {
                        class: 'task-id-head'
                      }
                    }, '#' + model.project.id)
                  ]
                }),
                h('text', {}, ' ' + model.project.name)
              ])
            ]
          }),

          div({
            classes: ['task-grid'],
            children: [

              // features chart
              div({
                classes: ['task-sub-section', 'two-column-task-sub-section'],
                children: [
                  div({
                    children: [
                      h('h4', {}, '# of mapped objects'),
                    ]
                  }),
                  div({
                    classes: ['task-info-key'],
                    children: [
                      h('div', {
                        attrs: { id: 'featureChart' },
                        hook: {
                          insert: (vnode) => {
                            PubSub.subscribe("DATASOURCE_UPDATED_OSM", createFeatureChart);
                          }
                        }
                      }, loader()),
                    ]
                  })
                ]

              }), // graf end

              //pie chart start
              div({
                classes: ['task-sub-section', 'two-column-task-sub-section'],
                children: [
                  div({ children: h('h4', {}, 'Project status (# of tasks)') }),
                  div({
                    classes: ['task-info-key'],
                    children: h('canvas', {
                      attrs: { id: 'statusChart' },
                      hook: {
                        insert: (vnode) => {
                          createStatusChart(null, model);
                          PubSub.subscribe("DATASOURCE_UPDATED_HOTOSM", createStatusChart);
                        }
                      }
                    })
                  })
                ]
              }) // pie chart end
            ]
          })
        ]
      }),

      div({
        classes: ['task-box'],
        children: [
          h('h2', {
            hook: {
              update: (oldVnode, vnode) => {
                if (model.lastUpdateTime) {
                  vnode.text = 'Last update (' + model.lastUpdateTime.format("HH:mm:ss") + ')';
                }
                else {
                  vnode.text = 'Last update';
                }
              }
            }
          },
            'Last update'),

          div({
            classes: ['task-sub-section', 'three-column-task-sub-section', 'task-loading'],
            children: [
              div({ children: h('h4', {}, 'Mappers by buildings (selected period)') }),
              h('div', {
                attrs: { id: 'board1' },
                hook: {
                  update: (vnode) => {
                    createBoardBuildings(null, model);
                    PubSub.subscribe("DATASOURCE_UPDATED_OSM", createBoardBuildings);
                  }
                }
              }, loader())
            ]
          }),
          div({
            classes: ['task-sub-section', 'three-column-task-sub-section', 'task-loading'],
            children: [
              div({ children: h('h4', {}, 'Mappers by tasks (project total)') }),
              h('div', {
                attrs: { id: 'board2' },
                hook: {
                  update: (vnode) => {
                    createBoardTasks(null, model);
                    PubSub.subscribe("DATASOURCE_UPDATED_HOTOSM_CONTRIB", createBoardTasks);
                  }
                }
              }, loader())
            ]
          }),
          div({
            classes: ['task-sub-section', 'three-column-task-sub-section', 'task-loading'],
            children: [
              div({ children: h('h4', {}, 'Validators by tasks (project total)') }),
              h('div', {
                attrs: { id: 'board5' },
                hook: {
                  update: (vnode) => {
                    createBoardValidators(null, model);
                    PubSub.subscribe("DATASOURCE_UPDATED_HOTOSM_CONTRIB", createBoardValidators);
                  }
                }
              }, loader())
            ]
          }),

          h('p.white', {}, '.')
        ]
      })
    ]
  });
}

export function chart(model) {
  return div({
    classes: ['task-info-key'],
    children: [
      h('canvas', {
        attrs: { id: 'featureChart', width: 300, height: 200 },
        hook: {
          insert: (vnode) => { createFeatureChart(model); }
        }
      })
    ]
  })
}