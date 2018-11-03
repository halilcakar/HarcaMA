import React, { Component } from 'react';
import { AsyncStorage, Dimensions, StyleSheet, Image, View } from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Body, Right } from 'native-base';
import { reportData } from '../../store/actions';
import Spinner from '../Spinner';

import harcamaYok from '../../assets/harcama-yok.png';

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
          this.setState({
            isLoading: false,
            ...harcama
          });
        }, 2000);
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
          <ListItem style={{ justifyContent: 'center' }}>
            <Left style={styles.flex2}><Text style={styles.innerText}> { ay[0] } </Text></Left>
            <Body style={styles.flex1}><Text style={styles.innerText}> { harcama[`${yearSelected}-${ay[1]}`].totalMonthExpense } TL</Text></Body>
            <Right style={styles.flex1}><Text style={styles.innerText}> { (harcama[`${yearSelected}-${ay[1]}`].totalMonthExpense * 100 / yearTotal).toFixed(2) }%</Text></Right>
          </ListItem>
        );
      }
      else {
        jsx.push(<ListItem style={{ justifyContent: 'center' }}>
          <Left style={styles.flex2}><Text style={styles.innerText}> { ay[0] } </Text></Left>
          <Body style={styles.flex1}><Text style={styles.innerText}>0 TL</Text></Body>
          <Right style={styles.flex1}/>
        </ListItem>);
      }
    }
    return jsx;
  }

  getHarcamaYok() {
    return (
      <View style={styles.harcamaYokContainer}>
        <Image resizeMode={'center'} source={harcamaYok} style={{ width: '60%', height: '40%', opacity: .5,}}/>
        <Text style={styles.subText}>
          Harcaman Yok!
        </Text>
        <Text style={styles.subText1}>
          Tüm yıl hiç bişey harcamadın mı?
        </Text>
      </View>
    );
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
          return this.getHarcamaYok();
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
        return this.getHarcamaYok();
      }
    }
  }
}

const styles = StyleSheet.create({
  flex2: { flex: 2 },
  flex1: { flex: 1 },
  innerText: { color: '#767676', alignSelf: 'center' },
  listStyle: { borderBottomWidth: 1, borderColor: '#686868' },
  subText: { fontSize: 25, color: '#767676' },
  subText1: { marginTop: 10, color: '#767676', },
  harcamaYokHatali: { justifyContent: 'center', alignItems: 'center' },
  harcamaYokContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

});

export default YearReport;
