/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';

import {View, Text, Keyboard, FlatList} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import CardBook from '../../components/CardBook';
import PageHeader from '../../components/PageHeader';
import styles from './styles';
const Favorite = ({navigation}) => {
  const {bookList: GLOBAL_BOOKS} = useSelector(store => store.book);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState(GLOBAL_BOOKS);

  useEffect(() => {
    searchBookByTitle(search);
  }, [search]);
  const searchBookByTitle = text => {
    let arr = GLOBAL_BOOKS;
    // console.log(text);
    setBooks(
      arr.filter(
        book =>
          book.volumeInfo.title.toLowerCase().includes(text.toLowerCase()) ||
          book.volumeInfo.publisher
            ?.toLowerCase()
            .includes(text.toLowerCase()) ||
          book.volumeInfo.authors.every(author =>
            author.toLowerCase().includes(text.toLowerCase()),
          ),
      ),
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <PageHeader
          setTitle={'Favorites'}
          showIconFavorite={false}
          showIconGoBack={true}
          hiddenIconHamburger={true}
          search={search}
          setSearch={text => setSearch(text)}
          _onPressEnter={() => {
            Keyboard.dismiss();
          }}
        />
        <View>
          <FlatList
            data={books}
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
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Favorite;
