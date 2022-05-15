import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: height,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  contentGlobal: {
    marginTop: height * 0.25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    // width: width,
    backgroundColor: '#ACACAC',
    height: Dimensions.get('screen').height,
  },
  logoContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.3,
    marginHorizontal: 10,
  },
  title: {
    width: width * 0.6,
    fontFamily: 'Heebo_200ExtraLight',
    fontSize: width * 0.1,
    color: '#fff',
  },
  formContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInput: {
    marginTop: width * 0.05,
    width: width * 0.9,
    height: width * 0.2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.60)',
  },
  label: {
    fontFamily: 'Heebo_300Light',
    color: '#000',
    fontSize: width * 0.04,
    marginLeft: width * 0.05,
    marginTop: width * 0.02,
  },
  input: {
    marginLeft: width * 0.05,
    marginTop: width * 0.02,

    color: '#000',
    fontSize: width * 0.05,
    fontFamily: 'Heebo_400Regular',
  },
  boxButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    width: width * 0.4,
    height: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.3,
    height: width * 0.14,
    backgroundColor: '#ffffff',
    borderRadius: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Heebo_400Regular',
    fontSize: width * 0.06,
    color: '#707070',
  },
});

export default styles;
