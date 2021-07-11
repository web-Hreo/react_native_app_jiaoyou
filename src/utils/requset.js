import axios from 'axios'
import {BASE_URL} from './pathMap'
import { Toast } from '@ant-design/react-native';

let key = ''
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials:true
});

instance.interceptors.request.use(function(config){
  key = Toast.loading('请求中...');
  return config
},function(error){
  return Promise.reject(error)
})
instance.interceptors.response.use(function(response){
  Toast.remove(key);
  return response;
},function(error){
  return Promise.reject(error)
})

export default {
  get:instance.get,
  post:instance.post
}