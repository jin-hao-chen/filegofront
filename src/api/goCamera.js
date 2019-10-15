import axios from 'axios'
import qs from 'qs'
import * as options from 'api/config.js'


export const faceRecognize = (that, imgBase64) => {
    var params = {
        img: imgBase64
    }
    axios.post('api/students', qs.stringify(params))
        .then(response => {
            var data = response.data
            if (data.code == options.CODE_OK) {
                that.$message({
                        message: '管理员' + data.item.sid + ' ' + data.item.name + '登录',
                        type: 'success'
                    })
                    // TODO
                that.adminSid = data.item.sid
                that.adminName = data.item.name
                that.$store.commit('setAdminSid', that.adminSid)
                that.$store.commit('setAdminName', that.adminName)
                that.handleCameraClose()
            } else if (data.code == options.CODE_ERROR) {
                that.$message({
                    message: '验证失败, 请点击取消再尝试',
                    type: 'warning'
                })
            } else if (data.code == options.CODE_ERROR02) {
                that.$message({
                    message: '未检测到人脸, 请点击取消再尝试',
                    type: 'warning'
                })
            }
        })
        .catch(error => {
            console.log(error)
            that.$message({
                message: '网络异常',
                type: 'warning'
            })
        })
}