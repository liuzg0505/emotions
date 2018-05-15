<template>
  <div class="wechatAt">
    <router-link class="link-btn" :to="{path:'/'}">返回&nbsp;></router-link>
    <br>
    <!-- wechatAt -->
    <!-- https://www.cnblogs.com/xupeiyu/p/5985598.html -->
    <!-- http://www.jb51.net/article/64301.htm -->
    <!-- https://ask.csdn.net/questions/679792?sort=id -->
    <textarea class="textarea" v-model="textcontent" name="" id="textCon" cols="30" rows="10" @input="onInput" placeholder="请输入@"></textarea>
    <select class="selectAt" name="" id="selectCon" v-show="showAtselect" :style="{left: selectLeft, top: selectTop}" @change="select">
      <option value="" selected></option>
      <option value="person01">person01</option>
      <option value="person02">person02</option>
      <option value="person03">person03</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cursorPos: null,
      textcontent: '',
      showAtselect: false,
      selectLeft: 0,
      selectTop: 0,
      textDom: null,
      selectDom: null
    }
  },
  mounted() {
    this.$nextTick(function(){
      this.textDom = document.getElementById("textCon");
      this.selectDom = document.getElementById("selectCon");
    })
  },
  methods: {
    // 获取光标位置
    getCursortPosition(textDom) {
      var cursorPos = 0;
      if (document.selection) {
        // IE Support
        // console.log('ie')
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart ('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
      }else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox/chrome support
        // console.log('firefox')
        cursorPos = textDom.selectionStart;
      }
      return cursorPos;
    },
    onInput(event) {
      var event = event || window.event;
      console.log(this.textcontent.slice(-1))
      var lastletter = this.textcontent.slice(-1);
      this.$nextTick(function(){
        this.cursorPos = this.getCursortPosition(this.textDom);
        //如果光标在文本最后面,且最后一个是@
        if(this.cursorPos == (this.textDom.value+'').length && lastletter === '@') {
          
          var fz = parseFloat(window.getComputedStyle(this.textDom).fontSize);
          var wd = parseFloat(window.getComputedStyle(this.textDom).width);
          var ht = parseFloat(window.getComputedStyle(this.textDom).height);
          var enterArr = (this.textDom.value || '').match(/[\n\r]/g) || [];
          var enterLen = enterArr.length * wd;
          //把双字节的替换成两个单字节的然后再获得长度,utf-8下汉字是3字节
          var len = (this.textDom.value || '').replace(/[^\x00-\xff]/g,"01").replace(/[\u4e00-\u9fa5]/g,"001").length/2;

          if(enterArr.length > 0) {
            var newValue = this.textcontent.slice(this.textcontent.lastIndexOf('\n'));
            len = newValue.replace(/[^\x00-\xff]/g,"01").replace(/[\u4e00-\u9fa5]/g,"001").length/2 - 0.5;
          }
          var totalLen = fz * len + enterLen;
          var row = parseInt(totalLen / wd);
          console.log('fz: ', fz, 'wd: ',wd, 'enterLen: ', enterLen, 'len: ', len, 'totalLen: ', totalLen, 'row:',row);
          // console.log((this.textDom.value || '').match(/[\n\r]/g))
          console.log('hh',this.textcontent.slice(this.textcontent.indexOf('\n')))
          this.selectLeft = (totalLen > wd ? (totalLen-wd*row) : totalLen)+ fz/2 + 'px';
          this.selectTop = (row*fz>ht?(ht-fz):row*fz) + fz/2 + 'px';
          this.showAtselect = true;
          // console.log('row',row);
        }else {
          this.showAtselect = false;
        }
        
        console.log('left: ',this.selectLeft, 'top: ', this.selectTop)
      })
    },
    select() {
      this.showAtselect = false;
      this.textcontent += this.selectDom.value + ' ';
      this.selectDom.value = '';
      this.textDom.focus();
      console.log(this.selectDom.value)
    }
  },
  watch: {
    textcontent: {
      handler: function(nV, oV) {
        this.$nextTick(function(){
          var textDom = document.getElementById("textCon");
          this.cursorPos = this.getCursortPosition(textDom);
          // console.log(111, this.cursorPos, nV, oV);
        })
        //console.log(222, this.cursorPos, oV, nV);//比111先执行
      }
    }
  }
}
</script>

<style scoped>
.wechatAt {
  position: relative;
  width: 300px;
  height: 100px;
  margin: 0 auto;
}
.textarea {
  width: 100%;
  height: 100%;
  resize: none;
  word-break: break-all;
  font-size: 24px;
}
.selectAt {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
