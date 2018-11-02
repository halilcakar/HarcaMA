import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Alert, Image, StyleSheet} from 'react-native';
import {Container, Content, Header, Text, Button, H1, Left, Body, Right, Footer, FooterTab} from 'native-base';

import icon from '../assets/1024x1024-rev.png';
import config from '../config';
import {deleteAllExpense, reportData} from '../store/actions';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.onDeleteAllPress = this.onDeleteAllPress.bind(this);
    this.onYearReportPress = this.onYearReportPress.bind(this);
    this.onMonthReportPress = this.onMonthReportPress.bind(this);
  }

  onDeleteAllPress() {
    Alert.alert(
      'Dikkat',
      'Bu işlem bütün harcamalarınızı silecek! Emin misiniz?',
      [
        {
          text: 'İptal', onPress: () => {
          }, style: 'cancel'
        },
        {
          text: 'Sil', onPress: () => {
            this.props.deleteAllExpense();
            this.props.navigator.toggleDrawer();
          }
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  expenseTypes() {
    return config.expenseTypes.map(({label, value}, key) => {
      return (<Button disabled style={[styles.mt10]} info full key={key}>
        <Left style={{marginLeft: 20}}>
          <Text style={{color: 'white'}} uppercase={false}>{_.truncate(label, {length: 12, omission: ''})}</Text>
        </Left>
        <Body>
        <Text style={{color: 'white'}} uppercase={false}>{value}</Text>
        </Body>
        <Right/>
      </Button>);
    });
  }

  onMonthReportPress() {
    const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    this.props.navigator.toggleDrawer();
    this.props.navigator.push({
      screen: 'HarcaMA.MonthReport',
      title: `${this.props.chosenDate.getFullYear()} - ${aylar[this.props.chosenDate.getMonth()]} Harcamalar`,
      navigatorStyle: {
        navBarBackgroundColor: '#1DAA80',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        statusBarColor: '#167F60'
      },
      passProps: {
        chosenDate: this.props.chosenDate
      }
    });
  }

  onYearReportPress() {
    this.props.navigator.toggleDrawer();
    this.props.navigator.push({
      screen: 'HarcaMA.YearReport',
      title: `${this.props.chosenDate.getFullYear()} Yılı Harcamaları`,
      navigatorStyle: {
        navBarBackgroundColor: '#1DAA80',
        navBarTextColor: 'white',
        navBarButtonColor: 'white',
        statusBarColor: '#167F60'
      },
      passProps: {
        chosenDate: this.props.chosenDate
      }
    });
  }

  isChosenDateSetted() {
    let chosenDate, date = new Date();
    if (this.props.chosenDate) {
      if (date.getFullYear() !== this.props.chosenDate.getFullYear() || date.getMonth() !== this.props.chosenDate.getMonth() || date.getDate() !== this.props.chosenDate.getDate()) {
        chosenDate = this.props.chosenDate;
        chosenDate = `${chosenDate.getDate()}/${chosenDate.getMonth() + 1}/${chosenDate.getFullYear()}`;
        return (
          <Button full disabled bordered style={[styles.disabledButtonStyle]}>
            <Text uppercase={false} style={[styles.innerText]}>Seçili Tarih: {chosenDate}</Text>
          </Button>
        );
      }
    }
  }

  render() {
    let date = new Date();
    date = `${(date.getDate() < 10) ? `0` + date.getDate() : date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={config.statusBarColor}>
          <Image resizeMode={'contain'} source={icon} style={styles.image}/>
          <H1 style={styles.h1}>HarcaMA</H1>
        </Header>
        <Content padder contentContainerStyle={{flexGrow: 1}}>
          <Button full disabled bordered style={styles.disabledButtonStyle}>
            <Text uppercase={false} style={styles.innerText}>Bugün: {date}</Text>
          </Button>
          {this.isChosenDateSetted()}

          <Button onPress={this.onMonthReportPress} full style={styles.mt10}>
            <Text style={{color: config.statusBarColor}}>Ay Raporu</Text>
          </Button>
          <Button onPress={this.onYearReportPress} full style={styles.mt10}>
            <Text style={{color: config.statusBarColor}}>Yıl Raporu</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab padder>
            <Button onPress={this.onDeleteAllPress} style={styles.btmButton}>
              <Text uppercase={false} style={{ fontSize: 16, color: 'white' }}>Bütün harcamaları sil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: config.navBarBackgroundColor,
    height: 200,
    alignItems: 'center',
    flexDirection: 'column'
  },
  image: {
    height: '80%',
    width: '80%'
  },
  h1: {
    color: 'white'
  },
  mt10: {
    marginTop: 10,
    backgroundColor: '#FFF'
  },
  disabledButtonStyle: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  innerText: {
    color: config.statusBarColor,
    fontSize: 18
  },
  topContent: {
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    elevation: 0,
  },
  btmButton: {
    backgroundColor: '#ee803e',
  },
  bottomContent: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 10,
    height: 150,
    elevation: 0
  }
});

const mapStateToProps = ({expense}) => {
  return {
    chosenDate: expense.chosenDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAllExpense: () => dispatch(deleteAllExpense())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
