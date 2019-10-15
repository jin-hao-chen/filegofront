<template>
    <div>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="75%"
        :before-close="handleCameraClose">
            <canvas v-show="!isShowVideo" 
            ref="canvas" 
            :width="640" 
            :height="480"></canvas>
            <video v-show="isShowVideo" ref="video" :width="640" :height="480" autoplay></video>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCameraCancle">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>


import * as utils from 'common/utils.js'
import * as config from 'api/config.js'
import * as goCamera from 'api/goCamera.js'

var that = null
export default {
    props: {
        title: {
            type: String,
            default: function() {
                return '摄像头'
            }
        },
        dialogVisible: {
            type: Boolean,
            default: function() {
                return false
            }
        },
        handleCameraCancle: {
            type: Function,
            required: true
        },
        handleCameraClose: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            config: config,
            isShowVideo: true
        }
    },
    methods: {
        callCamera() {
            that = this
            that.isShowVideo = true
            navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(success => {
                that.$refs.video.srcObject = success
                that.$refs.video.play()
                setTimeout(() => {
                    that.photograph()
                }, 1000)
            })
            .catch(error => {
                console.log(error)
            })
        },
        closeCamera () {
            this.isShowVideo = true
            if (!this.$refs['video'].srcObject) {
                return
            }
            let stream = this.$refs['video'].srcObject
            let tracks = stream.getTracks()
            tracks.forEach(track => {
                track.stop()
            })
            this.$refs['video'].srcObject = null
        },
        photograph() {
            that = this
            that.isShowVideo = false
            let ctx = this.$refs['canvas'].getContext('2d')
            ctx.drawImage(this.$refs['video'], 0, 0, 640, 480)
            let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7)
            let str = imgBase64.replace('data:image/jpeg;base64,', '')
            goCamera.faceRecognize(that, str)
        }
    }
}
</script>

<style scoped>

</style>