import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

// export interface Book {
//     id: string,
//     authors: string,
//     title: string,
//     imageUrl: string,
//     publisher: string,
//     pageCount: number,
//     published: number
// }
// interface BookItemProps {
//     book: Book
// }
const CardBook = ({
  id,
  imageUrl,
  title,
  authors = ['Autor não informado'],
  pageCount,
  publisher,
  published,
  showFavoriteButton = false,
  isFavorited = false,
  _onPressFavorite = () => {},
  object,
}) => {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('Book', {
          object: object,
          // callBack: callback => {
          //   console.log(callBack, '=> callBack');
          // },
        });
      }}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardImage}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    imageUrl ??
                    'https://www.forewordreviews.com/books/covers/networking-for-people-who-hate-networking.jpg',
                }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.cardText}>
              <Text
                numberOfLines={2}
                // adjustsFontSizeToFit
                style={styles.cardTitle}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.cardAuthor}>
                {authors[0]}
              </Text>
              <Text numberOfLines={4} style={styles.cardDescription}>
                {pageCount ? pageCount + '  páginas\n' : ''}
                {publisher ? publisher + ' \n' : ''}
                {published ? 'Publicado em ' + published : ''}
              </Text>
            </View>
            {showFavoriteButton && (
              <View style={styles.favoriteButton}>
                <TouchableOpacity onPress={() => _onPressFavorite()}>
                  <Icon
                    name={isFavorited ? 'ios-heart-sharp' : 'ios-heart-outline'}
                    size={30}
                    color={isFavorited ? '#ff1616' : '#acacac'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardBook;
