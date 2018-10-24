import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Image, StyleSheet } from 'react-native';
import { Container, Content, Header, Text, Button, H1 } from 'native-base';

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

  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={config.statusBarColor}>
          <Image resizeMode={'contain'} source={icon} style={styles.image} />
          <H1 style={styles.h1}>HarcaMA</H1>
        </Header>
        <Content padder style={styles.topContent}>
          <Button style={styles.mt10} full light>
            <Text uppercase={false}>Değerlendirme</Text>
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
