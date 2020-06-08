import React, {useCallback} from 'react';
import {SafeAreaView, VirtualizedList, View, TouchableOpacity, Text} from 'react-native';
import {Thumbnail, Button} from 'native-base';
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
    launch_success,
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
  const onPress = useCallback(() => {
    navigation.navigate('Launch', {id});
  }, [navigation, id]);

  return (
    <View style={style.card}>
      <Grid>
        <Col style={{paddingRight: 10}}>
          <Text style={{...style.text, fontWeight: '600', fontSize: 38}}>{mission_name}</Text>
          <View>
            {upcoming && <Text style={{...style.text, color: '#E8442E'}}>Upcoming</Text>}
          </View>
        </Col>
        <Col style={{width: 80}}>
          <Thumbnail
            large
            source={{uri: mission_patch_small || SPACEX_LOGO_URL}} />
        </Col>
      </Grid>
      <View style={{marginTop: 10}}>
        <Text style={style.text}>
          <Text style={{fontWeight: '700'}}>Date:</Text>
          {' '}
          {format(launch_date_unix * 1000, DATE_FORMAT)}
        </Text>
      </View>
      <View style={{marginTop: 8}}>
        <Text style={style.text}>
          <Text style={{fontWeight: '700'}}>Location:</Text>
          {' '}
          {site_name_long}
        </Text>
      </View>
      <View style={{marginTop: 8}}>
        <Text style={style.text}>
          <Text style={{fontWeight: '700'}}>Rocket:</Text>
          {' '}
          {rocket_name} ({rocket_type})
        </Text>
      </View>
      {
        !upcoming && (
          <View style={{marginTop: 8}}>
            <Text style={style.text}>
              <Text style={{fontWeight: '700'}}>Result:</Text>
              {' '}
              {launch_success 
                ? <Text style={{color: "#7BE0AD"}}>Successful</Text> 
                : <Text style={{color: "#D90368"}}>Failed</Text>
              }
            </Text>
          </View>          
        )
      }      
      <View style={{marginTop: 24}}>
        <Button 
          full
          style={{padding: 20, backgroundColor: '#505A5B', borderRadius: 8}} 
          onPress={onPress}>
          <Text style={{...style.text, fontSize: 20, align: 'center'}}>
            Learn more about this launch
          </Text>
        </Button>
      </View>
    </View>
  );
}

const Launches = ({launches, navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#f5f5f5'}}>
      <View style={{padding: 8}}>
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
    </SafeAreaView>
  );
};

export default Launches;
