import React from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import {category, year} from '../../utils/Lists';
import styles from './styles';
const ModalFilter = ({_Visible, _setVisible = () => {}}) => {
  const [yearSelected, setYearSelected] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  function toggleSelection(item, arryItem, callbackItem = () => {}) {
    let index = arryItem.findIndex(i => i === item);
    let arrSelected = [...arryItem];
    if (index !== -1) {
      arrSelected.splice(index, 1);
    } else {
      arrSelected.push(item);
    }
    callbackItem(arrSelected);
  }
  const ButtonOptionYear = () => {
    return year.map((item, index) => (
      <>
        <Pressable
          key={index}
          style={[
            styles.button,
            yearSelected?.findIndex(i => i === item) !== -1
              ? styles.buttonSelected
              : styles.buttonUnselected,
          ]}
          onPress={() =>
            toggleSelection(item, yearSelected, e => setYearSelected(e))
          }>
          <Text
            style={[
              styles.textStyle,
              yearSelected?.findIndex(i => i === item) !== -1
                ? null
                : styles.textUnselected,
            ]}>
            {item}
          </Text>
        </Pressable>
      </>
    ));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={_Visible}
      onRequestClose={() => {
        _setVisible(!_Visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            {/* <Text style={[styles.modalText, {marginTop: 0, marginBottom: 0}]}>
              Este modal ainda esta em construção
            </Text> */}
            <Text style={[styles.modalText, {marginTop: -15}]}>
              Este modal ainda esta em construção {'\n\n'}
              Selecione a categoria
            </Text>

            <View style={styles.modalButtons}>
              {category.map((item, index) => (
                <>
                  <Pressable
                    key={index}
                    style={[
                      styles.button,
                      selected?.findIndex(i => i === item) !== -1
                        ? styles.buttonSelected
                        : styles.buttonUnselected,
                    ]}
                    onPress={() =>
                      toggleSelection(item, selected, e => setSelected(e))
                    }>
                    <Text
                      style={[
                        styles.textStyle,
                        selected?.findIndex(i => i === item) !== -1
                          ? null
                          : styles.textUnselected,
                      ]}>
                      {item}
                    </Text>
                  </Pressable>
                </>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.modalText}>Selecione o ano</Text>
            <View style={styles.modalButtons}>
              <ButtonOptionYear />
            </View>
          </View>
          <Pressable
            style={[
              styles.button,
              {
                borderColor: '#B22E6F',
                borderWidth: 1,
                width: '25%',
                marginTop: 40,
                backgroundColor: '#FFF',
              },
            ]}
            onPress={() => {
              _setVisible(!_Visible);
              // getBooks();
            }}>
            <Text style={[styles.textStyle, {color: '#B22E6F'}]}>Filtrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
