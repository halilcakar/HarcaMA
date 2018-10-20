import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import config from "../config";
import SpinnerButton from "react-native-spinner-button";

const Spinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor={config.statusBarColor} barStyle={'light-content'} />
      <SpinnerButton
        buttonStyle={styles.buttonStyle}
        isLoading={true}
        spinnerType='DotIndicator'
        onPress={() => {}}
        animationType={'flipInX'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 10,
    margin: 20,
    backgroundColor: config.navBarBackgroundColor,
    height: 70
  }
});

export default Spinner;