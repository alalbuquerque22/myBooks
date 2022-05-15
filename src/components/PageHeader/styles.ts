import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    width: width,
    height: height * 0.21,
    flexWrap: 'nowrap',
  },
  logoContent: {
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.3,
    marginRight: 10,
  },
  title: {
    // backgroundColor:'red',
    width: width * 0.3,
    fontFamily: 'Heebo_200ExtraLight',
    textAlign: 'left',
    fontSize: width * 0.1,
    color: '#000',
  },
  iconBox: {
    // backgroundColor: 'red',
    width: width * 0.3,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconLogout: {
    padding: 10,
    borderColor: 'rgba(51, 51, 51, 0.2)',
    borderWidth: 1,
    borderRadius: 24,
    width: 45,
  },

  formContent: {
    flexDirection: 'row',
    marginTop: -50,
  },
  searchBox: {
    // backgroundColor:'green',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.75,
    height: height * 0.08,
    borderWidth: 1,
    borderColor: 'rgba(51,51,51,0.2)',
  },
  searchIcon: {
    // padding:0,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },

  text: {
    height: height * 0.08,

    marginLeft: width * 0.04,
    fontFamily: 'Heebo_400Regular',
  },
});
export default styles;
