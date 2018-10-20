import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import config from '../config';

const ListItemComp = (props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { flexDirection: 'row' }]}>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Harcama:</Text>
          <Text style={styles.text}>{props.item.harcama}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Adet:</Text>
          <Text style={styles.text}>{props.item.adet}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Fiyat:</Text>
          <Text style={styles.text}>{props.item.fiyat} TL</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeader}>Toplam:</Text>
          <Text style={styles.text}>{props.item.toplam} TL</Text>
        </View>
        <Button onPress={props.edit} style={styles.button}>
          <Icon name={`${config.platPref}settings`} size={25} color={'white'}/>
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
    borderColor: '#cdd3d6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
    padding: 10,
    width: '100%',
    backgroundColor: 'white'
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
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: '#77CCB3'
  },
  text: {
    color: '#5c6265',
    fontSize: 17,
    paddingLeft: 10,
    marginRight: 10
  }
});

export default ListItemComp;
