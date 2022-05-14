import produce from 'immer';

const initialState = {
  bookList: [],
};

export default function reducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@book/SET_BOOKLIST':
        draft.bookList = action.payload.bookList;
        return;
      default:
        return state;
    }
  });
}
