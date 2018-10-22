import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import _ from 'lodash';

import config from '../config';

const ListItemComp = (props) => {
  const baslik = _.truncate(_.startCase(props.item.baslik), { length: 10, separator: ' '});

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { flexDirection: 'row' }]}>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Başlık:</Text>
          <Text style={styles.text}>{baslik}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Toplam:</Text>
          <Text style={styles.text}>{props.item.total} TL</Text>
        </View>
        <Button onPress={props.edit} style={styles.button}>
          <Icon name={`${config.platPref}settings`} size={25} color={'white'}/>
        </Button>
        <Button onPress={props.delete} style={[styles.button, { backgroundColor: '#ee803e' }]}>
          <Icon name={`${config.platPref}trash`} size={25} color={'white'}/>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#1DAA80',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
    padding: 10,
    width: '100%'
  },
  subContainer: {
    flex: 1
  },
  subHeader: {
    fontSize: 12
  },
  buttonTextStyle: {
    fontSize: 16,
    color: 'white'
  },
  button: {
    flex: .25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: '#77CCB3'
  },
  text: {
    color: '#5D1400',
    fontSize: 18,
    marginRight: 10
  }
});

export default ListItemComp;
