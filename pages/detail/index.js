//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    file: '',
    type: 1
  },
  onLoad: function () {
    this.init();
  },
  init(){
    this.setData({
      file: this.options.file
    })
  },
  saveImg(){
    let file = this.data.file;
    wx.saveImageToPhotosAlbum({
      filePath: file,
      success: res2 => {
        wx.showToast({
          title: '保存成功'
        })
      },
      fail: res => {
      }
    })
  },
  sendFriend(){
    let file = this.data.file;
    if (qq.openQzonePublish) {
      qq.openQzonePublish({
        text: '2020年会发生的五件大事，戳这里 [em]e400384[/em][em]e400384[/em] https://m.q.qq.com/a/s/001d6d9c23b65385dc29571a91d66f5e?via=2016_1 ，和我一起测测吧，mua！',
        media: [
          {
            type: 'photo',
            path: file
          }
        ]
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请升级QQ!'
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '一起测测2020年会发生的事吧',
      imageUrl: '../../static/imgs/share.png'
    }
  }
})
