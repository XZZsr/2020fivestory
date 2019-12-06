// components/title/title.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pt: {
            type: Number,
            value: 20
        },
        show: {
            type: Boolean,
            value: false
        }
    },

    options: {
        addGlobalClass: true,
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
        getToday() {
            var day = new Date();
            return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
        }
    },
    attached: function (option) {
        //导航栏自适应
        let systemInfo = wx.getSystemInfoSync();
        let reg = /ios/i;
        let pt = 20;//导航状态栏上内边距
        let h = 44;//导航状态栏高度
        if (reg.test(systemInfo.system)) {
            pt = systemInfo.statusBarHeight;
            h = 44;
        } else {
            pt = systemInfo.statusBarHeight;
            h = 48;
        }
        this.setData({
            pt: pt + h + 10,
        });
        setTimeout(() => {
            this.setData({
                show: false,
            });
        }, 5000)

    }
})
