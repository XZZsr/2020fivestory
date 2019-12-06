//index.js
//获取应用实例
const app = getApp();
let videoAd;
Page({
  data: {
    result: [
      "沉迷学习，日渐消瘦",
      "吃鸡王者两开花",
      "扩列达人",
      "天天被点赞",
      "身高暴涨",
      "财富猛涨",
      "恋爱美满",
      "心想事成",
      "自我升华",
      "气质倍增",
      "成为群主",
      "看点之王",
      "空间达人",
      "众人羡慕的对象",
      "作业少少",
      "万人迷",
      "完美身材"
    ],
    aiResult: [
      "沉迷学习，日渐消瘦",
      "吃鸡王者两开花",
      "扩列达人",
      "天天被点赞",
      "身高暴涨",
      "财富猛涨",
      "恋爱美满",
      "心想事成",
      "自我升华",
      "气质倍增",
      "成为群主",
      "看点之王",
      "空间达人",
      "众人羡慕的对象",
      "作业少少",
      "万人迷",
      "完美身材"
    ]
  },
  onLoad: function () {
    this.initAuth();
    this.initVideo();
  },
  initVideo() {
    let that = this;
    videoAd = wx.createRewardedVideoAd({ adUnitId: 'c34280eb518c80e2b4a394dec88fb049' });
    videoAd.onError(function (res) { console.log('videoAd onError', res) });
    videoAd.onLoad(function (res) { console.log('videoAd onLoad', res) });
    videoAd.onClose(function (res) {
      let result = that.aiData();
      if (res.isEnded) {
        that.converImg(result);
      } else {
        wx.showModal({
          title: '预测失败',
          confirmText: "继续观看",
          content: '看完视频，人工智能预测即可获悉',
          success(res) {
            if (res.confirm) {
              videoAd.show()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });
    videoAd.load().then(() => {

    }).catch(err => { });
  },
  aiData() {
    let result = this.data.aiResult;
    let user = wx.getStorageSync("user");
    let arr = this.getRandomArrayElements(result, 3);
    let city = user.city || '';
    if (user.gender == 1) {
      arr.unshift("成为男神");
      arr.unshift(city + '一哥');
    } else {
      arr.unshift("成为女神");
      arr.unshift(city + '一姐');
    };
    return arr;
  },
  bindGetUserInfo(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync("user", e.detail.userInfo);
      this.start()
    } else {
      wx.showToast({
        title: '授权后可以预测！',
        icon: 'none'
      })
    }

  },
  aiGetUserInfo(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync("user", e.detail.userInfo);
      this.aiStart()
    } else {
      wx.showToast({
        title: '授权后可以预测！',
        icon: 'none'
      })
    }

  },
  start() {
    let result = this.getRandomArrayElements(this.data.result, 5);
    this.converImg(result);
  },
  aiStart() {
    videoAd.show();
  },
  converImg(result) {
    wx.showLoading({ title: '正在生成中...' });
    let user = wx.getStorageSync("user");
    let nickname = user.nickName;
    let avatar = user.avatarUrl;

    let ctx = wx.createCanvasContext('export');
    ctx.setFillStyle('#FFF7D6')
    ctx.fillRect(0, 0, 700, 1050)
    ctx.drawImage("../../static/imgs/bg.jpg", 0, 0, 700, 1050);

    this.downLoadImg(avatar).then(res => {
      ctx.drawImage(res, 80, 50, 100, 100);
      ctx.setFillStyle('#000')
      ctx.setFontSize(28)
      ctx.fillText(nickname, 20, 200);
      ctx.font = 'normal bold 36px normal';
      //五道题目
      for (let i = 0; i < 5; i++) {
        ctx.fillText(result[i], 144, 420 + i * 80);
      };
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId: 'export',
          success(res) {
            wx.hideLoading();
            let file = res.tempFilePath;
            wx.navigateTo({
              url: '/pages/detail/index?file=' + file
            })
          }
        })
      });
    })

  },
  getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  downLoadImg(img) {
    return new Promise((resolve) => {
      wx.downloadFile({
        url: img,
        success: res1 => {
          resolve(res1.tempFilePath)
        },
        fail: error => {
          wx.hideLoading();
        }
      })
    })
  },
  initAuth() {
    let user = wx.getStorageSync("user");
    if (user && user.nickName) {
      this.setData({
        isAuth: true
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
