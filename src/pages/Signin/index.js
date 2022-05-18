import React, {useRef, useState} from 'react';
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
import api from '../../services/api';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const SignIn = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const passwordRef = useRef();
  //login desativado
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

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '417535255104-8v63p5jtfve4urqjdrs0b0v027pui2or.apps.googleusercontent.com',
    });
  }, []);

  async function googleLogin() {
    //get user id
    const {idToken} = await GoogleSignin.signIn();

    //create a google credential with user id
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <ImageBackground
      // source={background}
      source={{
        uri: 'https://images.unsplash.com/photo-1604917875399-3cdd6e562b87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      }}
      style={styles.content}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
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
                      onPress={() => {
                        navigation.replace('Home');
                      }}
                      style={styles.button}>
                      <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    googleLogin()
                      .then(() => {
                        navigation.replace('Home');
                      })
                      .catch(err => {
                        alert(err.message);
                      });
                  }}>
                  <View style={[styles.socialInput]}>
                    <Icon name="md-logo-google" size={35} color="#000" />
                    <Text
                      style={[
                        styles.buttonText,
                        {color: '#000', fontWeight: '700'},
                      ]}>
                      Google Sign In{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
