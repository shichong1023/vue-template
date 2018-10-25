//退出
export const mixinLogout = {
  methods: {
    //退出登陆
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        //清除用户信息
        this.userLogout();
      }).catch(() => {
        //取消
      });
    },
    //退出登录
    userLogout() {
      var url = this.$pathUrl.logout;
      var params = {
        appid: this.$config.appId
      }
      this.$api.get(url, params, res => {
        if (1 == res.state) {
          let proName = this.$config.proName
          this.clearSession(proName + "_username")
          this.clearSession(proName + "_userid")
          this.clearSession(proName + "_role")
          this.clearSession(proName + "_regionId")
          this.clearSession(proName + "_permission")
          this.$router.replace('/')
        } else {
          this.$message.error('退出失败！');
        }
      });
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
};