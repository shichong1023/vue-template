//by ShiChong   mail: shichong1023@163.com
import Vue from 'vue'
import config from './index'

Vue.directive('has', {
  bind: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        el.style.display = "none"
      }
    }
  }
});

Vue.prototype.$_has = function (value) {
  let isExist = false;
  let permissionStr = sessionStorage.getItem(config.proName + "_permission")

  if (permissionStr == undefined || permissionStr == null) {
    return isExist;
  }

  if (permissionStr.indexOf(value) > -1) {
    isExist = true;
  }
  return isExist;
};
