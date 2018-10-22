import { Platform, Dimensions } from 'react-native';


export default {
  platPref: (Platform.OS === 'android') ? 'md-' : 'ios-',
  statusBarColor: '#167F60',
  navBarBackgroundColor: '#1DAA80'
}
