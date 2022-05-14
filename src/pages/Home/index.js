/* eslint-disable eslint-comments/no-unlimited-disable */
import React, {useEffect, useRef, useState} from 'react';
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
import CardBook from '../../components/CardBook';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import {category, hp2, year} from '../../utils/Lists';
import EmptyList from '../../components/EmptyList';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
const Home = ({navigation}) => {
  const [books, setBooks] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [yearSelected, setYearSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef();
  const flatListOffsetRef = useRef();
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
    const _search = search || '';
    const _page = page || 0;
    await api
      .get(
        `https://www.googleapis.com/books/v1/volumes?key=AIzaSyDEwkxVOINEaydVUIQckN3b1o5tTWL7wBs&q=${_search}&startIndex=${_page}&maxResults=20`,
      )
      .then(response => {
        console.log('NUMERO DE ITEMS', response.data.totalItems);
        if (page === 0) {
          setBooks(response?.data?.items);
          setOriginalData(response?.data?.items);
        } else {
          console.log('adicionou mais items');
          setBooks([...books, response?.data?.items]);
        }
        if (page !== 0) {
          const wait = new Promise(resolve => setTimeout(resolve, 10));
          wait.then(() => {
            flatListRef?.current.scrollToOffset({
              animated: true,
              offset: flatListOffsetRef.current - hp2(SCREEN_HEIGHT * 0.3),
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };
  function toggleSelection(item) {
    let index = selected.findIndex(i => i === item);
    let arrSelected = [...selected];
    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      arrSelected.push(item);
    }
    setSelected(arrSelected);
  }
  function toggleSelectionYear(item) {
    let index = yearSelected.findIndex(i => i === item);
    let arrSelected = [...yearSelected];
    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      arrSelected.push(item);
    }
    setYearSelected(arrSelected);
    console.log('yearSelected', yearSelected);
  }

  const searchBookByTitle = text => {
    let arr = originalData;
    console.log(text);
    setBooks(
      arr.filter(
        book =>
          book.volumeInfo.title.toLowerCase().includes(text.toLowerCase()) ||
          book.volumeInfo.publisher?.toLowerCase().includes(text.toLowerCase()),
        // ||
        // book.volumeInfo.authors
        //   .filter(author => author.toLowerCase() === text.toLowerCase())
        //   .includes(text.toLowerCase()),
      ),
    );
  };

  const ButtonOptionYear = () => {
    return year.map((item, index) => (
      <>
        <Pressable
          key={index}
          style={[
            styles.button,
            yearSelected?.findIndex(i => i === item) !== -1
              ? styles.buttonSelected
              : styles.buttonUnselected,
          ]}
          onPress={() => toggleSelectionYear(item)}>
          <Text
            style={[
              styles.textStyle,
              yearSelected?.findIndex(i => i === item) !== -1
                ? null
                : styles.textUnselected,
            ]}>
            {item}
          </Text>
        </Pressable>
      </>
    ));
  };
  const handleScroll = event => {
    flatListOffsetRef.current = event.nativeEvent.contentOffset.y;
  };
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        search={search}
        setSearch={text => setSearch(text)}
        // _searchBookByTitle={searchBookByTitle()}
        _onPressEnter={() => {
          getGoogleBooks(search);
          Keyboard.dismiss();
        }}
        setVisible={() => setModalVisible(true)}
      />
      <View style={styles.container}>
        <FlatList
          data={books}
          ref={flatListRef}
          onScroll={handleScroll}
          keyExtractor={item => item?.id}
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
          onEndReachedThreshold={0.7}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Selecione a categoria</Text>

                <View style={styles.modalButtons}>
                  {category.map((item, index) => (
                    <>
                      <Pressable
                        key={index}
                        style={[
                          styles.button,
                          selected?.findIndex(i => i === item) !== -1
                            ? styles.buttonSelected
                            : styles.buttonUnselected,
                        ]}
                        onPress={() => toggleSelection(item)}>
                        <Text
                          style={[
                            styles.textStyle,
                            selected?.findIndex(i => i === item) !== -1
                              ? null
                              : styles.textUnselected,
                          ]}>
                          {item}
                        </Text>
                      </Pressable>
                    </>
                  ))}
                </View>
              </View>
              <View>
                <Text style={styles.modalText}>Selecione o ano</Text>
                <View style={styles.modalButtons}>
                  <ButtonOptionYear />
                </View>
              </View>
              <Pressable
                style={[
                  styles.button,
                  {
                    borderColor: '#B22E6F',
                    borderWidth: 1,
                    width: '25%',
                    marginTop: 40,
                    backgroundColor: '#FFF',
                  },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // getBooks();
                }}>
                <Text style={[styles.textStyle, {color: '#B22E6F'}]}>
                  Filtrar
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default Home;
