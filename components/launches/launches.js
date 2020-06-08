import React, {useCallback} from 'react';
import {VirtualizedList, View, TouchableOpacity, ShadowPropSlider} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {List, Text, Thumbnail, Icon} from 'native-base';
import {format} from 'date-fns';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {DATE_FORMAT, SPACEX_LOGO_URL} from '../../constants';
import style from '../../style';

const LaunchListItem = ({
  launch,
  navigation,
}) => {
  const {
    id,
    mission_name,
    launch_date_unix,
    launch_site: {
      site_name_long,
    },
    links: {
      flickr_images,
      mission_patch_small,
    },
    rocket: {
      rocket_name,
      rocket_type,
    },
  } = launch;
  const upcoming = launch_date_unix * 1000 > Date.now();
  const leftAvatarUri = flickr_images[0] || 'https://www.spacex.com/static/images/share.jpg';
  const leftAvatar = (
    <Avatar
      rounded
      source={{uri: leftAvatarUri}}
    />
  );
  const onPress = useCallback(() => {
    navigation.navigate('Launch', {id});
  }, [navigation, id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.card}>
        <Grid>
          <Col style={{width: 100}}>
            <View style={{marginTop: 5}}>
              {mission_patch_small ? (
                <Thumbnail
                  large
                  source={{uri: mission_patch_small}} />
              ) : (
                <Thumbnail
                  large
                  source={{uri: SPACEX_LOGO_URL}} />
              )}
            </View>
          </Col>
          <Col>
            <View>
              <Text style={{fontWeight: "600", fontSize: 25}}>
                {mission_name}
                {" "}
                {upcoming && <Text style={{color: "green"}}>(upcoming)</Text>}
              </Text>
            </View>
            <View style={{marginTop: 10, fontSize: 20}}>
              <Text>🗓 {format(launch_date_unix * 1000, DATE_FORMAT)}</Text>
            </View>
            <View style={{marginTop: 10, fontSize: 20}}>
              <Text>📍 {site_name_long}</Text>
            </View>
            <View style={{marginTop: 10, fontSize: 20}}>
              <Text>🚀 {rocket_name} ({rocket_type})</Text>
            </View>
          </Col>
        </Grid>
      </View>
    </TouchableOpacity>
  );
}

const Launches = ({launches, navigation}) => {
  return (
    <View style={{padding: 8, backgroundColor: "#f5f5f5"}}>
      <VirtualizedList
        data={launches}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <LaunchListItem
            launch={item}
            navigation={navigation} />
        )} />
    </View>
  );
};

export default Launches;
