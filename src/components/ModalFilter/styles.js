import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {borderRadius: 20, padding: 10, elevation: 2},
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Heebo_500Medium',
  },
  textUnselected: {
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
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
  },
});

export default styles;
