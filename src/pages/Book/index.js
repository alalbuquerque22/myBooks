/* eslint-disable eslint-comments/no-unlimited-disable */

import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setBookList} from '../../redux-store/modules/books/actions';

const Book = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  let book = route.params.object || {};
  const [isFavorite, setFavorite] = React.useState(false);

  const {bookList: GLOBAL_BOOKS} = useSelector(store => store.book);
  useEffect(() => {
    let favorited = GLOBAL_BOOKS?.filter?.(item => item.id === book.id) || [];
    setFavorite(favorited.length > 0);
  }, []); //eslint-disable-line

  const handleFavorite = () => {
    setFavorite(!isFavorite);
    if (!isFavorite) {
      dispatch(setBookList([...GLOBAL_BOOKS, book]));
    } else {
      let removedBook = GLOBAL_BOOKS.filter(item => item.id !== book.id);
      dispatch(setBookList(removedBook));
    }
  };

  const filterbyId = item => item.id === book.id;
  return (
    <>
      <SafeAreaView style={{flex: 1, height: height * 0.02}}>
        <ScrollView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={[
                styles.row,
                {
                  height: height * 0.1,
                  width: width,
                  marginBottom: height * 0.01,
                },
              ]}>
              <View style={styles.buttonBack}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back-sharp" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.buttonBack,
                  {position: 'absolute', left: width * 0.8},
                ]}>
                <TouchableOpacity onPress={() => handleFavorite()}>
                  <Icon
                    name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'}
                    size={30}
                    color={isFavorite ? '#ff1616' : 'black'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={{
                  uri:
                    book?.volumeInfo?.imageLinks?.thumbnail ??
                    'https://www.forewordreviews.com/books/covers/networking-for-people-who-hate-networking.jpg',
                }}
                resizeMode="stretch"
                style={styles.image}
              />
            </View>
            <View style={[styles.informationCard, {marginTop: height * 0.03}]}>
              <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                {book?.volumeInfo?.title}
              </Text>
              <Text style={styles.subTitle}>
                {/* {author.map(author => author).join(', ')} */}
              </Text>
            </View>

            <View style={[styles.informationCard]}>
              <Text
                style={[
                  styles.informationTextLeft,
                  {marginTop: height * 0.02},
                ]}>
                INFORMAÇÕES
              </Text>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>Páginas</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.pageCount + ' páginas'}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>Editora</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.publisher}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>Publicação</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.publishedDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>Idioma</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.language}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>
                  Título Original
                </Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.title} {'\n'}
                  {book?.volumeInfo?.subtitle}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>ISBN-10</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.industryIdentifiers?.map(identifier => {
                    if (identifier.type === 'ISBN_10') {
                      return identifier.identifier;
                    }
                  })}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>ISBN-13</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.industryIdentifiers?.map(identifier => {
                    if (identifier.type === 'ISBN_13') {
                      return identifier.identifier;
                    }
                  })}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.informationTextLeft]}>Categoria</Text>
                <Text style={[styles.informationTextRight]}>
                  {book?.volumeInfo?.categories?.map(
                    (category, index) =>
                      `${index > 1 ? index + 1 + ' -' : ' '}  ${category}`,
                  )}
                </Text>
              </View>
            </View>
            <View style={[styles.informationCard, {marginBottom: 50}]}>
              <Text
                style={[
                  styles.informationTextLeft,
                  {marginTop: height * 0.02, width: width * 0.7},
                ]}>
                RESENHA DA EDITORA
              </Text>
              <View style={styles.row}>
                <Text style={[styles.description]}>
                  <Fontisto name="quote-a-right" size={24} color="#999" />{' '}
                  {book?.volumeInfo?.description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Book;
