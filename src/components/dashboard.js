'use strict';

import '../styles/layout.css';
import { OVP_DE, OVP_RU, OVP_FR, DATETIME_FORMAT, HOTOSM_PROJECT_URL } from '../Variables';
import h from 'snabbdom/h';
import { inputCheckbox, inputNumber, inputText, form, select, option, div, paragraph, progressBar, a } from './basic';

import createFeatureChart from './chart';

export default function dashboard(model) {

	  return h('div', {}, [ 
	  
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
		                      h('span', {attrs: {class: 'task-id-head'}}, '#'+model.project.id)
		                    ]
		                  }),
		                  h('text', {}, ' '+model.project.name)
		                ])
		              ]
		          }),

		      div({
		        classes: ['task-grid'],
		        children: [

					//graf start
					div({
						classes: ['task-sub-section', 'three-column-task-sub-section'],
			  
						children: [
			  
						  div({
							id: '',
							children: [
								h('h4', {}, 'graf'),
							]
						  }),
						div({
							classes: ['task-info-key'],
							children: [
								h('canvas', {attrs: {id:'featureChart', width: 300, height: 200},
									hook: {
										insert: (vnode) => { createFeatureChart(model); }
									}
								})
							]
						  })
					  ]
					  
				  }), // graf end

				  div({
					classes: ['task-sub-section', 'emerging-picture']
				}),
			    ]
		      })
		    ]
		  }),
	  
	div({	    
		classes: ['task-box'],
	    children: [
	      h('h2',
	      {
	        hook:
	        {
	          update: (oldVnode, vnode) =>
	          {
	            vnode.text = 'Last update (HH:mm:ss)';
	          }
	        }
	      },
		 'Last update (XXXX)'), //last update
		 
		 div({
			classes: ['task-sub-section', 'five-column-task-sub-section']
		}),
		div({
			classes: ['task-sub-section', 'five-column-task-sub-section']
		}),
		div({
			classes: ['task-sub-section', 'five-column-task-sub-section']
		}),
		div({
			classes: ['task-sub-section', 'five-column-task-sub-section']
		}),
		div({
			classes: ['task-sub-section', 'five-column-task-sub-section']
		}),

	     /* div({
	        classes: ['task-sub-section','three-column-task-sub-section'],
	        children:[
	          h('h4', {}, 'Map'),
	          h('div#overview-map',
	          {
	            hook:
	            {
	              insert: (vnode) =>
	              {
	                displayOverviewMap(model);
	              },
	              update: (oldVnode, vnode) =>
	              {
	                updateOverviewMap(model.OSMData);
	              },
	              destroy: (vnode) =>
	              {
	                destroyOverviewMap();
	              }
	            }
	          })
	        ]
	      }),*/
	  //    div({
	      //  classes: ['task-sub-section','three-column-task-sub-section'],
	      //  children: [
	         /* div({
	            id: 'roads',
	            children: [
	              h('h4', {}, 'Roads'),
	              inputCheckbox({
	                id: 'roads-checkbox',
	                name: model.checkboxNames.roads,
	                label: 'Display roads on the map',
	                value: 'roadsChecked',
	                on:
	                {
	                  click: onCheckboxClicked
	                }
	              })
	            ]
	          }),*/
	         /* h('p', {}, model.OSMData['highway']['features'].length
	            + ' road(s) created ('
	            + model.calculations.roadLength + ' km)'),*/
	         /* h('div#highway-map',
	          {
	            hook:
	            {
	              insert: (vnode) =>
	              {
	                const startLongitude = 5.9215,
	                  startLatitude = 45.58789;
	                // Check if we can access the geolocation API
	                if ("geolocation" in navigator) {
	                  navigator.geolocation.getCurrentPosition(function onSuccess(position) {
	                    vnode.map = displayHighwayMap(model.calculations.roadLength, position.coords.latitude, position.coords.longitude);
	                  }, function onError(positionError)
	                  {
	                    displayHighwayMap(model.calculations.roadLength, startLatitude, startLongitude);
	                  });
	                }
	                else
	                {
	                  displayHighwayMap(model.calculations.roadLength, startLatitude, startLongitude);
	                }
	              },
	              update: (oldVnode, vnode) =>
	              {
	                updateHighwayMap(model.calculations.roadLength);
	              },
	              destroy: (vnode) =>
	              {
	                destroyHighwayMap();
	              }
	            }
	          })*/
	       // ]
	  //    }),
	    /*  div({
	        classes: ['task-sub-section', 'three-column-task-sub-section'],
	        children: [
	          div({
	            id: 'buildings',
	            children: [
	              h('h4', {}, 'Buildings'),
	              inputCheckbox({
	                id: 'buildings-checkbox',
	                name: model.checkboxNames.buildings,
	                label: 'Display buildings on the map',
	                value: 'buildingsChecked',
	                on:
	                {
	                  click: onCheckboxClicked
	                }
	              })
	            ]
	          }),
	          h('p', {}, model.OSMData['building']['features'].length + ' building(s) created')
	        ]
	      }),*/
	     /* div({
	        classes: ['task-sub-section', 'three-column-task-sub-section'],
	        children: [
	          div({
	            id: 'landuse',
	            children: [
	              h('h4', {}, 'Landuse'),
	              inputCheckbox({
	                id: 'landuse-checkbox',
	                name: model.checkboxNames.landuse,
	                label: 'Display landuse on the map',
	                value: 'landuseChecked',
	                on:
	                {
	                  click: onCheckboxClicked
	                }
	              })
	            ]
	          }),
	          div({
	            children:[
	              h('b', {}, 'Residential landuse: '),
	              h('span', {}, model.calculations.residentialLanduse + ' km²')
	            ]
	          }),
	          div({
	            children:[
	              h('b', {}, 'Total landuse: '),
	              h('span', {}, model.calculations.totalLanduse + ' km²')
	            ]
	          })
	        ]
	      }),*/
	     /* div({
	        classes: ['task-sub-section', 'three-column-task-sub-section'],
	        children: [
	          div({
	            id: 'waterways',
	            children: [
	            h('h4', {}, 'Waterways'),
	              inputCheckbox({
	                id: 'waterways-checkbox',
	                name: model.checkboxNames.waterways,
	                label: 'Display waterways on the map',
	                value: 'waterwaysChecked',
	                on:
	                {
	                  click: onCheckboxClicked
	                }
	              })
	            ]
	          }),
	          h('p', {}, model.OSMData['waterway']['features'].length
	              + ' waterway(s) created ('
	              + model.calculations.waterwayLength + ' km)')
	        ]
	      }),*/
	      h('p.white', {},'.')
	    ]
	  })
	]);

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