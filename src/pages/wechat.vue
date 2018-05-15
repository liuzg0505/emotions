<template>
  <div class="wechat">
    <div class="top">
      <p class="title">wechat</p>
      <router-link class="link-btn" :to="{path:'/'}">返回&nbsp;></router-link>
    </div>
    
    <div class="chatbox">
      <textarea v-model="textCon" name="" id="" cols="30" rows="10" placeholder="请输入"></textarea>
      <div class="button">
        <i class="icon iconfont icon-smile" @click.stop="showEmojis('change')"></i>
        <keep-alive>
          <Emotions v-if="showEmotions" @upemoji="upEmoji" @changeEmojis="showEmojis"></Emotions>
        </keep-alive>
      </div>
      
    </div>
    
    
  </div>
</template>

<script>
import Emotions from "../components/wechatemotions"
export default {
  data() {
    return {
      showEmotions: false,
      textCon: '',
    }
  },
  components: {
    Emotions
  },
  methods: {
    //表情emoji值传到textarea
    upEmoji(value) {
      // console.log(value);
      this.textCon += value;
    },
    //切换显示表情面板
    showEmojis(value) {
      if(value == 'show') {
        this.showEmotions = true;
      }else if(value == 'hide') {
        this.showEmotions = false;
      }else {
        this.showEmotions = !this.showEmotions;
      }
    },
  }
}
</script>

<style scoped>
.wechat {
  width: 800px;
  height: 600px;
  background-color: rgba(0,0,0,.1);
  margin: 0 auto;
  border: 1px solid #ccc;
  text-align: left;
}
.wechat .top {
  height: 40px;
}
.wechat .link-btn {
  float: right;
  font-size: 16px;
}
.wechat .title {
  float: left;
  height: 30px;
  margin: 0;
  padding: 0;
  line-height: 30px;
  font-size: 16px;
  font-weight: 700;
}
.wechat .chatbox {
  margin: 10px;
}
.wechat .chatbox textarea {
  width: 400px;
  height: 200px;
  padding: 4px;
  font-size: 16px;
  resize: none;
}
.wechat .button {
  position: relative;
}
.wechat .icon-smile {
  color: #000;
  font-size: 24px;
  cursor: pointer;
}
.wechat .wechatEmotions {
  position: absolute;
  top: 32px;
  left: -6px;
}
</style>
