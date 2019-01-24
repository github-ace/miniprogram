// components/custom-title/custom-title.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text_color:{
      //文字颜色
      type: String,
      value:'#000'//黑色
    },
    back_img:{
      //返回图片的颜色
      type:String,
      value:'hei'//默认黑色
    },
    title_bg:{
      type:"String",
      value:''
    },
    title_bgc:{
      //标题栏背景色
      type:String,
      value:'transparent'//默认透明色
    },
    back_force_show:{
      type: Boolean,
      value:true
    },
    back_force_hide:{
      type: Boolean,
      value: false
    },
    back_url:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:'',
    backShow:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready:function(){
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({statusBarHeight:String(res.statusBarHeight) + 'px'})
      }
    })
    if(getCurrentPages().length==1){
      this.setData({backShow:false})
    }
  }
})
