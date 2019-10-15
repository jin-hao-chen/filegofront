<template>
    <div>
        <el-header style="text-align: right; font-size: 12px">
            <span>截止时间: {{currentCategoryExpireTime}}</span>
            <el-button v-show="adminSid==''" type="primary" round icon="el-icon-user" @click="handleAdminLogin">管理员登录</el-button>
            <el-button v-show="adminSid!=''" type="primary" round icon="el-icon-user" @click="handleAdminLogout">{{ adminSid }} 登出</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="primary" round icon="el-icon-search" @click="handleUploadFileDlg">作业上传</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="primary" round @click="handleAlgorithmHit">{{ currentCategory }}({{ uploadedFileListNum }}/{{ studentNum }})</el-button>
        </el-header>
        <slot name="uploadFileDlg"></slot>
        <slot name="cameraDlg"></slot>
    </div>
</template>

<script>

import * as config from 'api/config.js'
import axios from 'axios'
import * as goHeader from 'api/goHeader.js'
import * as utils from 'common/utils.js'

var that = null

export default {
    props: {
        handleAdminLogin: {
            type: Function,
            required: true
        },
        handleUploadFileDlg: {
            type: Function,
            required: true
        },
        handleAlgorithmHit: {
            type: Function,
            required: true
        },
        studentNum: {
            type: Number,
            required: true
        },
        uploadedFileListNum: {
            type: Number,
            required: true
        },
        handleAdminLogout: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            currentCategory: '算法导论',
            currentCategoryExpireTime: '',
            adminSid: ''
        }
    },
    created() {
        that = this
        goHeader.getCurrentCategory(that)
        that.adminSid = that.$store.getters.getAdminSid
    },
    beforeUpdate() {
        that.adminSid = that.$store.getters.getAdminSid
    }
}
</script>

<style scoped>
.el-header {
    background-color: #409EFF;
    color: #FFFFFF;
    line-height: 60px;
}
</style>