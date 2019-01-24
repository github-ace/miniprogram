// components/custom-tarbar.js
Component({
  externalClasses:[
    'center-class'
  ],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tarbar: {
      index: {
        name: "pages/index/index",
        active: false,
        defalut_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/home_noselect.png',
        active_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/home_select.png'
      },
      center: {
        name:"pages/zhuzhupuman/zhuzhupuman",
        active: false,
        defalut_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/pig.png',
        active_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/pig.png'
      },
      mine: {
        name: "pages/mine/mine",
        active: false,
        defalut_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/mine_noselect.png',
        active_src: 'https://yuyuan.quanquankeji.cn/yuyuandenghui/tarbar/mine_select.png'
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tip:function(){
      wx.showToast({
        title: '活动未开启，敬请期待',
        icon: 'none',
        duration: 2000
      })
    },
    getFormId: function (e) {
      console.log(e)
      getApp().formIdSubmit(e.detail.formId)
    },
  },
  ready: function() {
    for (var x in this.data.tarbar) {
      if (this.data.tarbar[x].name == getCurrentPages()[getCurrentPages().length - 1].route) {
        var param = this.data.tarbar
        param[x].active = true
        this.setData({
          tarbar: param
        })
      }
    }
  }

})