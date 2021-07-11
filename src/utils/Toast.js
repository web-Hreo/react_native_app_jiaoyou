import { Toast } from '@ant-design/react-native';
/**
 * Props 参数如下：
 * @param {提示内容} content 
 * @param {自动关闭的延时，单位秒} duration 
 * @param {提示内容} onClose 
 * @param {是否显示透明蒙层，防止触摸穿透} mask 
 * @param {是否允许叠加显示} stackable 
 * 
 */
const param = [1,undefined,false,false]
export function toastSuccess(text){
  Toast.info(
    text,
    ...param
  );
}