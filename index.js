import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import App from './App';
import AddExpense from './src/components/AddExpense';
import EditExpense from './src/components/EditExpense';

import configureStore from './src/store/configureStore';
import config from './src/config';

const store = configureStore();

Navigation.registerComponent('Async-Storage.App', () => App, store, Provider);
Navigation.registerComponent('Async-Storage.AddExpense', () => AddExpense, store, Provider);
Navigation.registerComponent('Async-Storage.EditExpense', () => EditExpense, store, Provider);


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Async-Storage.App',
    title: 'Welcome',
    navigatorStyle: {
      navBarHidden: true,
      statusBarColor: config.statusBarColor
    }
  }
});
