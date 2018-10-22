import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import App from './App';
import AddExpense from './src/components/AddExpense';
import EditExpense from './src/components/EditExpense';
import SideDrawer from './src/components/SideDrawer';

import configureStore from './src/store/configureStore';
import config from './src/config';

const store = configureStore();

Navigation.registerComponent('Async-Storage.App', () => App, store, Provider);
Navigation.registerComponent('Async-Storage.AddExpense', () => AddExpense);
Navigation.registerComponent('Async-Storage.EditExpense', () => EditExpense);

Navigation.registerComponent('Async-Storage.SideDrawer', () => SideDrawer);


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Async-Storage.App',
    navigatorStyle: {
      navBarHidden: true,
      statusBarColor: config.statusBarColor
    }
  },
  drawer: {
    left: {
      screen: 'Async-Storage.SideDrawer',
      disableOpenGesture: true,
      fixedWidth: '80%',
      passProps: {}
    },
    animationType: 'slide-down'
  }
});
