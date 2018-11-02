import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import App from './App';
import AddExpense from './src/components/expense/AddExpense';
import EditExpense from './src/components/expense/EditExpense';
import SideDrawer from './src/components/SideDrawer';

import configureStore from './src/store/configureStore';
import config from './src/config';
import MonthReport from "./src/components/report/MonthReport";
import YearReport from "./src/components/report/YearReport";

const store = configureStore();

Navigation.registerComponent('HarcaMA.App', () => App, store, Provider);
Navigation.registerComponent('HarcaMA.AddExpense', () => AddExpense);
Navigation.registerComponent('HarcaMA.EditExpense', () => EditExpense);

Navigation.registerComponent('HarcaMA.SideDrawer', () => SideDrawer, store, Provider);

Navigation.registerComponent('HarcaMA.MonthReport', () => MonthReport);
Navigation.registerComponent('HarcaMA.YearReport', () => YearReport);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'HarcaMA.App',
    navigatorStyle: {
      navBarHidden: true,
      statusBarColor: config.statusBarColor
    }
  },
  drawer: {
    left: {
      screen: 'HarcaMA.SideDrawer',
      disableOpenGesture: true,
      fixedWidth: '75%'
    },
    animationType: 'slide-down'
  }
});

