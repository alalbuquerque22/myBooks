import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',

    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
    width: width,
    height: height * 0.25,
    flexWrap: 'nowrap',
  },
  logoContent: {
    height: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'red'
  },
  logo: {
    width: width * 0.4,
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
    width: width * 0.3,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.75,
    height: height * 0.08,
    borderWidth: 1,
    borderColor: 'rgba(51,51,51,0.2)',
  },
  searchIcon: {
    padding: 15,
    position: 'absolute',
    right: 15,
    // backgroundColor:'red'
  },
  text: {
    height: height * 0.08,

    marginLeft: width * 0.04,
    fontFamily: 'Heebo_400Regular',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalView: {
    height: height * 0.65,
    width: width * 0.9,

    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSelected: {
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: '#000',
    fontFamily: 'Heebo_400Regular',
    borderColor: '#000',
    borderWidth: 1,
  },
  buttonUnselected: {
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: '#FFF',
    fontFamily: 'Heebo_400Regular',
    borderColor: '#ACACAC',
    borderWidth: 1,
  },
  textUnselected: {
    color: '#000',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Heebo_500Medium',
  },
  modalText: {
    marginTop: height * 0.02,
    marginBottom: 15,
    marginLeft: 15,
    textAlign: 'left',
    fontFamily: 'Heebo_500Medium',
  },
  modalButtons: {
    flexDirection: 'row',
    width: width * 0.9,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
});

export default styles;
