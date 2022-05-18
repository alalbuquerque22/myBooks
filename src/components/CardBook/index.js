import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-native-shared-element';

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
  const textRef = React.useRef();
  const imageRef = React.useRef();
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
            <Animatable.View
              ref={imageRef}
              animation="fadeInLeft"
              duration={500}
              delay={700}
              style={styles.cardImage}>
              <SharedElement id={`item.${id}.image`} style={styles.image}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      imageUrl ??
                      'https://www.forewordreviews.com/books/covers/networking-for-people-who-hate-networking.jpg',
                  }}
                  resizeMode="cover"
                />
              </SharedElement>
            </Animatable.View>
            <Animatable.View
              ref={textRef}
              animation="fadeInRight"
              duration={500}
              delay={700}
              style={styles.cardText}>
              <SharedElement
                id={`item.${title}.title`}
                style={styles.cardTitle}>
                <Text
                  numberOfLines={2}
                  // adjustsFontSizeToFit
                  style={styles.cardTitle}>
                  {title}
                </Text>
              </SharedElement>
              <Text numberOfLines={1} style={styles.cardAuthor}>
                {authors[0]}
              </Text>
              <Text numberOfLines={4} style={styles.cardDescription}>
                {pageCount ? pageCount + '  páginas\n' : ''}
                {publisher ? publisher + ' \n' : ''}
                {published ? 'Publicado em ' + published : ''}
              </Text>
            </Animatable.View>
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
CardBook.sharedElements = (route, otherRoute, showing) => {
  const {id, title} = route.params;
  console.log('sharedElements', route.params);
  return [
    {id: `item.${id}.image`},
    {
      id: `item.${title}.title`,
    },
  ];
};
export default CardBook;
