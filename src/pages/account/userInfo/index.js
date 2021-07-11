import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PickerView } from '@ant-design/react-native';
import { pxToDp } from '../../../utils/stlyeKits'

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

export default class UserInfo extends Component {
  state = {
    value: undefined,
  };
  onChange = value => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <View style={stlyes.container}>
        <View style={stlyes.titleBox}>
          <Text style={stlyes.title}>填写资料</Text>
          <Text style={stlyes.title}>提升我的魅力</Text>
        </View>
        <View>
        <PickerView
          onChange={this.onChange}
          value={this.state.value}
          data={seasons}
          cascade={false}
        />
        </View>
      </View>
      
    )
  }
}
const stlyes = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    padding:pxToDp(20)
  },
  titleBox:{
    paddingTop:pxToDp(10),
    paddingBottom:pxToDp(10)
  },
  title:{
    letterSpacing:pxToDp(2),
    fontSize:pxToDp(20),
    color:'#999'
  }
})