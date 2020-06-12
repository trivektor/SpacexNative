import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {get} from 'lodash';

import style from '../../style';
import RocketStage from './rocket-stage';

const CardGrid = ({rows}) => {
  return (
    <Grid style={gridStyle.grid}>
      {
        rows.map(([firstCol, secondCol], index) => {
          return (
            <Row key={index} style={gridStyle.row}>
              <Col style={gridStyle.firstCol}>
                <Text style={gridStyle.text}>{firstCol}</Text>
              </Col>
              <Col style={gridStyle.secondCol}>
                <Text style={gridStyle.text}>{secondCol}</Text>
              </Col>
            </Row>
          );
        })
      }
    </Grid>
  );
}

const Rocket = ({rocket, navigation}) => {
  useEffect(() => {
    navigation.setParams({rocketName: rocket.name});
  }, []);

  const {
    name,
    description,
    boosters,
    diameter,
    height,
    success_rate_pct,
    first_flight,
    cost_per_launch,
    landing_legs,
    engines: {
      type: engineType,
      version: engineVersion,
      engine_loss_max,
      layout: engineLayout,
      number: numEngines,
      propellant_1,
      propellant_2,
      thrust_sea_level,
      thrust_to_weight,
      thrust_vacuum,
    },
    mass,
    first_stage,
    second_stage,
    payload_weights,
  } = rocket;
  const compositeFairing = get(second_stage, 'payloads.composite_fairing');

  return (
    <Container>
      <Content style={style.containerContent}>
        <View style={style.card}>
          <View>
            <Text style={{...style.text, fontSize: 42, fontWeight: '600'}}>{name}</Text>
          </View>
          <View style={style.cardItem}>
            <Text style={style.text}>{description}</Text>
          </View>
          {
            [
              ['Success Rate', `${success_rate_pct}%`],
              ['First Flight', first_flight],
              ['Cost per Launch', `$${cost_per_launch.toLocaleString()} US`],
              ['Landing Legs', landing_legs.number],
            ].map(([firstCol, secondCol], index) => {
              return (
                <View style={{...style.cardItem, marginTop: 4}}>
                  <Text style={style.text}>
                    <Text style={{fontWeight: 'bold'}}>{firstCol}:</Text>
                    {' '}
                    {secondCol}
                  </Text>
                </View>
              );
            })
          }
        </View>
        <View style={style.card}>
          <View style={{marginBottom: 10}}>
            <Text style={{...style.text, fontSize: 30, fontWeight: 'bold'}}>Tech Specs</Text>
          </View>
          <View>
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: 'bold'}}>Engine</Text>
            </View>
            <View style={style.cardItem}>
              <CardGrid
                rows={[
                  ['Diameter', `${diameter.meters} m (${diameter.feet} ft)`],
                  ['Height', `${height.meters} m (${height.feet} ft)`],
                  ['Mass', `${mass.kg} kg (${mass.lb}) lbs`],
                  ['Boosters', boosters || 'n/a'],
                  ['Num of Engines', numEngines],
                  ['Engine Type', engineType],
                  ['Engine Version', engineVersion],
                  ['Engine Loss Max', engine_loss_max],
                  ['Engine Layout', engineLayout],
                  ['Propellant 1', propellant_1],
                  ['Propellant 2', propellant_2],
                  ['Thrust Sea Level', `${thrust_sea_level.kN} kN (${thrust_sea_level.lbf} lbf)`],
                  ['Thrust To Weight', thrust_to_weight],
                  ['Thrust Vacuum', `${thrust_vacuum.kN} kN (${thrust_vacuum.lbf} lbf)`],
                ]} />
            </View>
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: 'bold'}}>1st State</Text>
            </View>
            <View style={style.cardItem}>
              <CardGrid
                rows={[
                  ['Burn Time', `${first_stage.burn_time_sec} s`],
                  ['Num of Engines', first_stage.engines],
                  ['Fuel Amount', `${first_stage.fuel_amount_tons} tons`],
                  ['Reusable', first_stage.reusable],
                  ['Thrust Sea Level', `${first_stage.thrust_sea_level.kN} kN (${first_stage.thrust_sea_level.lbf} lbf)`],
                  ['Thrust Vacuum', `${first_stage.thrust_vacuum.kN} kN (${first_stage.thrust_vacuum.lbf} lbf)`],
                ].filter(Boolean)} />
            </View>
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: 'bold'}}>2nd State</Text>
            </View>
            <View style={style.cardItem}>
              <CardGrid
                rows={[
                  ['Burn Time', `${second_stage.burn_time_sec} s`],
                  ['Num of Engines', second_stage.engines],
                  ['Fuel Amount', `${second_stage.fuel_amount_tons} tons`],
                  ['Reusable', second_stage.reusable],
                  compositeFairing && ['Composite Fairing Diameter', `${compositeFairing.diameter.meters} m (${compositeFairing.diameter.feet} ft)`],
                  compositeFairing && ['Composite Fairing Height', `${compositeFairing.height.meters} m (${compositeFairing.height.feet} ft)`],
                  second_stage.thrust && ['Thrust', `${second_stage.thrust.kN} kN (${second_stage.thrust.lbf} lbf)`],
                ].filter(Boolean)} />
            </View>
            <View style={style.cardItem}>
              <Text style={{...style.text, fontWeight: 'bold'}}>Payload Weights</Text>
            </View>
            {
              payload_weights.map(({id, kg, lb, name}, index) => {
                return (
                  <View style={style.cardItem} key={index}>
                    <CardGrid
                      rows={[
                        ['Name', name],
                        ['ID', id],
                        ['Weight', `${kg} kg (${lb} lbs)`],
                      ]} />
                  </View>
                );
              })
            }
          </View>
        </View>
      </Content>
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
    width: 170,
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

export default Rocket;
