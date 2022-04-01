// pages/learn/index.js

Component({
  data: {
    active: 0,

    notifications: [{}],
    discardNotifications: [],
    homeworks: [{}],
    discardHomeworks: [],
    courses: [{}],
    discardCourses: [],

    tabDatas: [{
        "url": "/pages/learn/announcement/announcement",
        "icon": "bulb-o",
        "text": "公告"
      },
      {
        "url": "/pages/learn/homework/homework",
        "icon": "records",
        "text": "作业"
      },
      {
        "url": "/pages/learn/course/course",
        "icon": "notes-o",
        "text": "课程"
      },
      {
        "url": "/pages/learn/calendar/calendar",
        "icon": "calendar-o",
        "text": "日程表"
      }
    ],

  },

  methods: {
    onChange(e) {
      wx.showToast({
        title: `切换到 ${e.detail.title}`,
        icon: 'none'
      });
      this.setData({
        active: e.detail.index
      });
    },

    courseToTap: function (e) {
      console.log(e.currentTarget);
      var id = e.currentTarget.dataset.id;
      var name = e.currentTarget.dataset.name;
      // console.log(id, name);
      wx.navigateTo({
        //实现跳转到test界面的函数，url附带跳转时传送的数据
        url: '/pages/learn/course/course?id=' + id +'&name=' + name,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log("onLoad");
      wx.setNavigationBarTitle({
        title: "网络学堂"
      });
      // 最初获取数据
      wx.request({
        url: 'http://localhost:3000/learn/login',
        data: {
          username: "2018013402",
          password: "20010120FangLin"
        },
        method: "POST",
        dataType: 'JSON',
        responseType: 'text',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          var jsonRes = JSON.parse(res.data);
          if (jsonRes["msg"] == "ok") {
            console.log("login success");
          }
        }
      });
      wx.request({
        url: 'http://localhost:3000/learn/courses',
        data: {
          username: "2018013402",
          semesterId: "2021-2022-2"
        },
        method: "POST",
        dataType: 'JSON',
        responseType: 'text',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          var jsonRes = JSON.parse(res.data);
          if (jsonRes["msg"] == "ok") {
            // console.log(jsonRes["courses"]);
            this.setData({
              courses: jsonRes["courses"]
            });
          } else {
            console.log(jsonRes);
          }
        }
      });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      console.log("onShow");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log("onUnload");
      wx.setNavigationBarTitle({
        title: "THUAssistant"
      });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
  }
});