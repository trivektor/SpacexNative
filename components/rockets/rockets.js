import React, {useCallback} from 'react';
import {VirtualizedList, View, TouchableOpacity} from 'react-native';
import {Container, Content, Text} from 'native-base';

import style from '../../style';

const RocketListItem = ({
  rocket,
  navigation,
}) => {
  const {
    id,
    name,
    description,
    success_rate_pct,
  } = rocket;
  const onPress = useCallback(() => {
    navigation.navigate('Rocket', {id});
  }, [navigation, id]);
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.card}>
        <View style={{marginBottom: 8}}>
          <Text style={{fontSize: 24, fontWeight: "600"}}>{name}</Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={{fontSize: 20}}>Success Rate: {success_rate_pct}</Text>
        </View>
        <View>
          <Text style={{fontSize: 20}}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Rockets = ({rockets, navigation}) => {
  return (
    <Container style={{backgroundColor: '#f5f5f5', padding: 8}}>
      <Content>
        <VirtualizedList
        data={rockets}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
        <RocketListItem
          rocket={item}
          navigation={navigation} />
        )} />
      </Content>
    </Container>
  );
};

export {Rockets as default};