import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { List, Picker, Provider,InputItem,DatePicker } from '@ant-design/react-native';
import district from '../../../utils/district'

export default class index extends Component {
  state ={
    value:'',
    data:[
      {
        value:'1',
        label:'男',
      },
      {
        value:'0',
        label:'女',
      }
    ],
    sex:'1',//性别
    name:'',//姓名
    date:'',//生日
  }
  onChange=()=>{
    console.log('1');
  }
  render() {
    return (
      <View>
        <List>
          <InputItem
            clear
            value={this.state.name}
            onChange={value => {
              this.setState({ name: value,  });
            }}
          >
            昵称
          </InputItem>
          <Picker
            data={this.state.data}
            cols={1}
            value={this.state.sex}
            onChange={value =>{
              this.setState({ sex:value })
            }}
          >
            <List.Item arrow="horizontal" onPress={this.onPress}>设置性别</List.Item>
          </Picker>
          <DatePicker
            value={this.state.date}
            mode="date"
            defaultDate={new Date()}
            minDate={new Date(1901, 0, 0)}
            maxDate={new Date(2021, 12, 31)}
            onChange={value =>{
              this.setState({ date:value })
            }}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">设置生日</List.Item>
          </DatePicker>
          <Picker
              data={district}
              cols={3}
              value={this.state.value}
              onChange={this.onChange}
            >
              <List.Item arrow="horizontal" onPress={this.onPress}>
                省市选择
              </List.Item>
            </Picker>
        </List>
      </View>
    )
  }
}
