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
      isLoading: true
    };

    this.onEditPress = this.onEditPress.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.onPressAddExpense = this.onPressAddExpense.bind(this);
  };

  componentDidMount() {
    setTimeout(() => {
        this.setState({ isLoading: false });
    }, 2000);
    this.props.onDateChange(new Date());
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
        addExpense: data => this.props.onAddExpense(data)
      }
    });
  }
  onDeletePress(deleteItem) {
    Alert.alert(
      '',
      'Silmek istediğinize emin misiniz?',
      [
        {text: 'Silme!', onPress: () => {}, style: 'cancel'},
        {text: 'Sil', onPress: () => this.props.onDeleteExpense(deleteItem) },
      ],
      {
        cancelable: false,
      }
    );

  }
  updateExpense(updateItem) {
    this.props.onUpdateExpense(updateItem);
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
        updateExpense: item => this.updateExpense(item),
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
          chosenDate={this.props.chosenDate}
          setDate={(date) => this.props.onDateChange(date)}
          onToggle={this.onPressAddExpense}
          onIconPress={() => { this.props.navigator.toggleDrawer(); }}
        />
        <Content padder>
          <FlatList
            data={this.props.dailyExpense}
            renderItem={ ({ item }) => {
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
          todayExpense={this.props.todayExpense}
          thisMonthExpense={this.props.totalMonthExpense}
        />
      </Container>;
    }
  }
}

const mapStateToProps = ({ expense }) =>{
  const { chosenDate, dailyExpense, todayExpense, totalMonthExpense } = expense;
  return { chosenDate, dailyExpense, todayExpense, totalMonthExpense };
};
const mapDispatchToProps = dispatch => {
    return {
      onDateChange: date => dispatch(changeDate(date)),

      onAddExpense: data => dispatch(addExpense(data)),
      onDeleteExpense: data => dispatch(deleteExpense(data)),
      onUpdateExpense: data => dispatch(updateExpense(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
