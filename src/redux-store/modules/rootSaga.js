import {all, takeLatest} from 'redux-saga/effects';
// import {
//   requestStore,
//   requestStoreList,
//   requestStoreAdvs,
// } from './storeAndServices/saga';
// import {
//   // requestRadarFavoritesList,
//   requestRadarList,
//   requestRadarColor,
//   requestRadarDash,
//   requestRadarLocation,
// } from './radar/saga';

export default function* rootSaga() {
  return yield all([
    // takeLatest('REQUEST_STORE_LIST', requestStoreList),
    // takeLatest('REQUEST_STORE_VIEW', requestStore),
    // takeLatest('REQUEST_STORE_VIEW_ADVS', requestStoreAdvs),
    // takeLatest('REQUEST_RADAR_LIST', requestRadarList),
    // takeLatest('REQUEST_RADAR_FAVORITES', requestRadarFavoritesList),
    // takeLatest('REQUEST_RADAR_COLORS', requestRadarColor),
    // takeLatest('REQUEST_RADAR_DASH', requestRadarDash),
    // takeLatest('REQUEST_RADAR_LOCATION', requestRadarLocation),
  ]);
}
