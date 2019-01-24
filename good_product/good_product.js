// pages/good_product/good_product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_list_left: [],
    product_list_left_top: [],
    product_list_left_bottom: [],
    product_list_right: [],
    product_list_right_top: [],
    product_list_right_bottom: [],
    page: 0,
    size: 20,
    canLoad: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    getApp().request("", {}, "application/x-www-form-urlencoded", "post").then((e) => this.handleData(e.data, 'top'))
    getApp().request("", {}, "application/x-www-form-urlencoded", "post").then((e) => this.handleData(e.data, 'bottom'))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.product_list_left.length == 0 || this.data.product_list_right.length == 0) {
      this.loadList()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  loadList: function() {
    if (!this.data.canLoad) return;
    this.data.canLoad = false
    getApp().request("", {
      page: this.data.page,
      size: this.data.size,
    }, "application/x-www-form-urlencoded", "post").then((e) => {
      console.log(e)
      if (e.data.length >= this.data.size) {
        this.data.canLoad = true
      } else {
        this.setData({
          complete: true
        })
      }
      this.handleData(e.data, 'center')
      this.data.page++
    }).catch((e) => {
      if (e.resCode == 10013) {
        this.setData({
          complete: true
        })
      }
    })
  },
  handleData: function(product_list, pos) {
    wx.showLoading()
    product_list.map((item, index) => {
      console.log(item)
      var that = this
      wx.getImageInfo({
        src: item.photo ? item.photo : 'https://yuyuan.quanquankeji.cn/yuyuandenghui/buy_ticket/photo2.png',
        success: function(e) {
          item.height = 340 / e.width * e.height
          var product_list_left_right_height = Promise.all([new Promise(function(resolve) {
            wx.createSelectorQuery().select(".product_list_left").boundingClientRect(function(res) {
              resolve(res.height)
            }).exec()
          }), new Promise(function(resolve) {
            wx.createSelectorQuery().select(".product_list_right").boundingClientRect(function(res) {
              resolve(res.height)
            }).exec()
          })])
          product_list_left_right_height.then((it) => {
            console.log(it);
            if (it[0] < it[1]) {
              switch (pos) {
                case 'top':
                  that.setData({
                    product_list_left_top: that.data.product_list_left_top.concat(item)
                  })
                  break;
                case 'center':
                  that.setData({
                    product_list_left: that.data.product_list_left.concat(item)
                  })
                  break;
                case 'bottom':
                  that.setData({
                    product_list_left_bottom: that.data.product_list_left_bottom.concat(item)
                  })
              }
            } else if (it[0] > it[1]) {
              switch (pos) {
                case 'top':
                  that.setData({
                    product_list_right_top: that.data.product_list_right_top.concat(item)
                  })
                  break;
                case 'center':
                  that.setData({
                    product_list_right: that.data.product_list_right.concat(item)
                  })
                  break;
                case 'bottom':
                  that.setData({
                    product_list_right_bottom: that.data.product_list_right_bottom.concat(item)
                  })
              }
            } else {
              switch (pos) {
                case 'top':
                  if (that.data.product_list_right_top.length + that.data.product_list_right.length + that.data.product_list_right_bottom.length <= that.data.product_list_left_top.length + that.data.product_list_left.length + that.data.product_list_left_bottom.length) {
                    that.setData({
                      product_list_right_top: that.data.product_list_right_top.concat(item)
                    })
                  } else {
                    that.setData({
                      product_list_left_top: that.data.product_list_left_top.concat(item)
                    })
                  }
                  break;
                case 'center':
                  if (that.data.product_list_right_top.length + that.data.product_list_right.length + that.data.product_list_right_bottom.length <= that.data.product_list_left_top.length + that.data.product_list_left.length + that.data.product_list_left_bottom.length) {
                    that.setData({
                      product_list_right: that.data.product_list_right.concat(item)
                    })
                  } else {
                    that.setData({
                      product_list_left: that.data.product_list_left.concat(item)
                    })
                  }
                  break;
                case 'bottom':
                  if (that.data.product_list_right_top.length + that.data.product_list_right.length + that.data.product_list_right_bottom.length <= that.data.product_list_left_top.length + that.data.product_list_left.length + that.data.product_list_left_bottom.length) {
                    that.setData({
                      product_list_right_bottom: that.data.product_list_right_bottom.concat(item)
                    })
                  } else {
                    that.setData({
                      product_list_left_bottom: that.data.product_list_left_bottom.concat(item)
                    })
                  }
              }
            }
          })
        }
      })
    })
    wx.hideLoading()
  }
})