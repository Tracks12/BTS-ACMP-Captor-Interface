/**
 * Project  : Capteur ACMP
 * Date     : 25/05/2020
 * Autor    : CARDINAL Florian, MENEGHINI Eric, PHILIPPE Flore
 * Nom      : main.js
 * Location : /assets/scripts/
 */

$(document).ready(() => {
	// Initialisation de la map
	mapInit();

	// HIGH CHART CODE HERE
<<<<<<< HEAD
//line graph (test)
  Highcharts.chart('container', {
      yAxis: {
          title: {
              text: 'Number of Employees'
          }
      },
      xAxis: {
          accessibility: {
              rangeDescription: 'Range: 2010 to 2017'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2010
          }
      },
      series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
          name: 'Manufacturing',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
          name: 'Sales & Distribution',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
          name: 'Project Development',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
          name: 'Other',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  });
=======

//js graphe particule fines
var defaultData = 'https://demo-live-data.highcharts.com/time-data.csv'; //fichier qui recevra les données de la carte
var urlInput = document.getElementById('fetchURL');
var pollingCheckbox = document.getElementById('enablePolling');
var pollingInput = document.getElementById('pollingTime');

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
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
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

    if (pollingInput.value < 1 || !pollingInput.value) {
        pollingInput.value = 1;
    }
}

urlInput.value = defaultData;

// We recreate instead of using chart update to make sure the loaded CSV
// and such is completely gone.
pollingCheckbox.onchange = urlInput.onchange = pollingInput.onchange = createChart;

// Create the chart
createChart();


});// OU FAUT-IL METTRE CA?
>>>>>>> 16030c417e4c744020ff97ab5e7ac23a12dc418c


 var gaugeOptions = {
     chart: {
         type: 'solidgauge'
     },

     title: null,

     pane: {
         center: ['50%', '85%'],
         size: '140%',
         startAngle: -90,
         endAngle: 90,
         background: {
             backgroundColor:
                 Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
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
             [0.1, '#55BF3B'], // green
             [0.5, '#DDDF0D'], // yellow
             [0.9, '#DF5353'] // red
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
 var chartCo2 = Highcharts.chart('container-co2', Highcharts.merge(gaugeOptions, {
     yAxis: {
         min: 0,
         max: 200,
         title: {
             text: 'CO2'
         }
     },

     credits: {
         enabled: false
     },

     series: [{
         name: 'CO2',
         data: [80],
         dataLabels: {
             format:
                 '<div style="text-align:center">' +
                 '<span style="font-size:25px">{y}</span><br/>' +
                 '<span style="font-size:12px;opacity:0.4">CO2</span>' +
                 '</div>'
         },
         tooltip: {
             valueSuffix: 'CO2'
         }
     }]

 }));
});

 // Bring life to the dials
 setInterval(function () {
     // Speed
     var point,
         newVal,
         inc;

     if (chartSpeed) {
         point = chartSpeed.series[0].points[0];
         inc = Math.round((Math.random() - 0.5) * 100);
         newVal = point.y + inc;

         if (newVal < 0 || newVal > 200) {
             newVal = point.y - inc;
         }

         point.update(newVal);
     }
 }, 2000);

/**
 * END
 */
