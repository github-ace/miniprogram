// components/custom-iphonex.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready:function(){
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model.indexOf('iPhone X') > -1) {
          that.setData({isIphoneX : true})
        }
        that.setData({statusBarHeight: String(res.statusBarHeight) + 'px'})
      }
    })
  }
})
