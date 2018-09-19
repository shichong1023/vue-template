//by ShiChong   mail: shichong1023@163.com
import Vue from 'vue'
import config from './index'

Vue.directive('has', {
  bind: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      if (el.parentNode){
        el.parentNode.removeChild(el);
      }else{
        el.style.display="none"
      }
    }
  }
});

Vue.prototype.$_has = function (value) {
  let isExist = false;
  let permissionStr = sessionStorage.getItem(config.limitName);
  if (permissionStr == undefined || permissionStr == null) {
    return false;
  }
  let permission = permissionStr.split('&');
  for (let i = 0; i < permission.length; i++) {
    if (permission[i].indexOf(value) > -1) {
      isExist = true;
      break;
    }
  }
  return isExist;
};