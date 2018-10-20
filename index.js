import { Navigation } from 'react-native-navigation';
import App from './App';
import AddExpense from './src/components/AddExpense';
import EditExpense from './src/components/EditExpense';

import config from './src/config';

Navigation.registerComponent('Async-Storage.App', () => App);
Navigation.registerComponent('Async-Storage.AddExpense', () => AddExpense);
Navigation.registerComponent('Async-Storage.EditExpense', () => EditExpense);


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
