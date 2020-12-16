<template>
  <div class="dashboard" style="display: flex; flex-wrap: wrap">
    <div class="chart-wrapper">
      <apexchart class="graph" v-if="flights.data != null"
                 :options="{
        xaxis: {
          categories: this.months
        },
        chart: {
          type: 'line',
          toolbar: {
                show: true
              },
             zoom: {
                enabled: false
              }
        },
        title: {
          text: flights.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
        colors: ['#00897b']
      }"
                 :series="[{data:flights.data,
    name: 'amount of flights'}]">
      </apexchart>
    </div>
    <div class="chart-wrapper">
      <apexchart class="graph" v-if="originFlights.data.length !== 0"
                 type="bar"
                 :options="{
        xaxis: {
          categories: this.months,

        },
        chart: {
          zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
        },
        title: {
          text: originFlights.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
        stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
        responsive: [{
              breakpoint: 1100,
              options: {
           chart: {
             height: 300
           },
           plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '85%',
                endingShape: 'rounded'
              },
            },
              }
            }],
        plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '65%',
                endingShape: 'rounded'
              },
            },
        dataLabels: {
              enabled: false
            },

      }" :series="[{
            name: originFlights.data[0].origin,
            data: originFlights.data[0].flights
          }, {
            name: originFlights.data[1].origin,
            data: originFlights.data[1].flights
          }, {
            name: originFlights.data[2].origin,
            data: originFlights.data[2].flights
          }]">
      </apexchart>
    </div>

    <div class="chart-wrapper">
      <apexchart class="graph" v-if="originFlights.data.length !== 0"
                 type="bar"
                 :options="{
        xaxis: {
          categories: this.months
        },
        title: {
          text: `${originFlights.title} stacked`,
          align: 'center',
          style: graphTitleStyle.style,
        },
        chart: {
              type: 'bar',

              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
             responsive: [{
              breakpoint: 800,
              options: {
           chart: {
             height: 400
           }
              }
            },{
              breakpoint: 1100,
              options: {
           chart: {
             height: 300
           }
              }
            }],
        plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
        orientation: 'vertical',
        position: 'center' // bottom/center/top
      }
              },
            },

      }" :series="[{
            name: originFlights.data[0].origin,
            data: originFlights.data[0].flights
          }, {
            name: originFlights.data[1].origin,
            data: originFlights.data[1].flights
          }, {
            name: originFlights.data[2].origin,
            data: originFlights.data[2].flights
          }]">
      </apexchart>
    </div>
    <div class="chart-wrapper">
      <apexchart class="graph" v-if="originFlights.data.length !== 0"
                 type="bar"
                 :options="{
        xaxis: {
          categories: this.months,

        },
        title: {
          text: `${originFlights.title} in %`,
          align: 'center',
          style: graphTitleStyle.style,
        },

        chart: {
              type: 'bar',

              stacked: true,
              stackType: '100%',
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
             responsive: [{

              breakpoint: 1100,
              options: {
           chart: {
             height: 300
           }
              }
            }],
        plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
        orientation: 'vertical',
        position: 'center' // bottom/center/top
      }
              },
            },

      }" :series="[{
            name: originFlights.data[0].origin,
            data: originFlights.data[0].flights.map((el, inx)=> (el*100/flights.data[inx]).toFixed(2))
          }, {
            name: originFlights.data[1].origin,
            data: originFlights.data[1].flights.map((el, inx)=> (el*100/flights.data[inx]).toFixed(2))
          }, {
            name: originFlights.data[2].origin,
            data: originFlights.data[2].flights.map((el, inx)=> (el*100/flights.data[inx]).toFixed(2))
          }]">
      </apexchart>
    </div>

    <div class="chart-wrapper" v-if="topTenDestinations.data.length !== 0">
      <apexchart class="graph" type="bar" :options=" {
            chart: {
              type: 'bar',
              height:500,
            },
             title: {
          text: topTenDestinations.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
            plotOptions: {
              bar: {
                horizontal: true,
              }

            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: topTenDestinations.data.map(e => e.destination)
            }
          }"
                 :series="[{
            data: topTenDestinations.data.map(e => e.totalFlights)
          }]"></apexchart>
    </div>

    <div class="chart-wrapper" v-if="topTenDestinations.data.length !== 0">
      <apexchart class="graph" type="bar" :options=" {
            chart: {
              type: 'bar',
              height:500
            },
             title: {
          text: `${topTenDestinations.title} from origins`,
          align: 'center',
          style: graphTitleStyle.style,
        },
            plotOptions: {
              bar: {
                horizontal: true,
              }

            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: topTenDestinations.data.map(e => e.destination)
            }
          }"
                 :series="[{
           name:topTenDestinations.data[0].origin[0].origin,
           data:flattenArray(topTenDestinations.data.map(e => e.origin.filter(f=>f.origin===topTenDestinations.data[0].origin[0].origin).map(g=>g.flights)))
          },
          {
           name:topTenDestinations.data[1].origin[1].origin,
           data:flattenArray(topTenDestinations.data.map(e => e.origin.filter(f=>f.origin===topTenDestinations.data[1].origin[1].origin).map(g=>g.flights)))
          },
          {
           name:topTenDestinations.data[2].origin[2].origin,
           data:flattenArray(topTenDestinations.data.map(e => e.origin.filter(f=>f.origin===topTenDestinations.data[2].origin[2].origin).map(g=>g.flights)))
          }]"></apexchart>
    </div>

    <div class="chart-wrapper" v-if="airtime.data.length !== 0">
      <apexchart class="graph" type="pie" :options=" {
            chart: {
              type: 'pie',
              height:500,
            },
             title: {
          text: airtime.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
          labels: airtime.data.map(e=>e.origin),
          series: airtime.data.map(e=>e.airtime)}"
      ></apexchart>
    </div>
    <div class="chart-wrapper" v-if="weatherRecords.data.length !== 0">
      <apexchart class="graph" type="pie" :options=" {
            chart: {
              type: 'pie',
              height:500,
            },
             title: {
          text: weatherRecords.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
        theme: {
              monochrome: {
                enabled: true
              }
            },
          labels: weatherRecords.data.map(e=>e.origin),
          series: weatherRecords.data.map(e=>e.observation_count)}"
      ></apexchart>
    </div>
    <div class="chart-wrapper" v-if="delays.data.length !== 0">
      <apexchart class="graph" type="bar" :options=" {
            chart: {
              type: 'bar',
              stacked:true,
              height:500,
            },
             title: {
          text: delays.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
          series: [{name: 'Arrival delay',data: delays.data.map(e=>e.arr_delay)},
                  {name: 'Departure delay', data: delays.data.map(e=>e.dep_delay)}],
          xaxis:{
              categories: delays.data.map(e=>e.origin)
          }
      }"
      ></apexchart>
    </div>
    <div class="chart-wrapper" v-if="meanTemp.ewr.length !== 0">
      <apexchart class="graph" type="line" :options=" {
            chart: {
              type: 'line',
              height:500,
            },
             title: {
          text: meanTemp.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
          series: [{name: 'EWR',data: meanTemp.ewr},
          {name: 'JFK',data: meanTemp.jfk},
          {name: 'LGA',data: meanTemp.lga}
                  ],
          xaxis:{
              type:'datetime',
              categories: days,
          }
      }"
      ></apexchart>
    </div>

    <div class="chart-wrapper" v-if="manufacturers.data.length !== 0">
      <apexchart class="graph" type="bar" :options=" {
            chart: {
              type: 'bar',
              height:500,
            },
             title: {
          text: manufacturers.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
          series: [{data:manufacturers.data.map(e=>e.plan)}],
          xaxis:{
              categories: manufacturers.data.map(e=>e.manufacturer)
          }
      }"
      ></apexchart>
    </div>
    <div class="chart-wrapper" v-if="models.data.length !== 0">
      <apexchart class="graph" type="bar" :options=" {
            chart: {
              type: 'bar',
              height:500,
              stacked:true
            },
             title: {
          text: manufacturers.title,
          align: 'center',
          style: graphTitleStyle.style,
        },
        plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          series: [{data:manufacturers.data.map(e=>e.plan)}],
          xaxis:{
              categories: ['Airbus', 'Airbus Industrie']
          }
      }"
      ></apexchart>
    </div>
        <div class="chart-wrapper" v-if="temperatureAtJfk.data.length !== 0">
          <apexchart class="graph"  :options=" {
                chart: {
                  type: 'scatter',

                },
                 title: {
              text: temperatureAtJfk.title,
              align: 'center',
              style: graphTitleStyle.style,
            },


                xaxis: {
                  type: 'datetime',

                   labels: {
        format: 'MMM yyyy'
      }
                }
              }"
                     :series="[{ data: temperatureAtJfk.data
                }]"></apexchart>
        </div>

        <div class="chart-wrapper" v-if="temperature.jfk.length !== 0">
          <apexchart class="graph" :series="[{ name: 'JFK', data: temperature.jfk
                },{ name: 'EWR', data: temperature.ewr
                },{ name: 'LGA', data: temperature.lga
                }]" :options=" {
                chart: {
                  type: 'scatter',

                },
                markers: {size:3},
                 title: {
              text: temperature.title,
              align: 'center',
              style: graphTitleStyle.style,
            },
                xaxis: {
                  type: 'datetime',

                   labels: {
        format: 'MMM yyyy'
      }
                }
              }"

          ></apexchart>
        </div>


    <apexchart style="margin-top: 50px" class="graph" v-if="flights.data != null"
               :options="{
        xaxis: {
          type: 'datetime',
          tickAmount: 4,
          min: new Date('01 Jan 2020').getTime(),
          labels: {
    format: 'MMM'
  }
        },
         markers: {size:3},
        chart: {
          type: 'line',
          toolbar: {
                show: true
              },
             zoom: {
                enabled: false
              }
        },
        tooltip: {
        x: {
        format: 'MMM yyyy'
        }},
        title: {
          text: 'Test for datetime',
          align: 'center',
          style: graphTitleStyle.style,
        },
        colors: ['#00897b']
      }"
               :series="[{data:[[1577836800000,123], [1580515200000, 100], [1583020800000, 200], [1585699200000, 180]  ],
    name: 'amount of flights'}]">
    </apexchart>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Dashboard',
  data: function () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      graphTitleStyle: {
        style: {
          fontSize: '15px',
          color: '#4b4d54',
          floating: true,
          fontWeight: 400,
          fontFamily: 'Helvetica',
        },
      },
      flightLineChartOptions: {
        options: {
          xaxis: {
            categories: this.months
          },
        },
      },
    }
  },
  mounted() {
    this.$store.dispatch('fetchFlights');
    this.$store.dispatch('fetchOriginFlights');
    this.$store.dispatch('fetchTop10');
    this.$store.dispatch('fetchTempAtJKF');
    this.$store.dispatch('fetchTemp');
    this.$store.dispatch('fetchAirTime');
    this.$store.dispatch('fetchDelays');
    this.$store.dispatch('fetchManufacturers');
    this.$store.dispatch('fetchMeanTemperature');
    this.$store.dispatch('fetchMeanTemperatureJfk');
    this.$store.dispatch('fetchModels');
    this.$store.dispatch('fetchWeatherRecords');
  },
  computed: {
    ...mapGetters([
      'flights',
      'originFlights',
      'topTenDestinations',
      'temperatureAtJfk',
      'temperature',
      'airtime',
      'weatherRecords',
      'meanTemp',
      'meanTempJfk',
      'delays',
      'tempAtJfk',
      'manufacturers',
      'models',
      'days'
    ]),
  },
  methods: {
    flattenArray(array) {
      return array.reduce((total, next) => {
        return total.concat(next)
      }, [])
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$green: #00FF00;

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .dashboard {

    border: solid red 2px;


    .chart-wrapper {
      width: 100%;
      margin: 0.5em auto;

      .graph {
        width: 100%;
      }
    }
  }
}


/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .dashboard {
    border: solid blue 2px;

    .chart-wrapper {
      width: 80%;
      margin: 0.5em auto;

      .graph {
        width: 90%;
      }
    }
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .dashboard {
    border: solid pink 2px;


    .chart-wrapper {
      width: 47%;


      .graph {
        width: 95%;


      }
    }
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .dashboard {
    border: solid green 2px;
    justify-content: center;


    .chart-wrapper {
      width: 40%;
      margin: 0.5em;

      .graph {
        width: 80%;
        height: 60%;
      }
    }
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1290px) {
  .dashboard {
    border: solid purple 2px;

    .chart-wrapper {
      width: 30%;

      .graph {
        width: 80%;
        height: 60%;
      }
    }
  }

}

.dashboard {
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;

  .chart-wrapper {
    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    display: flex;
    padding: 0.5em;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }
}

/* responsive: [{
              breakpoint: 900,
              options: {
            plotOptions: {
    bar: {
      dataLabels: {
        orientation: 'vertical',
        position: 'center' // bottom/center/top
      }
    }
  },
              }
            }],*/


</style>
