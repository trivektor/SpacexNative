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
      <View style={{...style.cardItem, marginTop: 0}}>
        <Text style={{...style.text, fontSize: 40, fontWeight: "600"}}>
          {name}
        </Text>
      </View>
      <View style={style.cardItem}>
        <Text style={style.text}>
          <Text style={{fontWeight: "600"}}>Success Rate:</Text>
          {" "}
          {success_rate_pct}%
        </Text>
      </View>
      <View style={style.cardItem}>
        <Text style={style.text}>
          {description}
        </Text>
      </View>
      <View style={{...style.cardItem, marginTop: 16}}>
        <Button   
          full
          style={style.ctaButton} 
          onPress={onPress}>
          <Text style={{...style.text, fontSize: 20, align: 'center'}}>
            Learn more about this rocket
          </Text>
        </Button>
      </View>
    </View>
  );
};

const Rockets = ({rockets, navigation}) => {
  return (
    <SafeAreaView>
      <View style={style.containerContent}>
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