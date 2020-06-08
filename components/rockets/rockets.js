import React, {useCallback} from 'react';
import {VirtualizedList, View, TouchableOpacity, SafeAreaView, Text} from 'react-native';

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
          <Text style={{...style.text, fontSize: 25, fontWeight: "600"}}>
            {name}
          </Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={style.text}>
            Success Rate: {success_rate_pct}%
          </Text>
        </View>
        <View>
          <Text style={style.text}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Rockets = ({rockets, navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#f5f5f5'}}>
      <View style={{padding: 8}}>
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
      </View>
    </SafeAreaView>
  );
};

export {Rockets as default};