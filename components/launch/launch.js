import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import {Container, Content, Text, Card, CardItem, Body, H2, Thumbnail, Button, Icon} from 'native-base';
import JSONTree from 'react-native-json-tree';
import {TouchableOpacity, TouchableHighlight, Dimensions, View} from 'react-native';
import {format} from 'date-fns';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';
import parse from 'url-parse';

import {DATE_FORMAT} from '../../constants';

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
      <Content>
        <Card transparent>
          <CardItem header>
            <H2>Mission</H2>
          </CardItem>
          <CardItem>
            <Text>Name: {mission_name}</Text>
          </CardItem>
          <CardItem>
            <Text>Date: {format(launch_date_unix * 1000, DATE_FORMAT)}</Text>
            {upcoming && <Text style={{color: 'green'}}>(upcoming)</Text>}
          </CardItem>
          <CardItem>
            <Text>Location: {site_name_long}</Text>
          </CardItem>
          <CardItem>
            <Text>{details || 'No details found'}</Text>
          </CardItem>
          <CardItem header>
            <H2>Rocket</H2>
          </CardItem>
          <CardItem>
            <Text>First Stage</Text>
          </CardItem>
          <CardItem>
            <Content>
              <JSONTree
                {...JSON_TREE_PROPS}
                data={first_stage} />
            </Content>
          </CardItem>
          <CardItem>
            <Text>Second Stage</Text>
          </CardItem>
          <CardItem>
            <Content>
              <JSONTree
                {...JSON_TREE_PROPS}
                data={second_stage} />
            </Content>
          </CardItem>
          <CardItem header>
            <H2>Media</H2>
          </CardItem>
          <CardItem>
            {
              flickr_images.map((uri) => (
                <TouchableOpacity key={uri} onPress={toggleImageModal}>
                  <Thumbnail source={{uri}} style={{marginRight: 10, marginBottom: 10}} />
                </TouchableOpacity>
              ))
            }
          </CardItem>
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
          {
            videoLinkUrl && (
              <View style={{flex: 1}}>
                <WebView
                  height={300}
                  style={{margin: 15}}
                  source={{uri: `https://www.youtube.com/embed/${videoLinkUrl.query.v || videoLinkUrl.pathname.replace('/', '')}`}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true} />
              </View>
            )
          }
        </Card>
      </Content>
    </Container>
  );
};

export default Launch;
