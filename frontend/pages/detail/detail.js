Page({
  data: {
    showModalStatus: false,
    list: [
      {
        id: 0,
        name : "iOS",
        introduce: "苹果",
        src: '/imgs/ios.jpg',
        showModalStatus: false,
        des: "iOS是由苹果公司开发的移动操作系统。苹果公司最早于2007年1月9日的Macworld大会上公布这个系统，最初是设计给iPhone使用的，后来陆续套用到iPod touch、iPad上。iOS与苹果的macOS操作系统一样，属于类Unix的商业操作系统"
      },
      {
        id: 1,
        name: "EMUI",
        introduce: "华为/荣耀",
        src: '/imgs/emui.jpg',
        showModalStatus: false,
       des: "Emotion UI(简称EMUI)是华为基于Android(安卓)进行开发的情感化操作系统。拥有简化的用户界面、新的手势导航和HiVision的“AI”功能，采用了自然极简的设计。"
      },   
      {
        id: 2,
        name : "One UI",
        introduce: "三星",
        src: '/imgs/oneui.jpg',
        showModalStatus: false,
        des: "One UI（前身：Samsung Experience、TouchWiz）是Samsung在2018年11月22日的Samsung开发者大会发布的全新用户界面。用以接替上一版本的 Samsung Experience ，作为三星电子旗下的三星Galaxy系列手机以及Galaxy Watch系列的用户界面。"
      },
      {
        id: 3,
        name: "MIUI",
        introduce: "小米/红米",
        src: '/imgs/miui.jpg',
        showModalStatus: false,
       des: "MIUI是小米公司旗下基于Android系统深度优化、定制、开发的第三方手机操作系统，也是小米的第一个产品。从2010年8月16日首个内测版发布至今，MIUI已经拥有国内外3.1亿用户，覆盖80种语言，支持221个国家与地区。"
      }
    
    
    ]
  },
  powerDrawer: function (e) {
    console.log("clicked");

    var currentStatu = e.currentTarget.dataset.statu;
    var index = e.currentTarget.id;

    // 关闭
    if (currentStatu == 'close') {
      this.data.list[index].showModalStatus = false;
      this.setData({
        showModalStatus: false,
        list: this.data.list,
      });
    }

    // 显示
    if (currentStatu == 'open') {
      this.data.list[index].showModalStatus = true;
      this.setData({
        showModalStatus: true,
        list: this.data.list,
      });
    }
  },

})