export function requestRadarList() {
  return {
    type: 'REQUEST_RADAR_LIST',
  };
}

export function requestFavoritesList() {
  return {
    type: 'REQUEST_RADAR_FAVORITES',
  };
}

export function requestColors() {
  return {
    type: 'REQUEST_RADAR_COLORS',
  };
}

export function requestRadarDash(idRadar) {
  return {
    type: 'REQUEST_RADAR_DASH',
    payload: {idRadar},
  };
}

export function requestRadarLocation(idLocal) {
  return {
    type: 'REQUEST_RADAR_LOCATION',
    payload: {idLocal},
  };
}
export function setRadarLocation(radars) {
  return {
    type: 'SET_RADAR_LOCATION',
    payload: {radarLocation: radars},
  };
}
export function setRadar(radar) {
  return {
    type: 'SET_RADAR',
    payload: {radar},
  };
}
export function setLoader(loader) {
  return {
    type: 'SET_LOADER',
    payload: {loader},
  };
}

export function setRadarFilter(filter) {
  return {
    type: 'SET_RADAR_FILTER',
    payload: {filter},
  };
}

export function setIsFetching() {
  return {
    type: 'IS_RADAR_FETCHING',
  };
}
export function setFilter(filterIds, filterItens, filterLabels) {
  return {
    type: '@radar/SET_FILTER',
    payload: {filterIds, filterItens, filterLabels},
  };
}
export function requestRadarsError(error) {
  return {
    type: '@radar/REQUEST_RADARS_ERROR',
    payload: {error},
  };
}
export function setSortBy(sortBy) {
  return {
    type: '@radar/SET_SORT',
    payload: {sortBy},
  };
}
