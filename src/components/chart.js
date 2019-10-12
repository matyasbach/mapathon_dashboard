'use strict';

import Chart from 'chart.js';

export default function createFeatureChart (model) {
	if(!model.charts || !model.charts.building) return null; // TODO: show loading
	console.log(model.charts.building);
	
	var ctx = document.getElementById('featureChart');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: { datasets: [
			{
		        label: "buildings",
		        data: model.charts.building,
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

	
	/*
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ['AAA', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	        datasets: [{
	            label: '# of Votes',
	            data: [12, 19, 3, 5, 2, 3],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
	 */
	
}