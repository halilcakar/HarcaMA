import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Alert, Image, StyleSheet } from 'react-native';
import { Container, Content, Header, Text, Button, H1, Left, Body, Right } from 'native-base';

import icon from '../assets/1024x1024-rev.png';
import config from '../config';
import { deleteAllExpense } from '../store/actions';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.onDeleteAllPress = this.onDeleteAllPress.bind(this);
  }
  onDeleteAllPress() {
    Alert.alert(
      'Dikkat',
      'Bu işlem bütün harcamalarınızı silecek! Emin misiniz?',
      [
        {text: 'İptal', onPress: () => {}, style: 'cancel'},
        {text: 'Sil', onPress: () => {
          this.props.deleteAllExpense();
          this.props.navigator.toggleDrawer();
        }},
      ],
      {
        cancelable: false,
      }
    );
  }
  expenseTypes() {
    return config.expenseTypes.map(({label, value}, key) => {
      return (<Button disabled style={[styles.mt10]} info full key={key}>
        <Left style={{ marginLeft: 20 }}>
          <Text style={{ color: 'white' }} uppercase={false}>{_.truncate(label, { length: 12, omission: '' })}</Text>
        </Left>
        <Body>
          <Text style={{ color: 'white' }} uppercase={false}>{value}</Text>
        </Body>
        <Right />
      </Button>);
    });
  }

  render() {
    let date = new Date();
    date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={config.statusBarColor}>
          <Image resizeMode={'contain'} source={icon} style={styles.image} />
          <H1 style={styles.h1}>HarcaMA</H1>
        </Header>
        <Content padder style={styles.topContent}>

          {/*{ this.expenseTypes() }*/}
          <Button full disabled bordered style={styles.disabledButtonStyle}>
            <Text style={styles.innerText}>Bugün: { date }</Text>
          </Button>
          <Button full style={styles.mt10}>
            <Text>Ay Raporu</Text>
          </Button>
          <Button full style={styles.mt10}>
            <Text>Yıl Raporu</Text>
          </Button>
          <Button onPress={this.onDeleteAllPress} full style={styles.mt10} danger>
            <Text>Bütün harcamaları sil</Text>
          </Button>
        </Content>
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
    marginTop: 10
  },
  disabledButtonStyle: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  innerText: {
    color: config.navBarBackgroundColor,
    fontSize: 18
  },
  topContent: {
    borderBottomWidth: 0,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    elevation: 0
  },
  bottomContent: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 10,
    height: 150,
    elevation: 0
  }
});

const mapDispatchToProps = dispatch => {
  return {
    deleteAllExpense: () => dispatch(deleteAllExpense())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
