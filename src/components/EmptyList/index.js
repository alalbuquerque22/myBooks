import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyList = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.button}>{'Pesquise por seu livro \nFavorito'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#acacac',
  },
});

export default EmptyList;
