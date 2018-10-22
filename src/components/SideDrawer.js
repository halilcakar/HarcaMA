import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Content, Header, Text, Button, H1, Footer } from 'native-base';

import icon from '../assets/1024x1024-rev.png';
import config from '../config';

class SideDrawer extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={config.statusBarColor}>
          <Image resizeMode={'contain'} source={icon} style={styles.image} />
          <H1 style={{ color: 'white' }}>HarcaMA</H1>
        </Header>
        <Content padder style={{ borderBottomWidth: 0, shadowOffset: {height: 0, width: 0},shadowOpacity: 0, elevation: 0}}>
          <Button full light>
            <Text>Bölüm: Market</Text>
          </Button>
          <Button style={{ marginTop: 10 }} full light>
            <Text>Dil: Türkçe</Text>
          </Button>

        </Content>
        <Footer style={{ backgroundColor: 'white', flexDirection: 'column', padding: 10, height: 150, elevation: 0 }}>
          <Button full style={{ marginTop: 10 }} bordered success>
            <Text>Ayarlar</Text>
          </Button>
          <Button full style={{ marginTop: 10 }} bordered danger>
            <Text>Bütün harcamaları sil</Text>
          </Button>
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
  }
});

export default SideDrawer;
