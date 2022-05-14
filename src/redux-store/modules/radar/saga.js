import {call, put, select} from 'redux-saga/effects';
import api from '../../../services/api';

export function* requestRadarDash(action) {
  yield put({type: 'SET_RADAR_DASH', payload: {radarDash: {}}});
  const getToken = state => state.user;
  const callApi = () => {
    return api.get('/radar/dashboard/' + action.payload.idRadar);
  };

  try {
    const response = yield call(callApi);
    let radarDash = yield response.data[0];
    radarDash.RadarInstantMeasureCard = yield radarDash.RadarInstantMeasureCard
      .length > 0
      ? radarDash.RadarInstantMeasureCard[0]
      : {};
    radarDash.RadarIntensityLastCards = yield radarDash.RadarIntensityLastCards
      .length > 0
      ? radarDash.RadarIntensityLastCards[0]
      : {};

    const directionChartData = {
      cardeal: [],
      percent: [],
      olc: [],
      elc: [],
    };
    yield radarDash?.RadarDirectionsGraph?.forEach(item => {
      directionChartData.cardeal.push(item.cardeal);
      directionChartData.percent.push({value: parseInt(item.percent)});
      directionChartData.olc.push({value: parseInt(item.olc)});
      directionChartData.elc.push({value: parseInt(item.elc)});
    });
    yield (radarDash.directionChartData = directionChartData);

    const radarIntensityChart = {
      hour: [],
      sustained: [],
      gust: [],
    };

    radarDash?.RadarIntensityGraph?.sort(function (a, b) {
      return parseInt(a.hour) - parseInt(b.hour);
    });

    yield radarDash?.RadarIntensityGraph?.forEach(item => {
      radarIntensityChart.hour.push(String(item.hour));
      radarIntensityChart.sustained.push({value: parseInt(item.sustained)});
      radarIntensityChart.gust.push({value: parseInt(item.gust)});
    });
    yield (radarDash.radarIntensityChart = radarIntensityChart);

    yield put({type: 'SET_RADAR_DASH', payload: {radarDash}});
    yield put({type: 'IS_NOT_RADAR_FETCHING'});
  } catch (err) {
    console.log(err);
    yield put({type: 'SET_RADAR_DASH', payload: {radarDash: {}}});
    yield put({type: 'IS_NOT_RADAR_FETCHING'});
  }
}

export function* requestRadarLocation(action) {
  yield put({
    type: 'SET_RADAR_LOCATION',
    payload: {radarLocation: {}, loading: true},
  });
  const getToken = state => state.user;
  const user = yield select(getToken);
  const callApi = () => {
    return api.get('/location', {
      params: {
        id_local: action.payload.idLocal,
        id_user: user.id,
      },
    });
  };

  try {
    console.log('RADARLOCATIONN ########');
    const response = yield call(callApi);
    let radarLocation = yield response.data[0];

    yield put({
      type: 'SET_RADAR_LOCATION',
      payload: {radarLocation, loading: false},
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: 'SET_RADAR_LOCATION',
      payload: {radarLocation: {}, loading: false},
    });
  }
}

export function* requestRadarList(action) {
  const getToken = state => state.user;
  //yield put({type: 'radar@SET_LOADING_RADAR_LIST', payload: {loading: true}});

  const getFilter = state => state.radar;
  const stateRadar = yield select(getFilter);
  const newFilterState = stateRadar.filterIds;
  const filter = stateRadar.filter;
  const order = stateRadar.sortBy;
  // console.log('filter radar no saga: ', filter);
  const filterState =
    newFilterState === null ? filter.state : newFilterState[0];
  const status =
    filter.online && filter.offline
      ? ''
      : !filter.online && !filter.offline
      ? ''
      : filter.online
      ? 'on'
      : 'off';
  const callApi = () => {
    return api.get('/radar/list', {
      timeout: 1000 * 20,
      params: {
        id_state: filterState,
        status: status,
        order: order,
        search: filter.search,
      },
    });
  };
  function isFavorite(value) {
    return value.favorite === true;
  }
  //async function toogleAnimation(toggler) {
  async function sleep(ms) {
    console.log(`Pausing ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //   if (!toggler) {
  //     await sleep(3000);
  //     console.log(`Pause released!`)
  //      put({type: 'SET_LOADER', payload: {loader: toggler}});
  //   } else {
  //      put({type: 'SET_LOADER', payload: {loader: toggler}});
  //   }
  //   return;
  // }

  try {
    const response = yield call(callApi);
    yield put({type: 'SET_LOADER', payload: {loader: true}});
    yield sleep(1000);
    console.log('Pause released!');
    const favorites = response.data.filter(isFavorite) || [];
    // console.log('\n\n\nFAVORITES ####', favorites);
    yield put({type: 'SET_RADAR_LIST', payload: {radars: response.data}});
    yield put({
      type: 'radar@SET_LOADING_RADAR_LIST',
      payload: {loading: false},
    });
    yield put({
      type: 'SET_RADAR_FAVORITES',
      payload: {favorites: favorites},
    });
    yield put({
      type: 'radar@SET_LOADING_RADAR_FAVORITES',
      payload: {loading: false},
    });
    yield put({type: 'SET_LOADER', payload: {loader: false}});
  } catch (err) {
    console.log('eerro', err);
    yield put({type: 'SET_RADAR_LIST', payload: {radars: []}});
    yield put({
      type: 'SET_RADAR_FAVORITES',
      payload: {favorites: []},
    });
    yield put({
      type: 'radar@SET_LOADING_RADAR_LIST',
      payload: {loading: false},
    });
    //yield put({type: 'SET_LOADER', payload: {loader: false}});
    yield put({
      type: '@radar/REQUEST_RADARS_ERROR',
      payload: {requestError: err.response.data},
    });
    // yield put(
    //   a.setResponse({
    //     message: error.response.data,
    //     status: error.response.status,
    //   }),
    // );
  }
}

export function* requestRadarColor() {
  yield put({type: 'SET_RADAR_COLORS', payload: {colors: []}});
  const getToken = state => state.user;
  const user = yield select(getToken);
  const callApi = () => {
    return api.get('/radar/colors/', {
      params: {},
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
  };

  try {
    const response = yield call(callApi);
    yield put({type: 'SET_RADAR_COLORS', payload: {colors: response.data}});
  } catch (err) {
    console.log('ERRO');
    console.log(err);
    yield put({type: 'SET_RADAR_COLORS', payload: {colors: []}});
  }
}
