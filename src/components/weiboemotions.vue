<template>
  <div class="weiboEmotions">
    <div class="clsBtn"><i class="icon iconfont icon-close" @click="showEmojis('hide')"></i></div>
    <div class="category" @click.stop="showEmojis('show')">
      <span :class="{ctg: true, active: activeItem == '1'}" @click="changeCtg('1')">默认</span>
      <span :class="{ctg: true, active: activeItem == '2'}" @click="changeCtg('2')">热门</span>
      <span :class="{ctg: true, active: activeItem == '3'}" @click="changeCtg('3')">哆啦A梦</span>
      <span :class="{ctg: true, active: activeItem == '4'}" @click="changeCtg('4')">小黄人</span>
      <span :class="{ctg: true, active: activeItem == '5'}" @click="changeCtg('5')">捉妖记胡巴</span>
      <span :class="{ctg: true, active: activeItem == '6'}" @click="changeCtg('6')">正义联盟</span>
    </div>
    <div class="emojis" @click.stop="showEmojis('show')">
      <img v-for="(item,index) in showEmotions" @click.stop="upEmoji(item.value)" :key="index" :src="item.icon" :alt="item.phrase" :title="item.phrase">
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
      duolaAmeng: [],
      yellowMen: [],
      huba: [],
      zhengyi: [],
      showEmotions: []
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
        case '3': this.showEmotions = this.duolaAmeng;
          break;
        case '4': this.showEmotions = this.yellowMen;
          break;
        case '5': this.showEmotions = this.huba;
          break;
        case '6': this.showEmotions = this.zhengyi;
          break;
        default: this.showEmotions = this.defaultE;
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
        .get('../../static/json/weibo_emotions.json')
        .then(
          success => {
            // console.log(success.data);
            this.emotions = success.data;
            for(var i = 0; i < this.emotions.length; i++) {
              if(this.emotions[i].category == '正义联盟') {
                this.zhengyi.push(this.emotions[i]);
              }else if(this.emotions[i].category == '热门') {
                this.hot.push(this.emotions[i]);
              }else if(this.emotions[i].category == '哆啦A梦') {
                this.duolaAmeng.push(this.emotions[i]);
              }else if(this.emotions[i].category == '小黄人') {
                this.yellowMen.push(this.emotions[i]);
              }else if(this.emotions[i].category == '捉妖记胡巴') {
                this.huba.push(this.emotions[i]);
              }else {
                this.defaultE.push(this.emotions[i]);
              }
            }
            this.showEmotions = this.defaultE;
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
.weiboEmotions {
  width: 500px;
  height: 304px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  position: relative;
  z-index: 9999;
}
.weiboEmotions:before,
.weiboEmotions:after {
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
.weiboEmotions:after {
  border-bottom: 7px solid #fff;
  top: -13px;
}
.weiboEmotions .clsBtn {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 20px;
  padding: 2px 3px;
  text-align: right;
  color: #0099ff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  
}
.weiboEmotions .clsBtn .icon-close {
  cursor: pointer;
}
.weiboEmotions .category {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  padding-left: 10px;
  
}
.weiboEmotions .category span {
  float: left;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border: 1px solid #e7e6e6;
  border-right: 0;
  background-color: #f5f5f5;
  cursor: pointer;
}
.weiboEmotions .category span:last-child {
  border-right: 1px solid #e7e6e6;
}
.weiboEmotions .category span.active {
  border-bottom: 2px solid #0099ff;
  background-color: #fff;
}
.weiboEmotions .emojis {
  width: 500px;
  height: 270px;
  padding: 6px 10px;
  overflow: auto;
  /* overflow-y: auto; */
}
.weiboEmotions .emojis img {
  width: 22px;
  height: 22px;
  margin: 2px 4px;
  cursor: pointer;
}
.weiboEmotions .emojis img:hover {
  border: 1px solid #eb7350;
}
</style>
