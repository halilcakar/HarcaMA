import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Body, Left, Right, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../../config';

import icon from '../../assets/64x64-rev.png';

class HeaderComp extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: config.navBarBackgroundColor }} androidStatusBarColor={config.statusBarColor}>
        <Left style={[styles.container, styles.flex1]}>
          <TouchableOpacity onPress={this.props.onIconPress} style={styles.flex1}>
            <Image source={icon} style={styles.image} />
          </TouchableOpacity>
        </Left>
        <Body style={[styles.container, styles.flex2]}>
          {/*<DatePicker
            chosenDate={this.props.chosenDate}
            defaultDate={this.props.chosenDate}
            maximumDate={(new Date().setDate(new Date().getDate() + 1))}
            locale={'tr'}
            format="DD-MM-YYYY"
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            animationType={'fade'}
            androidMode={'default'}
            textStyle={styles.datePickerTextStyle}
            onDateChange={this.props.setDate}
          />*/}
          <DatePicker
            date={this.props.chosenDate}
            mode="date"
            format="DD/MM/YYYY"
            maxDate={new Date()}
            showIcon={false}
            duration={500}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold'
              }
            }}
            onDateChange={date => {
              date = date.split('/').reverse().join('/');
              this.props.setDate(new Date(date))
            }}
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
  },
  image: {
    width: 36,
    height: 36
  },
  datePickerTextStyle: {
    color: 'white',
    fontSize: 25
  }
});

export default HeaderComp;
