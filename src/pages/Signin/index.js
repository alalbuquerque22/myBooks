import React, {createRef, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';
import background from '../../assets/background.jpg';
import logo from '../../assets/Logo.png';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
const SignIn = ({navigation}) => {
  const {navigate} = useNavigation();

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const passwordRef = createRef();
  const login = async () => {
    await api
      .post('auth/sign-in', data, {
        timeout: 1000 * 10,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => {
        api.defaults.headers.Authorization = `Bearer ${response.headers.authorization}`;
        navigation.replace('Home');
      })
      .catch(error => {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
        console.log('Error', error);
      });
  };
  return (
    <ImageBackground
      // source={background}
      source={{
        uri: 'https://images.unsplash.com/photo-1604917875399-3cdd6e562b87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      }}
      style={styles.content}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.contentGlobal} />
              <View style={styles.logoContent}>
                <Image style={styles.logo} source={logo} resizeMode="contain" />
                <Text style={styles.title}>Books</Text>
              </View>
              <View style={styles.formContent}>
                <View style={styles.boxInput}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: foo@bar.com"
                    placeholderTextColor="#333333"
                    value={data.email}
                    onChangeText={text => setData({...data, email: text})}
                    returnKeyType="next"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderStyle
                    onSubmitEditing={() => passwordRef?.current?.focus()}
                  />
                </View>
                <View style={[styles.boxInput]}>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    placeholderStyle
                    placeholderTextColor="#333333"
                    placeholder="*******"
                    value={data.password}
                    ref={passwordRef =>
                      passwordRef &&
                      passwordRef.setNativeProps({
                        style: {
                          fontFamily: 'Heebo_400Regular',
                        },
                      })
                    }
                    onChangeText={text => setData({...data, password: text})}
                    secureTextEntry={true}
                  />
                  <View style={styles.boxButton}>
                    <TouchableOpacity
                      onPress={() => navigation.replace('Home')}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
