//index.js
//获取应用实例

const tf = require('@tensorflow/tfjs-core');
const tfl = require('@tensorflow/tfjs-layers');
require('regenerator-runtime');
const system = ['iOS', 'EMUI', 'One UI', 'MIUI'];

Page({
  onLoad: function () {
    this.canvas = wx.createCanvasContext('canvas', this);
    this.loadModel();
    rpx=wx.getSystemInfoSync().windowWidth/750;
  }, 

  async loadModel() {
    //this.model = await tfl.loadLayersModel("https://api.buzhibujue.cf/mobilenet/model.json");
    this.model = await tfl.loadLayersModel("http://192.168.1.10:8000/model.json");
//    this.model = await tfl.loadLayersModel("http://localhost:8000/model.json");
    this.model.summary();
  }, 

  upload () {
    var cvs = wx.createCanvasContext('canvas')
    var cvs2 = wx.createCanvasContext('canvas2')

    const temp = this;
    wx.chooseImage({
      count: 1,
      success: function(res){
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success (res) {
            console.log(res)
            cvs.drawImage(
              res.path, 
              0, 0, 
              res.width,
              res.width,
              0,0,
              600*rpx,
              600*rpx
              );
             cvs2.drawImage(
                res.path, 
                0, 0, 
                res.width,
                res.height,
                );
              cvs.draw();
              cvs2.draw(false, () => {
              wx.canvasGetImageData({
                canvasId: 'canvas2',
                height: res.height,
                width:  res.width,
                x: 0,
                y: 0,
                success: (res) => {
                  temp.predict(res);
                  console.log("ok");
                }
              })
            });
          }
        });
      }
    })
  }, 

  async predict(img) {
    if (this.model == null) return;
    const imgData = {
      data: new Uint8Array(img.data), 
      width: img.width, 
      height: img.height
    };
    this.setData({
      text: "识别中"
    });
    const imgSlice = tf.tidy(() => {
      const imgTensor = tf.browser.fromPixels(imgData, 4);
      const realImgTensor = imgTensor.slice([0, 0, 0], [-1, -1, 3]).expandDims(0);
      const divisor = tf.scalar(255);
      return tf.div(tf.image.cropAndResize(realImgTensor, [[0, 0, 0.06*img.width/img.height, 1]], [0], [32, 512]),divisor);
    });
    const res = await this.model.predict(imgSlice);
    console.log('Completed');
    console.log(res);
    console.log(res.squeeze().dataSync());
    const y = res.squeeze().dataSync();
    max_index=0
    for (var i = 0; i < y.length; ++i)
      if (y[i] >y[max_index])max_index=i;
    this.setData({
      text: "识别结果为："+system[max_index]
    });
  }, 

  data: {
    text:""
  }
})
