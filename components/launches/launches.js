import React from 'react';
import {StyleSheet} from 'react-native';
// https://medium.com/@clarkjohnson_85334/creating-a-simple-react-native-maps-app-7e3fc324a0b7
import MapView from 'react-native-maps';
import {Container, Text} from 'native-base';

const Launches = ({launches}) => {
  return (
    <Container>
      <MapView style={{...StyleSheet.absoluteFillObject}}>
        </MapView>
    </Container>
  );
};

export default Launches;
