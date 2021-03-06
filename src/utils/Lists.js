import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const category = [
  'Design',
  'UX Design',
  'UI Design',
  'Arquitetura da informação',
  'CSS',
  'Usabilidade',
  'Design Thinking',
  'Outros',
];

export function wp2(size) {
  let porcetagem = (size * 100) / 375;
  return (porcetagem * SCREEN_WIDTH) / 100;
}

export function hp2(size) {
  let porcetagem = (size * 100) / 667;
  return (porcetagem * SCREEN_HEIGHT) / 100;
}

export const year = Array.from({length: 10}, (v, k) => k + 2015);
