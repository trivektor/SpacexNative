import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

import style from '../../style';

const RocketStage = ({stage}) => {
  const {
    burn_time_sec,
    engines,
    fuel_amount_tons,
    reusable,
    thrust_sea_level,
    thrust_vacuum,
  } = stage;

  return (
    <Grid style={gridStyle.grid}>
      {
        [
          ['Burn Time', `${burn_time_sec} s`],
          ['Num of Engines', engines],
          ['Fuel Amount', `${fuel_amount_tons} tons`],
          ['Reusable', reusable],
          thrust_sea_level && ['Thrust Sea Level', `${thrust_sea_level.kN} kN (${thrust_sea_level.lbf} lbf)`],
          thrust_vacuum && ['Thrust Vacuum', `${thrust_vacuum.kN} kN (${thrust_vacuum.lbf} lbf)`],
        ].filter(Boolean).map(([firstCol, secondCol], index) => {
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

export default RocketStage;
