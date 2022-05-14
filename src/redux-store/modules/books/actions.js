export function setBookList(bookList) {
  return {
    type: '@book/SET_BOOKLIST',
    payload: {bookList},
  };
}
