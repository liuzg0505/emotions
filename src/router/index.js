import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import weibo from '@/pages/weibo'
import wechat from '@/pages/wechat'
import wechatAt from '@/pages/wechatAt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/weibo',
      name: 'weibo',
      component: weibo
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: wechat
    },
    {
      path: '/wechatAt',
      name: 'wechatAt',
      component: wechatAt
    }
  ]
})
