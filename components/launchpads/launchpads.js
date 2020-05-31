import React from 'react';
import {Container, Header, Body, Title, Footer, FooterTab, Button, Text, Content, Spinner} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';

const Launchpads = ({launchpads}) => {
  return (
    <Container>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        showsUserLocation={true}>
        {
          launchpads.map(({site_id, location, attempted_launches}) => {
            const {name, region, latitude, longitude} = location;

            return (
              <Marker
                key={site_id}
                flat={true}
                coordinate={{latitude, longitude}}
                title={`${name} (${region})`}
                description={`${attempted_launches} launches`}>
              </Marker>
            );
          })
        }
      </MapView>
    </Container>
  );
};

export default Launchpads;
