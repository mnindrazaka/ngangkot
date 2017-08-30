import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Icon,
    Button,
    Grid,
    Col
} from 'native-base';
import {StyleSheet, Image} from 'react-native';

export default class Profil extends Component {

    render () {
        return (
          <Content>
              <Content style={styles.top}>
                  <Image style={styles.image} source={{uri: 'http://placehold.it/300x300'}} />
                  <Text style={styles.textTop}>Nindra Zaka</Text>
                  <Text style={styles.textTop}>mnindrazaka@gmail.com</Text>
              </Content>
              <Content style={styles.center}>
                  <List>
                      <ListItem icon first>
                        <Left>
                            <Icon name="place" style={styles.textCenter} />
                        </Left>
                          <Body>
                            <Text style={styles.textCenter}>Probolinggo</Text>
                          </Body>
                      </ListItem>

                      <ListItem icon last>
                          <Left>
                              <Icon name="smartphone" style={styles.textCenter} />
                          </Left>
                          <Body>
                          <Text style={styles.textCenter}>085331247098</Text>
                          </Body>
                      </ListItem>
                  </List>
              </Content>
              <Content style={styles.bottom} padder>
                  <Grid>
                      <Col style={{paddingRight: 5}}>
                          <Button primary block bordered>
                              <Text>Ubah Profil</Text>
                          </Button>
                      </Col>

                      <Col style={{paddingLeft: 5}}>
                          <Button danger block bordered>
                              <Text>Ubah Password</Text>
                          </Button>
                      </Col>
                  </Grid>
              </Content>
          </Content>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: '#5677e7',
        paddingTop: 20,
        paddingBottom: 20,
    },
    center: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    bottom: {
        backgroundColor: '#f8f8f8',
        paddingTop: 20,
        paddingBottom: 20,
    },
    image: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,
        width: 200,
        height: 200
    },
    textTop: {
        textAlign: 'center',
        color: '#fff'
    },
    textCenter: {
        color: '#3d3d3d'
    },
});