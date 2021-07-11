import React, { Component } from 'react';
import requset from '../../../utils/requset'
import { pxToDp } from '../../../utils/stlyeKits'
import { ACCOUNT_LOGIN,ACCOUNT_VERIFICATION } from '../../../utils/pathMap'
import Verification from '../../../../components/Verification'
import { View,Text,Image,StatusBar,StyleSheet  } from 'react-native';
import { Button,InputItem,List,Toast } from '@ant-design/react-native';
export default class Login extends Component {
  state = {
    phoneNumber:'17779168734',//用户输入的手机号码 测试号码为17779168734
    isShowLogin:true,//用户是否在输入手机号页还是 输入验证码页
    btnText:'',//输入验证码页 按钮文字
    vCodeText:'',//验证码内容
  };
  //点击获取验证码
  login= async()=>{
    let {phoneNumber} = this.state
    if(!phoneNumber){
      Toast.info('请输入手机号',1,undefined,false,false)
      return false
    }
    phoneNumber = phoneNumber.replaceAll(' ','')
    if(phoneNumber.length!==11){
      Toast.info('手机号格式不对',1,undefined,false,false)
    }else{
      const {data} = await requset.post(ACCOUNT_LOGIN,{phone:phoneNumber})
      data.code==='10000' && this.setState({ phoneNumber, isShowLogin:false })
      data.code==='10000' && Toast.info('验证码已下发至您的手机，请注意查收',1,undefined,false,false)
      data.code==='10000' && this.countDown()
    }
  }
  //重新获取验证码
  recapture = () =>{
    this.login()
  }
  //验证码改变事件
  codeOnChangeText =(vCodeText) =>{
    this.setState({vCodeText})
  }
  //验证码键盘完成事件
  onSubmitEditing= async()=>{
    const {phoneNumber,vCodeText} = this.state
    if(vCodeText.length === 6){
      const {data} = await requset.post(ACCOUNT_VERIFICATION,{phone:phoneNumber,vcode:vCodeText})
      //判断验证码是否正确
      if(data.code !== '10000'){
        Toast.info('验证码失败',1,undefined,false,false)
      }else{
      //判断用户是否为新用户
        if(data.data.isNew){
          this.props.navigation.navigate('UserInfo')
        }else{
          Toast.info('老用户',1,undefined,false,false)
        }
      }
    }
  }
  //打开定时器
  countDown=()=>{
    let seconds = 60
    this.setState({btnText:`重新获取 (${seconds}秒) `})
    let timer = setInterval(() =>{
      seconds--
      this.setState({btnText:`重新获取 (${seconds}秒) `})
      if(seconds===0){
        clearInterval(timer)
        this.setState({btnText:`重新获取`})
      }
    },500)
  }
  //登录页面
  renderLogin = () =>{
    const {phoneNumber} = this.state
    return (
      <View>
        <View><Text style={styles.phone}>手机号登录注册</Text></View>
        <List style={{marginTop:pxToDp(20)}}>
          <InputItem clear type='phone'
            value={phoneNumber}
            onChange={value => { this.setState({phoneNumber: value})}}
            placeholder="请输入手机号"
            >手机号</InputItem>
        </List>
          <Button type="primary" onPress={this.login} style={styles.btnStyle}>获取验证码</Button>
    </View>
    )
  }

  //获取验证码
  renderVCode = () =>{
    const {phoneNumber,btnText,vCodeText} = this.state
    return(
      <View>
        <View><Text style={styles.phone}>输入6位验证码</Text></View>
        <View><Text style={styles.codeDesc}>已发送到+86-{phoneNumber?phoneNumber:'17779168734'}</Text></View>
        <View>
          <Verification vCodeText={vCodeText} codeOnChangeText={this.codeOnChangeText} onSubmitEditing={this.onSubmitEditing}></Verification>
        </View>
        <Button type="primary" disabled={btnText!=='重新获取'} onPress={this.login} style={styles.btnStyle}>{btnText}</Button>
      </View>
    )
  }
  render() {
    const {phoneNumber,isShowLogin} = this.state
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent={true}/>
        <Image style={styles.tinyLogo} source={require('../../../assets/bg.jpg')}></Image>
        {isShowLogin?this.renderLogin():this.renderVCode()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: '100%',
    height: pxToDp(200),
  },
  phone:{
    paddingTop:pxToDp(20),
    paddingBottom:pxToDp(10),
    paddingLeft:pxToDp(20),
    fontSize:pxToDp(18),
    color:'#000',
    fontWeight:'bold',
  },
  btnStyle:{
    width:'90%',
    borderRadius:pxToDp(20),
    marginTop:pxToDp(20),
    marginLeft:'5%',
    marginRight:'5%'
  },
  codeDesc:{
    paddingLeft:pxToDp(20),
    fontSize:pxToDp(12),
    color:'#999',
    letterSpacing:pxToDp(1)
  }
});