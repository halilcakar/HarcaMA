import React, { Component } from "react";
import { StatusBar, View, StyleSheet, Animated } from "react-native";
import config from "../config";
import SpinnerButton from "react-native-spinner-button";

import icon from '../assets/512x512.png';

class Spinner extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 1,
        duration: 2500,
      }
    ).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar backgroundColor={config.statusBarColor} barStyle={'light-content'} />
        <Animated.Image source={icon} style={[styles.iconStyle, { opacity: fadeAnim }]} />
        <SpinnerButton
          buttonStyle={styles.buttonStyle}
          isLoading={true}
          spinnerType='DotIndicator'
          onPress={() => {}}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 10,
    margin: 20,
    backgroundColor: config.navBarBackgroundColor,
    height: 60
  },
  iconStyle: {
    width: 256,
    height: 256
  }
});

export default Spinner;
