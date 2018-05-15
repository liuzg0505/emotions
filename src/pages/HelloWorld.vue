<template>
  <div class="hello">
    <router-link class="link-btn" :to="{name:'weibo'}">微博表情面板&nbsp;></router-link>
    <br>
    <router-link class="link-btn" :to="{name:'wechat'}">微信表情面板&nbsp;></router-link>
    <br>
    <router-link class="link-btn" :to="{name:'wechatAt'}">微信@某人&nbsp;></router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-btn {
  display: block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
