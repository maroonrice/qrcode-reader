<template>
<div class="content-wrapper">

<div class="content-header">
<div class="container-fluid">
<div class="row mb-2">
<div class="col-sm-6">
<h1 class="m-0">Camera</h1>
</div>
<div class="col-sm-6">
<ol class="breadcrumb float-sm-right">
<li class="breadcrumb-item"><router-link to="/">Menu</router-link></li>
<li class="breadcrumb-item active">Camera</li>
</ol>
</div>
</div>
</div>
</div>

<section class="content">
<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="alert alert-warning alert-dismissible" v-for="(message, index) in messages">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click="deleteMessage(index)">×</button>
        {{ message }}
      </div>
      <div class="alert alert-info alert-dismissible" v-if="qrcode_value">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true" @click="deleteQrCodeValue">×</button>
        {{ qrcode_value }}
      </div>
      <div>
        <video id="js-video" class="reader-video" playsinline :srcObject.prop="video.stream" @loadedmetadata="onloadedmetadata" @resize="onresize"></video>
      </div>
      <div style="display:none;">
        <canvas id="js-canvas" :width="video.width" :height="video.height" :style="v_style"></canvas>
      </div>
    </div>
  </div>
</div>
</section>

</div>
</template>

<script>
import jsQR from 'jsqr'

export default {
  data() {
    return {
      messages: [],
      video: {
        stream: undefined,
        width: 300,
        height: 150,
        tag: undefined,
      },
      v_style: {
        width: "300px",
        height: "150px",
      },
      qrcodecheck: true,
      qrcode_value: undefined,
    }
  },
  mounted() {
    const thisObj = this
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { min: 960 },
          height: { min: 1280 },
          facingMode: {
            exact: 'environment'
          }
        }
      }).then((stream) => {
        thisObj.video.stream = stream
      }).catch((err) => {
        thisObj.messages.push("カメラを起動できませんでした")
      })
  },
  beforeUnmount() {
    if (this.video.stream) {
      this.video.stream.getTracks().forEach(track => { track.stop() })
      this.video.stream = undefined
    }
  },
  methods: {
    onloadedmetadata(e) {
      e.target.play()
      this.video.tag = e.target
      this.qrcodechecker()
    },
    onresize(e) {
      this.v_style.width = e.target.clientWidth + "px"
      this.v_style.height = e.target.clientHeight + "px"
      this.video.width = e.target.videoWidth
      this.video.height = e.target.videoHeight
    },
    deleteMessage(index) {
      this.messages.splice(index,1)
    },
    deleteQrCodeValue() {
      this.qrcodechecker()
    },
    qrcodechecker() {
      this.qrcode_value = undefined
      const video = this.video.tag
      const canvas = document.querySelector('#js-canvas')
      const ctx = canvas.getContext('2d')
      const checkImage = () => {
        try {
          const start = new Date().getMilliseconds()
          ctx.drawImage(video, 0, 0, this.video.width, this.video.height)
          const imageData = ctx.getImageData(0, 0, this.video.width, this.video.height)
          const code = jsQR(imageData.data, this.video.width, this.video.height)
          if (code) {
            this.qrcode_value = code.data
          } else {
            const interval = new Date().getMilliseconds() - start
            setTimeout(() => { checkImage() }, Math.max(interval, 200))
          }
          //this.messages.push("end qrcodechecker: " + canvas.width + "x" + canvas.height + ", " + video.clientWidth + "x" + video.clientHeight + ", " + video.videoWidth + "x" + video.videoHeight)
        } catch(e) {
          this.messages.push("error qrcodechecker: " + e)
        }
      }
      checkImage()
    },
  }
}
</script>

<style>
.reader-video {
    background-color: #000;
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>
