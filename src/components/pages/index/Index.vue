<template>
    <div v-show="isInputSidRight">
        <go-header
        :handleAdminLogin="handleAdminLogin"
        :handleUploadFileDlg="handleUploadFileDlg"
        :handleAlgorithmHit="handleAlgorithmHit"
        :studentNum="studentNum"
        :uploadedFileListNum="uploadedFileList.length"
        :handleAdminLogout="handleAdminLogout"
        ref="goHeader"
        >
            <template #uploadFileDlg>
                <go-file-upload-dlg
                ref="uploadDlg"
                :title="title"
                :action="uploadFileLink"
                :limit="3"
                :handleClose="handleUploadFileDlgClose"
                :handleRemove="handleUploadFileDlgRemove"
                :beforeRemove="beforeUploadFileDlgRemove"
                :dialogVisible="uploadFileDlgVisible"
                :clickOK="clickUploadFileDlgOK"
                :clickCancle="clickUploadFileDlgCancle"
                :data="uploadFileExtraData"
                :beforeUpload="beforeUploadFileDlgUpload"
                :handleSuccess="handleUploadFileDlgSuccess"
                :handleError="handleUploadFileDlgError"
                ></go-file-upload-dlg>
            </template>

            <template #cameraDlg>
                <go-camera
                ref="camera"
                :title="'刷脸登录'"
                :handleCameraCancle="handleCameraCancle"
                :handleCameraClose="handleCameraClose"
                :dialogVisible="cameraDialogVisible"
                >
                </go-camera>
            </template>
        </go-header>
        <el-main>
            <go-table
            :uploadedFileList="uploadedFileList"
            ></go-table>
        </el-main>
    </div>
</template>

<script>

import * as index from 'api/index.js'
import * as utils from 'common/utils.js'
import * as config from 'api/config.js'
import GoHeader from 'components/common/GoHeader/GoHeader.vue'
import GoTable from 'components/common/GoTable/GoTable.vue'
import GoFileUploadDlg from 'components/common/GoFileUploadDlg/GoFileUploadDlg.vue'
import GoCamera from 'components/common/GoCamera/GoCamera.vue'

var that = null

export default {
    data() {
        return {
            title: "文件上传",
            uploadFileLink: config.baseURL + '/api/files',
            uploadedFileList: [],
            studentNum: 0,
            uploadFileDlgVisible: false,
            cameraDialogVisible: false,
            uploadFileExtraData: {},
            isUploadFilenameRight: true,
            isInputSidRight: false,
            adminSid: '',
            adminName: ''
        }
    },
    methods: {
        handleAdminLogout() {
            that = this
            that.adminSid = ''
            that.adminName = ''
            that.$store.commit('setAdminSid', that.adminSid)
            that.$store.commit('setAdminName', that.adminName)
            that.$refs.goHeader.adminSid = ''
        },
        handleAdminLogin() {
            that = this
            that.cameraDialogVisible = true
            that.$refs.camera.callCamera()
        },
        handleCameraOK() {
            that = this
        },
        handleCameraCancle() {
            that = this
            this.cameraDialogVisible = false
            that.$refs.camera.closeCamera()
        },
        handleCameraClose() {
            that = this
            that.cameraDialogVisible = false
            that.$refs.camera.closeCamera()
        },
        handleUploadFileDlg() {
            that = this
            that.uploadFileDlgVisible = true
        },
        handleAlgorithmHit() {
            that = this
            that.$message({
                message: '还有' + (that.studentNum - that.uploadedFileList.length) + '个人没有交',
                type: 'success'
            });
        },
        handleUploadFileDlgClose(done) {
            that = this
            that.$refs.uploadDlg.$refs.elUpload.clearFiles()
            that.uploadFileDlgVisible = false
        },
        handleUploadFileDlgRemove(file, fileList) {
            that = this
            if (utils.fetchSid(file.name) == null) {
                return false
            }
            index.deleteFile(that, file, {})
        },
        beforeUploadFileDlgRemove(file, fileList) {
            that = this
            if (utils.fetchSid(file.name) == null) {
                return true
            }
            return that.$confirm("你确定要删除 '" + file.name + "' 吗 ?")
        },
        clickUploadFileDlgCancle() {
            that = this
            that.$refs.uploadDlg.$refs.elUpload.clearFiles()
            that.uploadFileDlgVisible = false
        },
        clickUploadFileDlgOK() {
            that = this
            that.$refs.uploadDlg.$refs.elUpload.clearFiles()
            that.uploadFileDlgVisible = false
        },
        beforeUploadFileDlgUpload(file) {
            that = this
            var filename = file.name
            var sid = utils.fetchSid(filename)
            if (sid == null) {
                utils.showMessageBox(that, "提示", "文件名 '" + filename + "' 没有包含学号")
                that.$refs.uploadDlg.$refs.elUpload.abort(file)
                return false
            }
            return true
        },
        handleUploadFileDlgSuccess(response, file, fileList) {
            that = this
            if (response.code == config.CODE_ERROR) {
                utils.showMessageBox(that, "提示", "文件 '" + file.name + "' 上传失败")
                return
            }
            var uploadedFileList = that.$store.getters.getUploadedFileList
            var filename = file.name
            var sid = utils.fetchSid(filename)
            for (var i = 0; i < uploadedFileList.length; i++) {
                var currentFile = uploadedFileList[i]
                if (sid == currentFile.sid) {
                    currentFile.filename = filename
                    currentFile.upload_time = response.item.upload_time
                    currentFile.size = file.size / 1000 + ' KB'
                    that.$store.commit('setUploadedFileList', uploadedFileList)
                    index.updateFileSize(that, file)
                    return
                }
            }
            var newFile = response.item
            uploadedFileList.push({
                sid: newFile.sid,
                name: newFile.owner.name,
                filename: newFile.filename,
                upload_time: newFile.upload_time,
                size: file.size / 1000 + ' KB'
            })
            index.updateFileSize(that, file)
            that.$store.commit('setUploadedFileList', uploadedFileList)
        },
        handleUploadFileDlgError() {
            
        },
        showSidInputDlg(){
            that = this
            that.$prompt('请输入你的学号', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                beforeClose(action, instance, done) {
                    index.getStudentBySid(that, instance.inputValue, done)
                }
            })
            .then(({ value }) => {
            })
            .catch(() => {
            })
        }
    },
    created() {
        that = this
        if (that.isInputSidRight) {
            index.getUploadedFileList(that)
        }
    },
    mounted() {
        that = this
        if (!that.isInputSidRight) {
            that.showSidInputDlg()
        } else {
            that.getUploadedFileList(that)
        }
    },
    components: {
        GoHeader,
        GoTable,
        GoFileUploadDlg,
        GoCamera
    }
}
</script>

<style scoped>

</style>
