import React, {useCallback} from 'react';
import {VirtualizedList, View, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import {Button} from 'native-base';

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
    <View style={style.card}>
      <View style={{marginBottom: 8}}>
        <Text style={{...style.text, fontSize: 40, fontWeight: "600"}}>
          {name}
        </Text>
      </View>
      <View style={{marginBottom: 8}}>
        <Text style={style.text}>
          Success Rate: {success_rate_pct}%
        </Text>
      </View>
      <View style={{marginBottom: 16}}>
        <Text style={style.text}>
          {description}
        </Text>
      </View>
      <Button 
          full
          style={{padding: 20, backgroundColor: '#505A5B', borderRadius: 8}} 
          onPress={onPress}>
          <Text style={{...style.text, fontSize: 20, align: 'center'}}>
            Learn more about this rocket
          </Text>
        </Button>
    </View>
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