<!-- by ShiChong  mail: shichong1023@163.com-->
<template>
  <div id='index'>
    <div class="title">这是主页</div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>

<style lang='scss' scoped>
  #index{
    width: 100%;
    height: 100%;
    position: relative;

    .title{
      font-size: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
