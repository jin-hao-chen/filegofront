<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-upload
                ref="elUpload"
                class="upload-demo"
                :action="action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
                multiple
                :limit="limit"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :data="data">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clickCancle">取消</el-button>
                <el-button type="primary" @click="clickOK">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
var that = null
export default {
    data() {
        return {
            fileList: []
        }
    },
    props: {
        title: {
            type: String,
            default: function() {
                return '提示'
            }
        },
        action: {
            type: String,
            default: function() {
                return 'https://jsonplaceholder.typicode.com/posts/'
            }
        },
        limit: {
            type: Number,
            default: function() {
                return 3
            }
        },
        handleClose: {
            type: Function,
            required: true
        },
        handleRemove: {
            type: Function,
            required: true
        },
        beforeRemove: {
            type: Function,
            required: true
        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
        clickOK: {
            type: Function,
            required: true
        },
        clickCancle: {
            type: Function,
            required: true
        },
        data: {
            type: Object,
            default: function() {
                return {}
            }
        },
        handleSuccess: {
            type: Function,
            required: true
        },
        handleError: {
            type: Function,
            required: true
        },
        beforeUpload: {
            type: Function,
            required: true
        }
    },
    methods: {
        handlePreview(file) {
            console.log('handlePreview ' + file)
        },
        handleExceed() {
            that = this
            that.$message({
                message: '当前显示一次最多上传 ' + that.limit + ' 个文件'
            })
        }
    }
}
</script>

<style scoped>

</style>