import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import App from './App';
import AddExpense from './src/components/expense/AddExpense';
import EditExpense from './src/components/expense/EditExpense';
import SideDrawer from './src/components/SideDrawer';

import configureStore from './src/store/configureStore';
import config from './src/config';
import MonthReport from "./src/components/report/MonthReport";

const store = configureStore();

Navigation.registerComponent('Async-Storage.App', () => App, store, Provider);
Navigation.registerComponent('Async-Storage.AddExpense', () => AddExpense);
Navigation.registerComponent('Async-Storage.EditExpense', () => EditExpense);

Navigation.registerComponent('Async-Storage.SideDrawer', () => SideDrawer, store, Provider);

Navigation.registerComponent('Async-Storage.MonthReport', () => MonthReport, store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Async-Storage.MonthReport'
  }
});

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'Async-Storage.App',
//     navigatorStyle: {
//       navBarHidden: true,
//       statusBarColor: config.statusBarColor
//     }
//   },
//   drawer: {
//     left: {
//       screen: 'Async-Storage.SideDrawer',
//       disableOpenGesture: true,
//       fixedWidth: '75%'
//     },
//     animationType: 'slide-down'
//   }
// });

