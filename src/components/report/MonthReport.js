import React, { Component } from 'react';
import _ from 'lodash';
import { AsyncStorage, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Body, Right } from 'native-base';
import { reportData } from '../../store/actions';
import Spinner from '../Spinner';

const screenWidth = Dimensions.get('window').width;
let date = new Date();
let dateString = `${date.getFullYear()}-${date.getMonth() + 1}`;
let thisMonth;
let allExpense = [], globData = {};
let harcama = {};

class MonthReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.getListItems = this.getListItems.bind(this);
  }

  componentDidMount() {
    const getItems = async () => {
      try {
        harcama = await AsyncStorage.getItem('HarcaMA');
        if (harcama == null) {
          harcama = '{}';
        }
        harcama = JSON.parse(harcama);
        setTimeout(() => {
          console.log('setTimeOut');
          this.setState({
            isLoading: false,
            ...harcama
          });
        }, 3000)
      }
      catch (e) {
        harcama = {
          expenseTypes: [...expenseTypes]
        };
      }
    };
    getItems();
    date = new Date();
    dateString = `${date.getFullYear()}-${date.getMonth() + 1}`;
    thisMonth = undefined;
    allExpense = [];
    globData = {};
    harcama = {};
  }

  getListItems() {
    let jsx = [];
    let sortable = [];
    for (let key in globData) {
      if (globData.hasOwnProperty(key))
        sortable.push([globData[key], globData[key].total]);
    }
    sortable.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < sortable.length; i++) {
      const key = sortable[i][0];
      if (key.total !== 0) {
        jsx.push(
          <ListItem>
            <Left style={styles.flex2}><Text> {key.name} </Text></Left>
            <Body style={styles.flex1}><Text> {key.total} TL</Text></Body>
            <Right style={styles.flex1}><Text> {key.yuzde}%</Text></Right>
          </ListItem>
        );
      }
      else {
        jsx.push(
          <ListItem>
            <Left style={styles.flex2}><Text> {key.name} </Text></Left>
            <Body style={styles.flex1}><Text>0 TL</Text></Body>
            <Right style={styles.flex1}/>
          </ListItem>
        )
      }
    }
    return jsx;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner/>
      );
    }
    else {
      let prefix = `${this.props.chosenDate.getFullYear()}-${this.props.chosenDate.getMonth() + 1}`;
      if (harcama[prefix] !== undefined) {
        if (harcama[prefix].totalMonthExpense === 0) {
          return (
            <Container>
              <Content padder>
                <Text>
                  HarcaMA YOH!
                </Text>
              </Content>
            </Container>
          );
        }
        else {
          const expenseTypes = [
            { 'label': 'Ev Giderleri(Kira, boya vs.)', 'value': 'evGider' },
            { 'label': 'Yemek', 'value': 'yemek' },
            { 'label': 'Sağlık', 'value': 'saglik' },
            { 'label': 'Kozmetik', 'value': 'kozmetik' },
            { 'label': 'Elektronik', 'value': 'elektronik' },
            { 'label': 'Kıyafet', 'value': 'kiyafet' },
            { 'label': 'Okul', 'value': 'okul' }
          ];
          for (let i = 0; i < expenseTypes.length; i++) {
            const expenseType = expenseTypes[i];
            globData[expenseType.value] = {
              name: _.truncate(expenseType.label, { omission: '', length: 12 }),
              total: 0
            };
          }
          if (harcama[prefix].days) {
            for (let key in harcama[prefix].days) {
              if (harcama[prefix].days.hasOwnProperty(key)) {
                allExpense = [...allExpense, ...harcama[prefix].days[key]];
              }
            }
          }
          for (let i = 0; i < allExpense.length; i++) {
            let expense = allExpense[i];
            globData[expense.alisverisTipi].total += parseInt(expense.total);
            globData[expense.alisverisTipi].yuzde = (globData[expense.alisverisTipi].total * 100 / harcama[prefix].totalMonthExpense).toFixed(2);
          }

          return (
            <Container>
              <Content padder>
                <List style={styles.listStyle}>
                  {this.getListItems()}
                </List>
                <List style={styles.listStyle}>
                  <ListItem>
                    <Left style={styles.flex2}><Text>Genel Toplam</Text></Left>
                    <Body style={styles.flex1}/>
                    <Right style={styles.flex1}><Text>{harcama[prefix].totalMonthExpense} TL</Text></Right>
                  </ListItem>
                </List>
              </Content>
            </Container>
          );
        }
      }
      else {
        return (
          <Container style={styles.harcamaYokHatali}>
            <Content padder>
              <Text>
                HarcaMA YOH Galiba Bilemedik!!
              </Text>
              <Text>
                Tekrar mı denesen?
              </Text>
            </Content>
          </Container>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  flex2: { flex: 2 },
  flex1: { flex: 1 },
  listStyle: { borderBottomWidth: 2 },
  harcamaYokHatali: { justifyContent: 'center', alignItems: 'center' }
});

export default MonthReport;
