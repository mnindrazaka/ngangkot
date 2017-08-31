import React from 'react';
import ValidationComponent from 'react-native-form-validator';
import {
    Container,
    Content,
    Button,
    Text,
    Form,
    Item,
    Input,
    Card,
    H2,
    Icon,
    StyleProvider,
    Header,
    Left,
    Body,
    Title
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import ErrorLabel from '../components/ErrorLabel';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from '../config/firebase';

export default class UbahPassword extends ValidationComponent {

    constructor (props) {
        super(props);
        this.state = {
            password: '',
            'password baru': '',
            'konfirmasi password': '',
            errors: {}
        }
    }

    periksaPassword() {
        firebase.database().ref("penumpang/" + this.props.navigation.state.params.user.id_penumpang).once("value").then((snapshot) => {
            if (snapshot.val().password == this.state.password) {
                return true;
            } else {
                return false;
            }
        });
    }

    ubah () {
        this.validasiForm();

        if(!this.isFormValid()) {
            return 0;
        }

        if(!this.periksaPassword()) {
            this.setState({
                password: '',
                'password baru': '',
                'konfirmasi password': '',
                errors: {
                    'password': 'password salah'
                }
            });
            return 0;
        }

        if(this.state['password baru'] != this.state['konfirmasi password']) {
            this.setState({
                password: '',
                'password baru': '',
                'konfirmasi password': '',
                errors: {
                   'konfirmasi password': 'konfirmasi password salah'
               }
            });

            return 0;
        }

        if (this.isFormValid()) {
            firebase.database().ref('penumpang/' + this.props.navigation.state.params.user.id_penumpang).set({
                password: this.state['password baru'],
            }).then(() => {
                return firebase.auth().currentUser.updatePassword(this.state['password baru']);
            }).then(() => {
                this.props.navigation.navigate('Main');
            }).catch((error) => {
                switch (error.code) {
                    case "auth/network-request-failed":
                        Alert.alert("Koneksi Gagal", "Cek koneksi internet anda");
                        break;
                    default:
                        Alert.alert("Terjadi Kesalahan", "Kesalahan tidak diketahui");
                }
            });
        }
    }

    validasiForm() {
        this.validate({
            'password': {required: true, minlength: 6},
            'password baru': {required: true, minlength: 6},
            'konfirmasi password': {required: true, minlength: 6},
        });

        let errors = {};
        let errors_string = this.getErrorMessages().split("\n");
        errors_string.forEach((error) => {
            for (let key in this.state) {
                if (error.indexOf(key) !== -1) {
                    errors[key] = error;
                }
            }
        });

        this.setState({errors});
    }

    render() {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container style={{ backgroundColor: '#fff' }}>

                  <Header>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="chevron-left" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>Ubah Password</Title>
                      </Body>
                  </Header>
                  <Content padder>

                      <Form style={styles.form}>
                          <Item floatingLabel error={this.isFieldInError('password')}>
                              <Icon name="lock" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Password"
                                value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}
                                secureTextEntry={true}/>
                          </Item>
                          <ErrorLabel error={this.state.errors.password} />

                          <Item floatingLabel error={this.isFieldInError('password baru')}>
                              <Icon name="lock" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Password Baru"
                                value={this.state['password baru']}
                                onChangeText={(text) => this.setState({'password baru': text})}
                                secureTextEntry={true}/>
                          </Item>
                          <ErrorLabel error={this.state.errors['password baru']} />

                          <Item floatingLabel error={this.isFieldInError('konfirmasi password')}>
                              <Icon name="lock" style={{color:'#4c4c4c'}}/>
                              <Input
                                placeholder="Konfirmasi Password"
                                value={this.state['konfirmasi password']}
                                onChangeText={(text) => this.setState({'konfirmasi password': text})}
                                secureTextEntry={true}/>
                          </Item>
                          <ErrorLabel error={this.state.errors['konfirmasi password']} />
                      </Form>

                      <Button
                        primary
                        block
                        onPress={() => this.ubah()}
                        style={{marginBottom: 10}}>
                          <Text>Ubah</Text>
                      </Button>

                  </Content>
              </Container>
          </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 30,
        height: 35
    },
    form: {
        marginBottom: 20
    },
    formText: {
        color: '#5f5f5f',
        textAlign: 'center'
    },
    loginButton: {
        marginBottom: 10,
        backgroundColor: '#5c98ed'
    },
    logo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    card: {
        paddingTop: 20
    }
});