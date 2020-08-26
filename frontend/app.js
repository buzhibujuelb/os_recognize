//app.js

var fetchWechat = require('fetch-wechat');
var tf = require('@tensorflow/tfjs-core');
var webgl = require('@tensorflow/tfjs-backend-webgl');
var plugin = requirePlugin('tfjsPlugin');

App({
  onLaunch: function () {
    plugin.configPlugin({
      fetchFunc: fetchWechat.fetchFunc(), 
      tf, 
      webgl, 
      canvas: wx.createOffscreenCanvas()
    });
    tf.tensor([1, 1, 4, 5, 1, 4]).print();
  }
})