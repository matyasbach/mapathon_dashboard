'use strict';

import Chart from 'chart.js';

export function createFeatureChart (model) {
	const { charts } = model.dashboard;
	if(!charts || !charts.building) return null;
	console.log(charts.building);
	
	var ctx = document.getElementById('featureChart');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: { datasets: [
			{
		        label: "buildings",
		        data: charts.building,
			    fill: false,
			    borderColor: 'red',
			    steppedLine: 'before'			    	
			}],
		},
	    options: {
	        legend: {
	            display: true,
	            position: 'bottom',
	            labels: {
	                fontColor: 'black',
	                fontSize: 12
	            }
	        },
	    	scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }],
	            xAxes: [{
	                type: 'time',
	                time: {
	                    unit: 'minute'
	                }
	            }]	            
	        }
	    }
	});
	
}


function val(n) {
	
	return Number.isInteger(n)?n:0;
	
}



export function createStatusChart (model) {
	
	if(!model.project) return null;
	
	var ctx = document.getElementById('statusChart');
	
	
	var mappedPct = val(model.project.percentMapped);
	var validPct = val(model.project.percentValidated);
	var badPct = val(model.project.percentBadImagery);
	var remPct = 100 - mappedPct - validPct - badPct;
	
	var myChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: { datasets: [{
	        data: [
	        	validPct,
	        	mappedPct, 
	        	badPct,
	        	remPct
	        ],
			backgroundColor: [
				'#008000',
				'#6A5ACD',
				'#FF4500',
				'#D3D3D3'
			]
	    }],
	    labels: [
	        'Validated',
	        'Mapped',
	        'Bad Imagery',
	        'Not mapped'
	    ]
	    },
	    options: {
	        legend: {
	            display: true,
	            position: 'bottom',
	            labels: {
	                fontColor: 'black',
	                fontSize: 12
	            }
	        },
	    }
	});
	
}