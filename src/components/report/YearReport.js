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
const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'].map((item, index) => {
  return [item, index];
});

class YearReport extends Component {
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
        if(harcama == null) { harcama = '{}'; }
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
    allExpense = []; globData = {};
    harcama = {};
  }
  getListItems(yearTotal) {
    let yearSelected = this.props.chosenDate.getFullYear();
    let jsx = [];
    for (let i = 0; i < aylar.length; i++) {
      const ay = aylar[i];
      if(harcama[`${yearSelected}-${ay[1]}`]) {
        jsx.push(
          <ListItem>
            <Left style={styles.flex2}><Text style={styles.innerText}> { ay[0] } </Text></Left>
            <Body style={styles.flex1}><Text style={styles.innerText}> { harcama[`${yearSelected}-${ay[1]}`].totalMonthExpense } TL</Text></Body>
            <Right style={styles.flex1}><Text style={styles.innerText}> { harcama[`${yearSelected}-${ay[1]}`].totalMonthExpense * 100 / yearTotal }%</Text></Right>
          </ListItem>
        );
      }
      else {
        jsx.push(<ListItem>
          <Left style={styles.flex2}><Text style={styles.innerText}> { ay[0] } </Text></Left>
          <Body style={styles.flex1}><Text style={styles.innerText}>0 TL</Text></Body>
          <Right style={styles.flex1}/>
        </ListItem>);
      }
    }
    return jsx;
  }

  render() {
    if(this.state.isLoading) {
      return (
        <Spinner />
      );
    }
    else {
      if(harcama !== undefined) {
        let yearSelected = this.props.chosenDate.getFullYear();
        let yearTotal = 0;
        for(let key in harcama) {
          if(harcama.hasOwnProperty(key)) {
            yearTotal += harcama[key].totalMonthExpense;
          }
        }
        if(yearTotal === 0) {
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
          return (
            <Container>
              <Content padder>
                <List style={styles.listStyle}>
                  { this.getListItems(yearTotal) }
                </List>
                <List style={styles.listStyle}>
                  <ListItem>
                    <Left style={styles.flex2}><Text style={styles.innerText}>Genel Toplam</Text></Left>
                    <Body style={styles.flex1}/>
                    <Right style={styles.flex1}><Text style={styles.innerText}>{yearTotal} TL</Text></Right>
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
                Bu yıla ait HarcaMA YOH Galiba Bilemedik!!
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
  innerText: { color: '#767676' },
  listStyle: { borderBottomWidth: 1, borderColor: '#686868' },
  harcamaYokHatali: { justifyContent: 'center', alignItems: 'center' }
});

export default YearReport;
