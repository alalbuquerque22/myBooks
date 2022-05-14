import produce from 'immer';

const initialState = {
  isFetching: false,
  loadingListRadars: false,
  loadingListFavorites: false,
  loadingRadarLocation: false,
  radar: {},
  radarDash: {},
  radarLocation: {},
  radars: [],
  favorites: [],
  colors: [],
  filterIds: null,
  filterItens: null,
  filterLabels: null,
  loader: false,
  filter: {
    id_city: null,
    id_state: null,
    search: '',
  },
  requestError: null,
  sortBy: 'spot',
  idLocal: null,
};

export default function reducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@radar/SET_SORT':
        draft.sortBy = action.payload.sortBy;
        return;
      case '@radar/SET_FILTER':
        draft.filterIds = action.payload.filterIds;
        draft.filterItens = action.payload.filterItens;
        draft.filterLabels = action.payload.filterLabels;
        return;
      case 'SET_RADAR':
        draft.radar = action.payload.radar;
        break;
      case 'SET_LOADER':
        draft.loader = action.payload.loader;
        break;
      case 'SET_RADAR_LIST':
        draft.radars = action.payload.radars;
        draft.isFetching = false;
        break;
      case 'REQUEST_RADAR_LOCATION':
        draft.idLocal = action.payload.idLocal;
        return;
      case 'radar@SET_LOADING_RADAR_LIST':
        draft.loadingListRadars = action.payload.loading;
        break;
      case 'radar@SET_LOADING_RADAR_FAVORITES':
        draft.loadingListFavorites = action.payload.loading;
        break;
      case '@radar/REQUEST_RADARS_ERROR':
        draft.requestError = action.payload.error;
        break;
      case 'SET_RADAR_FAVORITES':
        draft.favorites = action.payload.favorites;
        draft.isFetching = false;
        break;
      case 'SET_RADAR_COLORS':
        draft.colors = action.payload.colors;
        break;
      case 'SET_RADAR_DASH':
        draft.radarDash = action.payload.radarDash;
        break;
      case 'SET_RADAR_LOCATION':
        draft.radarLocation = action.payload.radarLocation;
        draft.loadingRadarLocation = action.payload.loading;
        break;
      case 'IS_RADAR_FETCHING':
        draft.isFetching = true;
        return;
      case 'IS_NOT_RADAR_FETCHING':
        draft.isFetching = false;
        return;
      case 'SET_RADAR_FILTER':
        draft.filter = action.payload.filter;
        break;
      default:
        return state;
    }
  });
}
