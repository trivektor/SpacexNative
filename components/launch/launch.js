import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import {Thumbnail, Button, Icon} from 'native-base';
import JSONTree from 'react-native-json-tree';
import {TouchableOpacity, TouchableHighlight, Dimensions, View, Modal, ScrollView, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import ImageViewer from 'react-native-image-zoom-viewer';
import {WebView} from 'react-native-webview';
import {Col, Row, Grid} from 'react-native-easy-grid';
import parse from 'url-parse';

import {DATE_FORMAT} from '../../constants';
import style from '../../style';

const JSON_TREE_THEME = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

const JSON_TREE_PROPS = {
  hideRoot: true,
  theme: JSON_TREE_THEME,
  invertTheme: false,
  shouldExpandNode: () => true,
};

const CORE_TABLE_TITLE = [
  'Flight', 
  'Block', 
  'Gridfins', 
  'Legs', 
  'Reused', 
  'Landed Successfully', 
  'Landing Intent', 
  'Landing Type', 
  'Landing Vehicle',
];

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
    <ScrollView style={{backgroundColor: "#f5f5f5", padding: 8}}>
      <View style={{...style.card, padding: 0}}>
        <View style={{padding: 16, backgroundColor: "#42398B", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <Text style={{...style.heading, marginBottom: 0, color: "#fff"}}>Mission</Text>
        </View>
        <View style={{padding: 16}}>
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
        <View style={{padding: 16, backgroundColor: "#42398B", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <Text style={{...style.heading, marginBottom: 0, color: "#fff"}}>
            Rocket
          </Text>
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
                  land_success,
                  landing_intent,
                  landing_type,
                  landing_vehicle,
                } = core;

                return (
                  <Grid style={{borderWidth: 1, borderColor: "#aaa"}}>
                    <Row style={{borderColor: "#aaa", borderBottomWidth: 1}}>
                      <Col style={{padding: 5}}><Text>Flight</Text></Col>
                      <Col style={{borderColor: "#aaa", borderLeftWidth: 1, padding: 5}}>
                        <Text>{flight}</Text>
                      </Col>
                    </Row>
                    <Row style={{borderColor: "#aaa", borderBottomWidth: 1}}>
                      <Col style={{padding: 5}}><Text>Block</Text></Col>
                      <Col style={{borderColor: "#aaa", borderLeftWidth: 1, padding: 5}}>
                        <Text>{block}</Text>
                      </Col>
                    </Row>
                    <Row style={{borderColor: "#aaa", borderBottomWidth: 1}}>
                      <Col style={{padding: 5}}><Text>Gridfins</Text></Col>
                      <Col style={{borderColor: "#aaa", borderLeftWidth: 1, padding: 5}}>
                        <Text>{gridfins}</Text>
                      </Col>
                    </Row>
                    <Row style={{borderColor: "#aaa"}}>
                      <Col style={{padding: 5}}><Text>Legs</Text></Col>
                      <Col style={{borderColor: "#aaa", borderLeftWidth: 1, padding: 5}}>
                        <Text>{legs}</Text>
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
            <JSONTree
              {...JSON_TREE_PROPS}
              data={second_stage} />
          </View>
        </View>
      </View>
      <View style={{...style.card, padding: 0}}>
        <View style={{padding: 16, backgroundColor: "#42398B", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <Text style={{...style.heading, marginBottom: 0, color: "#fff"}}>
            Media
          </Text>
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
    </ScrollView>
  );
};

const tableStyle = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  row: {  height: 28 },
  text: { paddingLeft: 10 }
});

export default Launch;
