/* eslint-disable eslint-comments/no-unlimited-disable */
import React, {useEffect, useRef, useState} from 'react';
import {API_KEY} from '@env';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Keyboard,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import styles from './styles';
import ModalFilter from '../../components/ModalFilter';
import CardBook from '../../components/CardBook';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import {category, hp2, year} from '../../utils/Lists';
import EmptyList from '../../components/EmptyList';
import {useDispatch, useSelector} from 'react-redux';
import {setBookList} from '../../redux-store/modules/books/actions';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [search, setSearch] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef();
  const flatListOffsetRef = useRef();
  const dispatch = useDispatch();
  const {bookList: GLOBAL_BOOKS} = useSelector(store => store.book);

  // const getBooksMemo = useMemo(() => getGoogleBooks, [search, page]);
  useEffect(() => {
    if (page === 0) {
      getGoogleBooks();
    }
    if (page > 0) {
      getGoogleBooks();
    }
  }, [page]); // eslint-disable-line

  const getGoogleBooks = async () => {
    const MAX_RESULTS_PER_PAGE = 20;
    const _search = search?.replace(' ', '_') || '';
    const _page = page * MAX_RESULTS_PER_PAGE || 0;
    if (!_search) {
      setBooks([]);
      setPage(0);
      return;
    }
    await api
      .get(
        `volumes?key=${API_KEY}&q=${_search}&startIndex=${_page}&maxResults=${MAX_RESULTS_PER_PAGE}`,
      )
      .then(response => {
        // console.log('NUMERO DE ITEMS', response.data.totalItems);
        if (_page === 0) {
          setBooks(response?.data?.items);
          setOriginalData(response?.data?.items);
        }
        if (_page > 0) {
          // console.log('adicionou mais items', response.config);
          //console.log(newBooks.length);
          // prevent clear array
          const newBooks = response?.data?.items ?? [];
          // set new array concated on the books
          let temp = [...books, ...newBooks];
          setBooks(temp);
          // setOriginalData([]);
        }
        //up the list on put new items
        if (_page !== 0) {
          const wait = new Promise(resolve => setTimeout(resolve, 10));
          wait.then(() => {
            flatListRef?.current.scrollToOffset({
              animated: true,
              offset: flatListOffsetRef.current - hp2(SCREEN_HEIGHT * 0.1),
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        console.log(err.errors);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  const handleScroll = event => {
    flatListOffsetRef.current = event.nativeEvent.contentOffset.y;
  };
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        search={search}
        setSearch={text => setSearch(text)}
        _onPressIconFavorite={() => navigation.navigate('Favorites')}
        _onPressEnter={() => {
          getGoogleBooks(search);
          Keyboard.dismiss();
        }}
        isFavorite={GLOBAL_BOOKS.length > 0} // returns true if there is at least one book in the list
        setVisible={() => setModalVisible(true)}
      />
      <View style={styles.container}>
        <FlatList
          data={books}
          ref={flatListRef}
          onScroll={handleScroll}
          keyExtractor={item => `${item?.id}.${item?.volumeInfo?.title}`}
          horizontal={false}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              <CardBook
                id={item.id}
                imageUrl={item?.volumeInfo?.imageLinks?.thumbnail}
                title={item?.volumeInfo?.title}
                authors={item?.volumeInfo?.authors}
                pageCount={item?.volumeInfo?.pageCount}
                publisher={item?.volumeInfo?.publisher}
                published={item?.volumeInfo?.publishedDate}
                object={item}
                showFavoriteButton
                isFavorited={
                  GLOBAL_BOOKS.findIndex(i => i.id === item.id) !== -1
                }
                _onPressFavorite={() => {
                  if (GLOBAL_BOOKS.findIndex(i => i.id === item.id) === -1) {
                    dispatch(setBookList([...GLOBAL_BOOKS, item]));
                  } else {
                    let removedBook = GLOBAL_BOOKS.filter(
                      i => i.id !== item.id,
                    );
                    dispatch(setBookList(removedBook));
                  }
                }}
              />
            </>
          )}
          refreshing={false}
          onRefresh={() => {
            setPage(0);
            setSearch('');
            setBooks([]);
          }}
          ListEmptyComponent={() => (
            <>
              <EmptyList />
            </>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setPage(page + 1);
            setLoadingMore(true);
          }}
        />
        {loadingMore && (
          <Progress.Bar
            indeterminate
            width={SCREEN_WIDTH}
            color={'#000'}
            borderWidth={0}
            useNativeDriver
          />
        )}
        <ModalFilter
          _Visible={modalVisible}
          _setVisible={_ => setModalVisible(_)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
