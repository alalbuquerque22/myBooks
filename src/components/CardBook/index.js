import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
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
              {/* {imageUrl && ( */}
              <Image
                style={styles.image}
                source={{
                  uri:
                    imageUrl ??
                    'https://www.forewordreviews.com/books/covers/networking-for-people-who-hate-networking.jpg',
                }}
                resizeMode="cover"
              />
              {/* )} */}
            </View>
            <View style={styles.cardText}>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={styles.cardTitle}>
                {title}
              </Text>
              <Text numberOfLines={1} style={styles.cardAuthor}>
                {authors[0]}
              </Text>
              <Text numberOfLines={2} style={styles.cardDescription}>
                {pageCount} páginas
                {'\n'}
                {publisher} Publicado em {published}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardBook;
