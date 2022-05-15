/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { EvilIcons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Hamburger from '../../assets/hamburger.png';
import logo from '../../assets/logo-black.png';

import {useNavigation} from '@react-navigation/native';
const PageHeader = ({
  search,
  setSearch,
  _onPressEnter = () => {},
  _searchBookByTitle = () => {},
  setVisible = () => {},
  isFavorite = false,
  setTitle,
  showIconFavorite = true,
  showIconGoBack = false,
  hiddenIconHamburger = false,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={[styles.header]}>
        <View style={styles.logoContent}>
          <Image style={styles.logo} source={logo} resizeMode="contain" />

          <Text adjustsFontSizeToFit style={styles.title}>
            {setTitle ? setTitle : 'Books'}
          </Text>
          <View
            style={[styles.iconBox, {flexDirection: 'row', marginRight: -20}]}>
            {showIconFavorite && (
              <View style={[styles.iconLogout, {marginRight: 10}]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Favorites');
                  }}>
                  <Icon
                    name="favorite"
                    size={24}
                    color={isFavorite ? '#fc0345' : '#ACACAC'}
                  />
                </TouchableOpacity>
              </View>
            )}
            {!showIconGoBack && (
              <View style={styles.iconLogout}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('Login');
                  }}>
                  <Icon name="logout" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            {showIconGoBack && (
              <View style={[styles.iconLogout, {marginRight: -20}]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.formContent}>
          <View style={styles.searchBox}>
            <TextInput
              style={[{flex: 1}, styles.text]}
              placeholder="Procure um Livro"
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={() => {
                _onPressEnter();
              }}
            />
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => _searchBookByTitle()}>
              <Icon name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {hiddenIconHamburger === false && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible();
                }}>
                <Image source={Hamburger} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default PageHeader;
