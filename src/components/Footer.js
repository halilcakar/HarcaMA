import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Footer, FooterTab, H3, H2, Left, Right } from "native-base";


const platPref = Platform.OS === 'android' ? 'md-' : 'ios-';

class FooterComp extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={[styles.bg, { borderRightWidth: 1 }]}>
          <Left style={styles.subContainer}>
            <H2 style={styles.baslik}>Bugün:</H2>
          </Left>
          <Right style={styles.subContainer}>
            <H3 style={styles.text}>{this.props.todayExpense || 0} TL</H3>
          </Right>
        </FooterTab>
        <FooterTab style={[styles.bg, { borderLeftWidth: 1 }]}>
          <Left style={styles.subContainer}>
            <H2 style={styles.baslik}>Bu Ay:</H2>
          </Left>
          <Right style={styles.subContainer}>
            <H3 style={styles.text}>{this.props.thisMonthExpense || 0} TL</H3>
          </Right>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#1DAA80'
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 21,
    paddingTop: 3,
    paddingRight: 10
  },
  baslik: {
    color: 'white',
    fontSize: 17
  }
});

export default FooterComp;
