import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import {Thumbnail, Button, Icon, Container, Content} from 'native-base';
import JSONTree from 'react-native-json-tree';
import {TouchableOpacity, TouchableHighlight, Dimensions, View, Modal, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';
import {WebView} from 'react-native-webview';
import {Col, Row, Grid} from 'react-native-easy-grid';
import parse from 'url-parse';

import {DATE_FORMAT, SPACEX_LOGO_URL} from '../../constants';
import style from '../../style';

const Launch = ({launch, navigation}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const {
    mission_name,
    details,
    launch_date_unix,
    launch_success,
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
      mission_patch,
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
      <Content style={style.containerContent}>
        <View style={style.card}>
          <View style={{...style.cardItem, marginTop: 0}}>
            <Grid>
              <Col style={{paddingRight: 10}}>
                <View>
                  <Text style={{...style.text, fontSize: 42, fontWeight: "600"}}>{mission_name}</Text>
                </View>
                {upcoming && (
                  <View style={style.cardItem}>
                    <Text style={{...style.text, color: "#E8442E"}}>Upcoming</Text>
                  </View>
                )}                
              </Col>
              <Col style={{width: 80}}>
                <Thumbnail large source={{uri: mission_patch || SPACEX_LOGO_URL}} />
              </Col>
            </Grid>
          </View>
          <View style={style.cardItem}>
            <Text style={style.text}>
              <Text style={{fontWeight: "bold"}}>Date:</Text>
              {" "}
              {format(launch_date_unix * 1000, DATE_FORMAT)}
            </Text>
          </View>
          <View style={style.cardItem}>
            <Text style={style.text}>
              <Text style={{fontWeight: "bold"}}>Location:</Text>
              {" "}
              {site_name_long}
            </Text>
          </View>
          {
            !upcoming && (
              <View style={style.cardItem}>
                <Text style={style.text}>
                  <Text style={{fontWeight: "bold"}}>Result:</Text>
                  {' '}
                  {launch_success 
                    ? <Text style={{color: "#7BE0AD"}}>Successful</Text> 
                    : <Text style={{color: "#D90368"}}>Failed</Text>
                  }
                </Text>
              </View>          
            )
          }                
          <View style={style.cardItem}>
            <Text style={style.text}>
              <Text style={{fontWeight: "700"}}>Details:</Text>
              {" "}
              <Text>
                {details || "No details found"}
              </Text>
            </Text>
          </View>
        </View>
        <View style={style.card}>
          <View style={{marginBottom: 10}}>
            <Text style={{...style.text, fontSize: 38, fontWeight: "600"}}>
              Rocket
            </Text>
          </View>
          <View>
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: "bold"}}>1st Stage Cores</Text>
            </View>
            <View style={style.cardItem}>
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
                    <Grid key={index} style={{...gridStyle.grid, marginBottom: 8}}>
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
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: "bold"}}>2nd Stage Payloads</Text>
            </View>
            <View style={style.cardItem}>
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
                    <Grid key={index} style={{...gridStyle.grid, marginBottom: 8}}>
                      <Row style={gridStyle.row}>
                        <Col style={gridStyle.firstCol}>
                          <Text style={gridStyle.text}>Manufacturer</Text>
                        </Col>
                        <Col style={gridStyle.secondCol}>
                          <Text style={gridStyle.text}>{manufacturer || 'n/a'}</Text>
                        </Col>
                      </Row>
                      <Row style={gridStyle.row}>
                        <Col style={gridStyle.firstCol}>
                          <Text style={gridStyle.text}>Payload Type</Text>
                        </Col>
                        <Col style={gridStyle.secondCol}>
                          <Text style={gridStyle.text}>{payload_type || 'n/a'}</Text>
                        </Col>
                      </Row>
                      <Row style={gridStyle.row}>
                        <Col style={gridStyle.firstCol}>
                          <Text style={gridStyle.text}>Payload (kg)</Text>
                        </Col>
                        <Col style={gridStyle.secondCol}>
                          <Text style={gridStyle.text}>{payload_mass_kg || 'n/a'}</Text>
                        </Col>
                      </Row>
                      <Row style={gridStyle.row}>
                        <Col style={gridStyle.firstCol}>
                          <Text style={gridStyle.text}>Payload (lbs)</Text>
                        </Col>
                        <Col style={gridStyle.secondCol}>
                          <Text style={gridStyle.text}>{payload_mass_lbs || 'n/a'}</Text>
                        </Col>
                      </Row>
                      <Row style={gridStyle.row}>
                        <Col style={{padding: 8}}>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>Orbit Params</Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Reference System: {reference_system || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Regime: {regime || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Longitude: {longitude || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Semi Major Axis (km): {semi_major_axis_km || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Eccentricity: {eccentricity || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Periapsis (km): {periapsis_km || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
                            <Text style={gridStyle.text}>
                              Apoapsis (km): {apoapsis_km || 'n/a'}
                            </Text>
                          </View>
                          <View style={{marginBottom: 8}}>
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
        <View style={style.card}>
          <View>
            <Text style={{...style.text, fontSize: 38, fontWeight: "600"}}>Media</Text>
          </View>
          <View style={style.cardItem}>
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
    color: "#fff",
  },
});

export default Launch;
