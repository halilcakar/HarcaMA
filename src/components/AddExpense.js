import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Form, Item, Label, Input, Card, Picker, CardItem, Button, Text} from 'native-base';

import config from '../config';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baslik: '',
      aciklama: '',
      adet: '',
      fiyat: '',
      odemeSekli: 'nakit',
      toplam: 0
    };
  }
  onValueChange(value: string) {
    this.setState({
      odemeSekli: value
    });
  }
  onFiyatChange(fiyat) {
    this.setState(prevState => {
      let toplam = parseInt(prevState.adet) * parseInt(fiyat);
      if (isNaN(toplam)) {
        toplam = 0;
      }
      return {
        ...prevState,
        fiyat,
        toplam
      };
    });
  }
  onAdetChange(adet) {
    this.setState(prevState => {
      let toplam = parseInt(adet) * parseInt(prevState.fiyat);
      if (isNaN(toplam)) {
        toplam = 0;
      }
      return {
        ...prevState,
        adet,
        toplam
      };
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <Form>
              <CardItem>
                <Item inlineLabel>
                  <Label>Başlık:</Label>
                  <Input onChangeText={(baslik) => this.setState({baslik})} value={this.state.baslik}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Açıklama:</Label>
                  <Input onChangeText={(aciklama) => this.setState({ aciklama })} value={this.state.aciklama}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Adet:</Label>
                  <Input onChangeText={this.onAdetChange.bind(this)} value={this.state.adet} keyboardType={'numeric'}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel>
                  <Label>Birim Fiyat:</Label>
                  <Input onChangeText={this.onFiyatChange.bind(this)} value={this.state.fiyat}
                         keyboardType={'numeric'}/>
                </Item>
              </CardItem>
              <CardItem>
                <Item picker>
                  <Picker
                    mode="dialog"
                    placeholder="Select your SIM"
                    selectedValue={this.state.odemeSekli}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Nakit" value="nakit"/>
                    <Picker.Item label="Kredi Kartı" value="kredikarti"/>
                    <Picker.Item label="Banka Kartı" value="bankakarti"/>
                  </Picker>
                </Item>
              </CardItem>
              <CardItem>
                <Item inlineLabel disabled>
                  <Label>Toplam :</Label>
                  <Input disabled={true} value={`${this.state.toplam.toString()} TL`}/>
                </Item>
              </CardItem>
              <Button
                onPress={() => {
                  if (this.state.fiyat !== '' && this.state.adet !== '' && this.state.baslik !== '') {
                    this.props.addExpense(this.state);
                    this.props.navigator.popToRoot();
                  }
                }}
                style={styles.buttonStyle}
                full
              >
                <Text style={{fontSize: 18}}> Ekle </Text>
              </Button>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textColor: {
    color: '#FCB340'
  },
  buttonStyle: {
    width: '90%',
    backgroundColor: config.navBarBackgroundColor,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10
  }
});

export default AddExpense;
