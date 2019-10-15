import axios from 'axios'
import * as utils from 'common/utils.js'
import * as options from './config.js'
import qs from 'qs'

export const getUploadedFileList = (that) => {
    axios.get('/api/files')
        .then(response => {
            utils.hideLoading()
            var data = response.data
            if (data.code == options.CODE_OK) {
                var uploadedFileList = data.items
                that.studentNum = data.studentNum
                that.$store.commit('setStudentNum', that.studentNum)
                for (var i = 0; i < uploadedFileList.length; i++) {
                    var file = uploadedFileList[i]
                    that.uploadedFileList.push({
                        sid: file.sid,
                        name: file.owner.name,
                        filename: file.filename,
                        upload_time: utils.formatDatetime(file.upload_time),
                        size: file.size + ' KB'
                    })
                }
                that.$store.commit('setUploadedFileList', that.uploadedFileList)
            } else if (data.code == options.CODE_ERROR) {
                utils.hideLoading()
                that.$message({
                    message: '获取已上传文件列表失败',
                    type: 'warning'
                })
            }
        })
        .catch(error => {
            utils.hideLoading()
            console.log(error)
            that.$message({
                message: '网络异常',
                type: 'warning'
            })
        })
}

export const deleteFile = (that, file, config) => {
    var filename = file.name
    var sid = utils.fetchSid(filename)
    axios.delete('/api/files/' + sid, config)
        .then(response => {
            var data = response.data
            if (data.code == options.CODE_ERROR) {
                utils.showMessageBox(that, "提示", "文件 '" + filename + "' 不存在")
                return
            }
            if (data.code == options.CODE_ERROR02) {
                utils.showMessageBox(that, "提示", "sid 没有被指定")
                return
            }
            if (data.code == options.CODE_OK) {
                var uploadedFileList = that.$store.getters.getUploadedFileList
                for (var i = 0; i < uploadedFileList.length; i++) {
                    if (sid == uploadedFileList[i].sid) {
                        uploadedFileList.splice(i, 1)
                        that.$store.commit('setUploadedFileList', uploadedFileList)
                    }
                }
                that.uploadedFileList = uploadedFileList
            }
        })
        .catch(error => {
            utils.showMessageBox(that, "提示", "网络异常")
        })
}

export const updateFileSize = (that, file) => {
    var filename = file.name
    var sid = utils.fetchSid(filename)
    var data = {
        size: file.size / 1000
    }
    axios.put('/api/files/' + sid, qs.stringify(data))
        .then(response => {
            var data = response.data
            if (data.code == options.CODE_ERROR) {
                that.$message({
                    message: '更新数据库文件大小失败',
                    type: 'warning'
                })
            }
        })
        .catch(error => {
            console.log(error)
            that.$message({
                message: '网路异常',
                type: 'warning'
            })
        })
}


export const getCurrentCategory = (that) => {
    axios.get('/api/files/categories', {
            params: {
                is_current: true
            }
        })
        .then(response => {
            utils.hideLoading()
            var data = response.data
            if (data.code == options.CODE_OK) {
                var currentCategory = data.item.name
                that.$store.commit('setCurrentCategory', currentCategory)
                that.currentCategory = currentCategory
            } else if (data.code == options.CODE_ERROR) {
                utils.hideLoading()
                that.$message({
                    message: '获取类别失败',
                    type: 'warning'
                })
            }
        })
        .catch(error => {
            utils.hideLoading()
            console.log(error)
            that.$message({
                message: '网络异常',
                type: 'warning'
            })
        })
}


export const getStudentBySid = (that, sid, done) => {
    if (sid == null) {
        that.$message({
            message: '请填写学号',
            type: 'warning'
        })
        return
    }
    axios.get('/api/students/' + sid)
        .then(response => {
            var data = response.data
            if (data.code == options.CODE_OK) {
                that.isInputSidRight = true
                getUploadedFileList(that)
                done()
            } else if (data.code == options.CODE_ERROR) {
                that.$message({
                    message: '学号 ' + sid + ' 不存在',
                    type: 'warning'
                })
            }
        })
        .catch(error => {
            console.log(error)
            that.$message({
                message: '网络异常, 请稍后再试',
                type: 'warning'
            })
        })
}
