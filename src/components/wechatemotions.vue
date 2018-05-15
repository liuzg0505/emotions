<template>
  <div class="wechatEmotions">
    <div class="clsBtn"><i class="icon iconfont icon-close" @click="showEmojis('hide')"></i></div>
    <div class="category" @click.stop="showEmojis('show')">
      <span :class="{ctg: true, active: activeItem == '1'}" @click="changeCtg('1')">默认</span>
      <span :class="{ctg: true, active: activeItem == '2'}" @click="changeCtg('2')">热门</span>
      <span :class="{ctg: true, active: activeItem == '3'}" @click="changeCtg('3')">食物</span>
      <span :class="{ctg: true, active: activeItem == '4'}" @click="changeCtg('4')">QQ表情</span>
    </div>
    <div class="emojis" @click.stop="showEmojis('show')">
      <span v-if="item.category !== 'qqface'" v-for="(item,index) in showEmotions" @click.stop="upEmoji(item.value)" :key="index">{{item.value}}</span>
      <span v-if="item.category === 'qqface'" v-for="(item,index) in showEmotions" @click.stop="upEmoji(item.value)" :key="index">
        <img :src="item.icon">
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      activeItem: '1',
      emotions: [],
      defaultE: [],
      hot: [],
      foods: [],
      showEmotions: [],
      qqface: []
    }
  },
  created() {
    this.getEmotions();
  },
  methods: {
    changeCtg(item) {
      this.activeItem = item;
      switch(item) {
        case '1': this.showEmotions = this.defaultE;
          break;
        case '2': this.showEmotions = this.hot;
          break;
        case '3': this.showEmotions = this.foods;
          break;
        default: this.showEmotions = this.qqface;
      }
    },
    showEmojis(status) {
      this.$emit('changeEmojis', status);
    },
    upEmoji(value) {
      this.$emit('upemoji',value);
      this.showEmojis('hide');
    },
    getEmotions() {
      this.$http
        .get('../../static/json/wechat_emotions.json')
        .then(
          success => {
            // console.log(success.data);
            this.emotions = success.data;
            for(var i = 0; i < this.emotions.length; i++) {
              if(this.emotions[i].category == 'hot') {
                this.hot.push(this.emotions[i]);
              }else if(this.emotions[i].category == 'food'){
                this.foods.push(this.emotions[i]);
              }else {
                this.defaultE.push(this.emotions[i]);
              }
            }
            this.showEmotions = this.defaultE;
          }
        )
      
      this.$http
        .get('../../static/json/translateqqface.json')
        .then(
          success => {
            // console.log(success.data);
            this.qqface = success.data;
          }
        )
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.wechatEmotions {
  width: 500px;
  /*height: 304px;*/
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  position: relative;
  z-index: 9999;
}
.wechatEmotions:before,
.wechatEmotions:after {
  content: '';
  width: 0;
  height: 0;
  box-sizing: content-box;
  display: block;
  border: 7px solid transparent;
  border-bottom: 7px solid #999;
  position: absolute;
  top: -14px;
  left: 10px;
}
.wechatEmotions:after {
  border-bottom: 7px solid #fff;
  top: -13px;
}
.wechatEmotions .clsBtn {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 20px;
  padding: 2px 3px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  text-align: right;
  color: #0099ff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}
.wechatEmotions .clsBtn .icon-close {
  cursor: pointer;
}
.wechatEmotions .category {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.wechatEmotions .category span {
  float: left;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border: 1px solid #e7e6e6;
  border-right: 0;
  background-color: #f5f5f5;
  cursor: pointer;
}
.wechatEmotions .category span:last-child {
  border-right: 1px solid #e7e6e6;
}
.wechatEmotions .category span.active {
  border-bottom: 2px solid #0099ff;
  background-color: #fff;
}
.wechatEmotions .emojis {
  width: 500px;
  height: 222px;
  padding: 6px 10px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  overflow: auto;
}
.wechatEmotions .emojis span {
  display: inline-block;
  margin: 1px 1px;
  width: 28px;
  height: 28px;
  line-height: 26px;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.wechatEmotions .emojis span:hover {
  border: 1px solid #ed3f14;
}
</style>
