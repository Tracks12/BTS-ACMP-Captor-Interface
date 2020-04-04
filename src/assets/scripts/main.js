/**
 * Project  : Capteur ACMP
 * Date     : 25/05/2020
 * Autor    : CARDINAL Florian, MENEGHINI Eric, PHILIPPE Flore
 * Nom      : main.js
 * Location : /assets/scripts/
 */

var gaugeOptions = {
	chart: {
		type: 'solidgauge'
	},
	title: null,
	pane: {
		center: [ '50%', '85%' ],
		size: '140%',
		startAngle: -90,
		endAngle: 90,
		background: {
			backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
			innerRadius: '60%',
			outerRadius: '100%',
			shape: 'arc'
		}
	},
	exporting: {
		enabled: false
	},
	tooltip: {
		enabled: false
	},

	// the value axis
	yAxis: {
		stops: [
			[ 0.1, '#55BF3B' ], // green
			[ 0.5, '#DDDF0D' ], // yellow
			[ 0.9, '#DF5353' ] // red
		],
		lineWidth: 0,
		tickWidth: 0,
		minorTickInterval: null,
		tickAmount: 2,
		title: {
			y: -70
		},
		labels: {
			y: 16
		}
	},

	plotOptions: {
		solidgauge: {
			dataLabels: {
				y: 5,
				borderWidth: 0,
				useHTML: true
			}
		}
	}
};

// The Co2 gauge
var chartCo2 = Highcharts.chart('container-Co2', Highcharts.merge(gaugeOptions, {
	yAxis: {
		min: 0,
		max: 200,
		title: {
			text: 'chartCo2'
		}
	},
	credits: {
		enabled: false
	},
	series: [{
		name: 'co2',
		data: [80],
		dataLabels: {
			format:
				'<div style="text-align:center">' +
					'<span style="font-size:25px">{y}</span><br/>' +
					'<span style="font-size:12px;opacity:0.4">CO²</span>' +
				'</div>'
			},
		tooltip: {
			valueSuffix: 'Co2'
		}
	}]
}));

$(document).ready(() => {
	// Splash Screen Animation
	$('#splash').ready(() => {
		$('#splash h1')
			.delay(5000)
			.fadeOut(1000)
			.parent('div')
			.delay(6000)
			.fadeOut(500);
	});

	// Initialisation de la map
	$('#map').ready(() => mapInit());

	// Fonction d'ouverture/fermeture du menu
	$('#menu-content').ready(() => {
		$('#menu-open').click(() => $('#menu-content').fadeIn());
		$('#menu-close').click(() => $('#menu-content').fadeOut());

		$('.menu-interact-map').click(() => $('aside').css('display', 'none'));
		$('.menu-interact-aside, .menu-interact-telemetry').click(() => $('aside').fadeIn());
	});

	// Affichage de la box si jamais il y a instance
	$('aside').ready(() => {
		let length = $(location).attr('pathname').split('/')[1].length;

		if(length > 0)
			$('aside').fadeIn();

		$('#aside-close').click(() => $('aside').fadeOut());
	});

	$('.menu-interact-telemetry').click(function() {
		$(this).ready(() => {
			//js graphe particule fines
			var defaultData = 'https://demo-live-data.highcharts.com/time-data.csv'; //fichier qui recevra les données de la carte
			var urlInput = $('#fetchURL')[0];
			var pollingCheckbox = $('#enablePolling')[0];
			var pollingInput = $('#pollingTime')[0];

			function createChart() {
				Highcharts.chart('container', {
					chart: {
						type: 'spline'
					},
					title: {
						text: 'Live Data'
					},
					accessibility: {
						announceNewData: {
							enabled: true,
							minAnnounceInterval: 15000,
							announcementFormatter: (allSeries, newSeries, newPoint) => {
								if(newPoint)
									return `New point added. Value: ${newPoint.y}`;

								return false;
							}
						}
					},
					data: {
						csvURL: urlInput.value,
						enablePolling: pollingCheckbox.checked === true,
						dataRefreshRate: parseInt(pollingInput.value, 10)
					}
				});

				if(pollingInput.value < 1 || !pollingInput.value)
					pollingInput.value = 1;
			}

			urlInput.value = defaultData;

			// We recreate instead of using chart update to make sure the loaded CSV
			// and such is completely gone.
			pollingCheckbox.onchange = urlInput.onchange = pollingInput.onchange = createChart;

			// Create the chart
			createChart();

			// Bring life to the dials
			setInterval(() => {
				// Speed
				var point,
					newVal,
					inc;

				if(chartSpeed) {
					point = chartSpeed.series[0].points[0];
					inc = Math.round((Math.random() - 0.5) * 100);
					newVal = point.y + inc;

					if (newVal < 0 || newVal > 200)
						newVal = point.y - inc;

					point.update(newVal);
				}
			}, 2000);
		});
	});
});

/**
 * END
 */
