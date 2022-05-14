import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: width * 0.7,
    height: height * 0.5,
  },
  imageBox: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonBack: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#acacac',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 30,
    bottom: 10,
  },
  informationCard: {width: width * 0.7},
  title: {
    fontFamily: 'Heebo_700Bold',
    fontSize: height * 0.05,
    textAlign: 'left',
    flexShrink: 1,
  },
  subTitle: {
    fontFamily: 'Heebo_400Regular',
    fontSize: height * 0.02,
    color: '#AB2680',
  },
  row: {
    flexDirection: 'row',
  },
  informationTextLeft: {
    fontFamily: 'Heebo_700Bold',
    marginTop: height * 0.005,
    width: width * 0.35,
    textAlign: 'left',
  },
  informationTextRight: {
    fontFamily: 'Heebo_400Regular',
    marginTop: height * 0.005,
    //eslint-disable-next-line
    width: width * 0.35,
    textAlign: 'right',
    color: '#999',
  },
  description: {
    fontFamily: 'Heebo_400Regular',
    marginTop: height * 0.005,
    //eslint-disable-next-line
    width: width * 0.7,
    color: '#999',
    marginBottom: height * 0.005,
  },
});
export default styles;
