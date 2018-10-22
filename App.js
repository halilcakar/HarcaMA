import React, { Component } from 'react';
import _ from 'lodash';
import { FlatList, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import HeaderComp from './src/components/Header';
import FooterComp from './src/components/Footer';
import ListItemComp from './src/components/ListItem';
import Spinner from './src/components/Spinner';
import { addExpense, deleteExpense, updateExpense, changeDate } from './src/store/actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      chosenDate: new Date(),
      dailyExpense: [],
      todayExpense: 0,
      totalMonthExpense: 0,
    };

    this.setDate = this.setDate.bind(this);
    this.addExpence = this.addExpence.bind(this);
    this.onEditPress = this.onEditPress.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.onPressAddExpense = this.onPressAddExpense.bind(this);
  };

  componentDidMount() {
    // AsyncStorage.removeItem('month');
    const getData = async () => {
      try {
        let month = await AsyncStorage.getItem('month');
        if(month == null) { month = '{}'; }
        month = JSON.parse(month);
        const chosenDate = new Date();
        const { prefix, day } = this.getDateString(chosenDate);
        let totalMonthExpense = 0;
        if(month[prefix] && month[prefix]['totalMonthExpense']) {
          let totalMonthExpense = month[prefix]['totalMonthExpense'];
        }
        let todayExpense = 0;
        let dailyExpense = [];
        if(month[prefix] && month[prefix]['days'] && month[prefix]['days'][day]) {
          month[prefix]['days'][day].forEach(function (item) { todayExpense += item.toplam; });
          dailyExpense= [].concat(month[prefix]['days'][day]);
        }
        this.setState({
          chosenDate,
          month,
          dailyExpense,
          todayExpense,
          totalMonthExpense,
          isLoading: false
        });

      }
      catch (e) {
        console.log(e);
      }
    };
    getData();
  }

  getDateString = date => {
    return { prefix: date.getFullYear()+'-'+(date.getMonth()+1), day: date.getDate() };
  };
  checkPrefixDay(state, prefix, day) {
    if(state.month[prefix] === undefined) {
      state.month[prefix] = {
        totalMonthExpense: 0,
        days: {
          [day]: []
        }
      };
    }
    if(state.month[prefix]['days'][day] === undefined) {
      state.month[prefix]['days'][day] = [];
    }
  }
  setDate(chosenDate) {
    const { prefix, day } = this.getDateString(chosenDate);
    this.setState(prevState => {
      this.checkPrefixDay(prevState, prefix, day);

      let totalMonthExpense = prevState.month[prefix]['totalMonthExpense'];
      let todayExpense = 0;
      prevState.month[prefix]['days'][day].forEach(function (item) { todayExpense += item.toplam; });
      let dailyExpense = [].concat(prevState.month[prefix]['days'][day]);
      return {
        ...prevState,
        chosenDate,
        totalMonthExpense,
        todayExpense,
        dailyExpense
      };
    });
  }
  addExpence(data) {
    this.setState(prevState => {
      const { prefix, day } = this.getDateString(prevState.chosenDate);
      this.checkPrefixDay(prevState, prefix, day);
      prevState.month[prefix]['days'][day].push({
        ...data,
        id: _.uniqueId()
      });
      prevState.month[prefix]['totalMonthExpense'] += data.toplam;
      let totalMonthExpense = prevState.month[prefix]['totalMonthExpense'];
      let todayExpense = 0;
      prevState.month[prefix]['days'][day].forEach(function (item) { todayExpense += item.toplam; });
      const dailyExpense = [].concat(prevState.month[prefix]['days'][day]);
      const setItem = async () => {
        try {
          await AsyncStorage.setItem('month', JSON.stringify(prevState.month));
        } catch (e) {
          console.log(e);
        }
      };
      setItem();
      return {
        ...prevState,
        todayExpense,
        totalMonthExpense,
        dailyExpense
      }
    });
  }
  onPressAddExpense() {
    this.props.navigator.push({
      screen: 'Async-Storage.AddExpense',
      title: 'Harcama Ekle',
      navigatorStyle: {
        navBarBackgroundColor: '#1DAA80',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        statusBarColor: '#167F60'
      },
      passProps: {
        addExpense: this.addExpence
      }
    });
  }
  onDeletePress(deleteItem) {
    Alert.alert(
      '',
      'Silmek istediğinize emin misiniz?',
      [
        {text: 'Silme!', onPress: () => {}, style: 'cancel'},
        {text: 'Sil', onPress: () => {
            this.setState(prevState => {
              const {prefix, day} = this.getDateString(prevState.chosenDate);
              let dailyExpense = prevState.month[prefix]['days'][day].filter(item => item.id !== deleteItem.id);
              let todayExpense = prevState.todayExpense - deleteItem.toplam;
              let totalMonthExpense = prevState.totalMonthExpense - deleteItem.toplam;
              prevState.month[prefix]['days'][day] = [].concat(dailyExpense);
              prevState.month[prefix].totalMonthExpense = totalMonthExpense;
              const setItem = async () => {
                try {
                  await AsyncStorage.setItem('month', JSON.stringify(prevState.month));
                } catch (e) { }
              };
              setItem();
              return {
                ...prevState,
                dailyExpense,
                todayExpense,
                totalMonthExpense
              }
            });
          }},
      ],
      {
        cancelable: false,
      }
    );

  }
  updateExpense(updateItem) {
    this.setState(prevState => {
      const {prefix, day} = this.getDateString(prevState.chosenDate);
      let dailyExpense = prevState.month[prefix]['days'][day].filter(item => {
        if(item.id === updateItem.id) {
          prevState.month[prefix].totalMonthExpense -= item.toplam;
          console.log(prevState.totalMonthExpense);
        }
        return item.id !== updateItem.id;
      });
      prevState.month[prefix]['days'][day] = [].concat(dailyExpense);
      prevState.month[prefix]['days'][day].push(updateItem);

      let todayExpense = 0;
      prevState.month[prefix]['totalMonthExpense'] += (updateItem.toplam);
      let totalMonthExpense = prevState.month[prefix]['totalMonthExpense'];
      prevState.month[prefix]['days'][day].forEach(function (item) { todayExpense += item.toplam; });
      dailyExpense = [].concat(prevState.month[prefix]['days'][day]);
      const setItem = async () => {
        try {
          await AsyncStorage.setItem('month', JSON.stringify(prevState.month));
        } catch (e) { }
      };
      setItem();
      return {
        ...prevState,
        todayExpense,
        totalMonthExpense,
        dailyExpense
      };
    });
  }
  onEditPress(item) {
    this.props.navigator.push({
      screen: 'Async-Storage.EditExpense',
      title: 'Harcama Düzenle',
      navigatorStyle: {
        navBarBackgroundColor: '#1DAA80',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        statusBarColor: '#167F60'
      },
      passProps: {
        state: item,
        updateExpense: this.updateExpense,
        deleteExpense: (item) => this.onDeletePress(item)
      }
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <Spinner />
      );
    }
    else {
      return <Container>
        <HeaderComp
          chosenDate={this.state.chosenDate}
          setDate={this.setDate}
          onToggle={this.onPressAddExpense}
        />
        <Content padder>
          <FlatList
            data={this.state.dailyExpense}
            renderItem={({ item }) => {
              return (
                <ListItemComp
                  edit={() => {this.onEditPress(item)}}
                  delete={() => this.onDeletePress(item)}
                  item={item}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
        <FooterComp
          todayExpense={this.state.todayExpense}
          thisMonthExpense={this.state.totalMonthExpense}
        />
      </Container>;
    }
  }
}

const mapStateToProps = ({ expense }) =>{
  const { isLoading, chosenDate, dailyExpense, todayExpense, totalMonthExpense } = state;
  return {
    isLoading,
    chosenDate,
    dailyExpense,
    todayExpense,
    totalMonthExpense,
  };
};

const mapDisatchToProps = dispatch => {
  return {
    onAddExpense: data => dispatch(addExpense(data))
  };
};

export default connect()(App);
