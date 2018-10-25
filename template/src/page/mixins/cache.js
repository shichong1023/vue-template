//缓存操作
export const mixinCache = {
  methods: {
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      let exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = `${this.$config.proName}_userName=${c_name};path=/;expires=${exdate.toGMTString()}`;
      window.document.cookie = `${this.$config.proName}_userPwd=${c_pwd};path=/;expires=${exdate.toGMTString()}`;
    },
    //读取cookie
    getCookie(key) {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; ++i) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == key) {
            return arr2[1]
          }
        }
        return false
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    //设置session
    setSession(key, val) {
      key =  key ? key : this.$config.proName + "_permission"
      if (null === val) {
        return false
      }

      let isObj = (typeof val == "object")
      let isArr = Array.isArray(val)

      if (isArr) {
        sessionStorage[key] = JSON.stringify(val)
      } else if (isObj) {
        sessionStorage[key] = JSON.stringify(val)
      } else {
        sessionStorage[key] = val
      }
      return true
    },
    //获得session
    getSession(key) {
      key = key ? key : this.$config.proName + "_permission"
      let str = sessionStorage.getItem(key)

      if (str) {
        let res = str
        try {
          res = JSON.parse(str)
        } catch (e) {
          res = str
        }

        return res
      }
      return false
    },
    //清除session
    clearSession(key = true){
      if(true === key){
        //清除全部
        sessionStorage.clear()
      }else{
        sessionStorage.removeItem(key)
      }
    },
    //设置localStorage
    setStorage(key, val) {
      if (null === val){
        return false
      }

      let isObj = (typeof val == "object")
      let isArr = Array.isArray(val)

      if (isArr) {
        localStorage.setItem(key, JSON.stringify(val))
      } else if (isObj){
        localStorage.setItem(key, JSON.stringify(val))
      }else{
        localStorage.setItem(key, val);
      }
      return true
    },
    //获得localStorage
    getStorage(key){
      let str = localStorage.getItem(key)

      if (str) {
        let res = str
        try {
          res = JSON.parse(str)
        } catch (e) {
          res = str
        }

        return res
      }
      return false
    },
    //清除localStorage
    clearStorage(key = true) {
      if (true === key) {
        //清除全部
        localStorage.clear()
      } else {
        localStorage.removeItem(key)
      }
    },
    allTrim(str, is_global = 'g') {
      let result = ""
      result = str.replace(/(^\s+)|(\s+$)/g, "");
      if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
      }
      return result;
    },
  }
}