import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import {Thumbnail, Button, Icon, Container, Content} from 'native-base';
import JSONTree from 'react-native-json-tree';
import {TouchableOpacity, TouchableHighlight, Dimensions, View, Modal, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';
import {WebView} from 'react-native-webview';
import {Col, Row, Grid} from 'react-native-easy-grid';
import parse from 'url-parse';

import {DATE_FORMAT} from '../../constants';
import style from '../../style';

const Launch = ({launch, navigation}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const {
    mission_name,
    details,
    launch_date_unix,
    rocket: {
      rocket_name,
      first_stage,
      second_stage,
    },
    launch_site: {
      site_name_long,
    },
    links: {
      flickr_images,
      video_link,
    },
  } = launch;
  const upcoming = launch_date_unix * 1000 > Date.now();
  const toggleImageModal = useCallback(() => {
    setShowImageModal(!showImageModal);
  }, [showImageModal, setShowImageModal]);

  useEffect(() => {
    navigation.setParams({launchTitle: mission_name});
  }, []);
  const videoLinkUrl = video_link && parse(video_link);

  return (
    <Container>
      <Content style={{backgroundColor: "#f5f5f5", padding: 16}}>
        <View style={{...style.card, padding: 0}}>
      <View style={headingStyle}>
        <Text style={headingTextStyle}>MISSION</Text>
      </View>
      <View style={{padding: 24}}>
        <View>
          <Text style={style.text}>Name: {mission_name}</Text>
        </View>
        <View>
          <Text style={style.text}>
            Date: {format(launch_date_unix * 1000, DATE_FORMAT)}
            {' '}
            {upcoming && (
            <Text style={{color: 'green'}}>
              (upcoming)
            </Text>
          )}
          </Text>
        </View>
        <View>
          <Text style={style.text}>Location: {site_name_long}</Text>
        </View>
        <View>
          <Text style={style.text}>{details || 'No details found'}</Text>
        </View>
      </View>
    </View>
        <View style={{...style.card, padding: 0}}>
      <View style={headingStyle}>
        <Text style={headingTextStyle}>ROCKET</Text>
      </View>
      <View style={{padding: 16}}>
        <View style={{marginBottom: 10}}>
          <Text style={style.text}>First Stage Cores</Text>
        </View>
        <View>
          {
            first_stage.cores.map((core, index) => {
              const {
                flight,
                block,
                gridfins,
                legs,
                reused,
                landing_intent,
                landing_type,
                landing_vehicle,
              } = core;

              return (
                <Grid key={index} style={gridStyle.grid}>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Flight</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{flight || 'n/a'}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Block</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{block || 'n/a'}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Gridfins</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{gridfins || 'n/a'}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Legs</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{legs || 'n/a'}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Reused</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{reused || 'n/a'}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Landing Intent</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{landing_intent || 'n/a'}</Text>
                    </Col>
                  </Row>
                </Grid>
              );
            })
          }
        </View>
        <View style={{marginTop: 10, marginBottom: 10}}>
          <Text style={style.text}>Second Stage Payloads</Text>
        </View>
        <View>
          {
            second_stage.payloads.map((payload, index) => {
              const {
                manufacturer,
                payload_type,
                payload_mass_kg,
                payload_mass_lbs,
                orbit,
                orbit_params,
              } = payload;
              const {
                apoapsis_km,
                periapsis_km,
                eccentricity,
                inclination_deg,
                longitude,
                reference_system,
                regime,
                semi_major_axis_km,
              } = orbit_params;
              
              return (
                <Grid key={index} style={gridStyle.grid}>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Manufacturer</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{manufacturer}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Payload Type</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{payload_type}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Payload (kg)</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{payload_mass_kg}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={gridStyle.firstCol}>
                      <Text style={gridStyle.text}>Payload (lbs)</Text>
                    </Col>
                    <Col style={gridStyle.secondCol}>
                      <Text style={gridStyle.text}>{payload_mass_lbs}</Text>
                    </Col>
                  </Row>
                  <Row style={gridStyle.row}>
                    <Col style={{padding: 8}}>
                      <View style={{marginBottom: 8}}>
                        <Text style={gridStyle.text}>Orbit Params</Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Reference System: {reference_system || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Regime: {regime || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Longitude: {longitude || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Semi Major Axis (km): {semi_major_axis_km || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Eccentricity: {eccentricity || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Periapsis (km): {periapsis_km || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Apoapsis (km): {apoapsis_km || 'n/a'}
                        </Text>
                      </View>
                      <View>
                        <Text style={gridStyle.text}>
                          Inclination (deg): {inclination_deg || 'n/a'}
                        </Text>
                      </View>
                    </Col>
                  </Row>                    
                </Grid>
              );
            })
          }
        </View>
      </View>
    </View>
        <View style={{...style.card, padding: 0}}>
        <View style={headingStyle}>
          <Text style={headingTextStyle}>MEDIA</Text>
        </View>
        <View style={{padding: 16}}>
          {
            flickr_images.length > 0 && (
              <Grid style={{marginBottom: 16}}>
                {
                  flickr_images.map((uri) => (
                    <Col key={uri}>
                      <TouchableOpacity onPress={toggleImageModal}>
                        <Thumbnail source={{uri}} />
                      </TouchableOpacity>
                    </Col>
                  ))
                }
              </Grid>
            )
          }
          {
            videoLinkUrl && (
              <View>
                <WebView
                  height={300}
                  source={{uri: `https://www.youtube.com/embed/${videoLinkUrl.query.v || videoLinkUrl.pathname.replace('/', '')}`}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true} />
              </View>
            )
          }          
        </View>
      </View>
      </Content>
      <Modal
        visible={showImageModal}>
        <ImageViewer
          imageUrls={flickr_images.map((url) => ({url}))} />
        <View style={{position: 'absolute', top: 32, right: 20}}>
          <TouchableHighlight onPress={toggleImageModal}>
            <Icon type="AntDesign" name="closecircleo" style={{color: "#fff"}} />
          </TouchableHighlight>
        </View>

      </Modal>
    </Container>
  );
};

const headingStyle = {
  paddingTop: 12, 
  paddingBottom: 12,
  paddingLeft: 24, 
  paddingRight: 24,
  backgroundColor: '#111', 
  borderTopLeftRadius: 10, 
  borderTopRightRadius: 10,
  fontSize: 20,
};

const headingTextStyle = {
  fontSize: 20,
  color: '#fff',
};

const gridStyle = StyleSheet.create({
  grid: {
    borderColor: '#aaa',
    borderWidth: 1,
  },
  row: {
    borderColor: '#aaa', 
    borderBottomWidth: 1,
  },
  firstCol: {
    padding: 8,
    width: 160,
  },
  secondCol: {
    borderColor: '#aaa', 
    borderLeftWidth: 1, 
    padding: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default Launch;
