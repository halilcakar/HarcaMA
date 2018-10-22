import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Body, DatePicker, Left, Right, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config';

import icon from '../assets/64x64-rev.png';

class HeaderComp extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: config.navBarBackgroundColor }} androidStatusBarColor={config.statusBarColor}>
        <Left style={[styles.container, styles.flex1]}>
          <TouchableOpacity onPress={this.props.onIconPress} style={styles.flex1}>
            <Image source={icon} style={{ width: 36, height: 36 }} />
          </TouchableOpacity>
        </Left>
        <Body style={[styles.container, styles.flex2]}>
          <DatePicker
            defaultDate={this.props.chosenDate}
            minimumDate={new Date(2018, 0, 1)}
            maximumDate={new Date()}
            locale={'tr-TR'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            animationType={'fade'}
            androidMode={'default'}
            textStyle={{ color: 'white', fontSize: 25 }}
            onDateChange={this.props.setDate}
          />
        </Body>
        <Right style={[styles.container, styles.flex1]}>
          <TouchableOpacity onPress={this.props.onToggle} style={styles.flex1}>
            <Icon name={`plus-circle`} size={30} color={'white'}/>
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex2: {
    flex: 2
  }
});

export default HeaderComp;
