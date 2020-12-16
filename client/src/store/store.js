import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        flights: {title: 'Total flights in each month', data: []},
        originFlights: {title: 'Flights from origins', data: []},
        topTenDestinations: {title: 'Top 10 destinations', data: []},
        airtime: {title: 'Airtime', data: []},
        weatherRecords: {title: 'Weather records', data: []},
        meanTemp: {title: 'Max temperatures', jfk: [], ewr: [], lga: []},
        meanTempJfk: {title: 'Max temperatures for JFK', data: []},
        delays: {title: 'Mean delays', data: []},
        tempAtJfk: {title: 'Temperature at JFK', data: []},
        manufacturers: {title: 'Manufacturers', data: []},
        models: {title: 'Models', data: []},
        temp: {title: 'Temperature in origins', jfk: [], ewr: [], lga: []},
        days: []
    },
    mutations: {
        SET_FLIGHTS_IN_MONTHS(state, payload) {
            state.flights.data = payload.map(element => element.number_of_flights);
        },
        SET_ORIGIN_FLIGHTS(state, payload) {
            // eslint-disable-next-line no-undef
            let data = _(payload)
                .groupBy(x => x.origin)
                .map((value, key) => ({origin: key, data: value}))
                .value();
            data.forEach((origin) => {
                    state.originFlights.data.push({
                        'origin': origin.origin,
                        'flights': origin.data.map(x => x.number_of_flights)
                    })
                }
            );
        },
        SET_TOP_TEN_DESTINATIONS(state, payload) {
            // eslint-disable-next-line no-undef
            let data = _(payload)
                .groupBy(x => x.dest)
                .map((value, key) => ({dest: key, data: value}))
                .value();
            data.forEach((dest) => {
                    let flightsArray = []
                    dest.data.forEach(m => flightsArray.push({'origin': m.origin, 'flights': m.number_of_flights}))
                    state.topTenDestinations.data.push({
                        'destination': dest.dest,
                        'origin': flightsArray,
                        'totalFlights': dest.data.map(e => e.number_of_flights).reduce((a, b) => a + b)
                    })
                }
            );
        },
        SET_TEMP_AT_JFK(state, payload) {
            state.tempAtJfk.data = payload.map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
        },
        SET_MEAN_TEMP_JFK(state, payload) {
            state.meanTempJfk.data = payload.map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
        },
        SET_TEMP(state, payload) {
            state.temp.ewr = payload.filter(f => f.origin === 'EWR').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
            state.temp.lga = payload.filter(f => f.origin === 'LGA').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
            state.temp.jfk = payload.filter(f => f.origin === 'JFK').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
        },
        SET_MEAN_TEMP(state, payload) {
            state.meanTemp.ewr = payload.filter(f => f.origin === 'EWR').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
            state.meanTemp.lga = payload.filter(f => f.origin === 'LGA').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
            state.meanTemp.jfk = payload.filter(f => f.origin === 'JFK').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
        },
        SET_DAYS(state, payload){
            state.days = payload.filter(f => f.origin === 'EWR').map(e => new Date(2013, e.month, e.day).getTime());
        },
        SET_AIRTIME(state, payload) {
            state.airtime.data = payload;
        },
        SET_WEATHER_RECORDS(state, payload) {
            state.weatherRecords.data = payload;
        },
        SET_DELAYS(state, payload) {
            state.delays.data = payload;
        },
        SET_MANUFACTURERS(state, payload) {
            state.manufacturers.data = payload;
        },
        SET_MODELS(state, payload) {
            state.models.data = payload;
        },
    },
    getters: {
        flights: (state) => state.flights,
        originFlights: (state) => state.originFlights,
        topTenDestinations: (state) => state.topTenDestinations,
        temperatureAtJfk: (state) => state.tempAtJfk,
        temperature: (state) => state.temp,
        airtime: (state) => state.airtime,
        weatherRecords: (state) => state.weatherRecords,
        meanTemp: (state) => state.meanTemp,
        meanTempJfk: (state) => state.meanTempJfk,
        delays: (state) => state.delays,
        tempAtJfk: (state) => state.tempAtJfk,
        manufacturers: (state) => state.manufacturers,
        models: (state) => state.models,
        days: (state) => state.days
    },
    actions: {
        fetchFlights({commit}) {
            axios.get('http://localhost:3257/flights').then(response => {
                if (response.status === 200) {
                    commit('SET_FLIGHTS_IN_MONTHS', response.data);
                }
            })
        },
        fetchOriginFlights({commit}) {
            axios.get('http://localhost:3257/flights/origin').then(response => {
                if (response.status === 200) {
                    commit('SET_ORIGIN_FLIGHTS', response.data);
                }
            })
        },
        fetchTop10({commit}) {
            axios.get('http://localhost:3257/flights/top-10').then(response => {
                if (response.status === 200) {
                    commit('SET_TOP_TEN_DESTINATIONS', response.data);
                }
            })
        },
        fetchTempAtJKF({commit}) {
            axios.get('http://localhost:3257/weather/jfk/temperature').then(response => {
                if (response.status === 200) {
                    commit('SET_TEMP_AT_JFK', response.data);
                }
            })
        },
        fetchTemp({commit}) {
            axios.get('http://localhost:3257/weather/temperature').then(response => {
                if (response.status === 200) {
                    commit('SET_TEMP', response.data);
                }
            })
        },
        fetchAirTime({commit}) {
            axios.get('http://localhost:3257/flights/origin/airtime').then(response => {
                if (response.status === 200) {
                    commit('SET_AIRTIME', response.data);
                }
            })
        },
        fetchWeatherRecords({commit}) {
            axios.get('http://localhost:3257/weather/origin').then(response => {
                if (response.status === 200) {
                    commit('SET_WEATHER_RECORDS', response.data);
                }
            })
        },
        fetchMeanTemperature({commit}) {
            axios.get('http://localhost:3257/weather/origin/mean-temperature').then(response => {
                if (response.status === 200) {
                    commit('SET_MEAN_TEMP', response.data);
                    commit('SET_DAYS', response.data);
                }
            })
        },
        fetchMeanTemperatureJfk({commit}) {
            axios.get('http://localhost:3257/weather/jfk/highest-temp').then(response => {
                if (response.status === 200) {
                    commit('SET_MEAN_TEMP_JFK', response.data);
                }
            })
        },
        fetchDelays({commit}) {
            axios.get('http://localhost:3257/weather/origin/mean-delay').then(response => {
                if (response.status === 200) {
                    commit('SET_DELAYS', response.data);
                }
            })
        },
        fetchManufacturers({commit}) {
            axios.get('http://localhost:3257/manufactures').then(response => {
                if (response.status === 200) {
                    commit('SET_MANUFACTURERS', response.data);
                }
            })
        },
        fetchModels({commit}) {
            axios.get('http://localhost:3257/manufactures/models').then(response => {
                if (response.status === 200) {
                    commit('SET_MODELS', response.data);
                }
            })
        },
    }

})
