<template>
    <div>
        <el-table :data="uploadedFileList">
            <el-table-column prop="sid" label="学号" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="filename" label="文件名" width="200">
            </el-table-column>
            <el-table-column prop="size" label="文件大小" width="200">
            </el-table-column>
            <el-table-column prop="upload_time" label="上传时间">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200"
            >
                <template slot-scope="scope">
                    <el-button @click="handleDownload(scope.row)" type="text" size="small">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>    
</template>

<script>

import * as goTable from 'api/goTable.js'
var that = null

export default {
    props: {
        uploadedFileList: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleDownload(row) {
            that = this
            goTable.downloadFile(that, row)
        }
    }
}
</script>

<style scoped>

</style>