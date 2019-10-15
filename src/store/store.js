import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        uploadedFileList: [],
        studentNum: 0,
        currentCategory: '算法导论',
        currentCategoryExpireTime: '',
        adminSid: '',
        adminName: ''
    },
    getters: {
        getAdminName(state) {
            return state.adminName
        },
        getAdminSid(state) {
            return state.adminSid
        },
        getUploadedFileList(state) {
            return state.uploadedFileList
        },
        getStudentNum(state) {
            return state.studentNum
        },
        getCurrentCategory(state) {
            return state.currentCategory
        },
        getCurrentCategoryExpireTime(state) {
            return state.currentCategoryExpireTime
        }
    },
    mutations: {
        setCurrentCategoryExpireTime(state, currentCategoryExpireTime) {
            state.currentCategoryExpireTime = currentCategoryExpireTime
        },
        setUploadedFileList(state, uploadedFileList) {
            state.uploadedFileList = uploadedFileList
        },
        setStudentNum(state, studentNum) {
            state.studentNum = studentNum
        },
        setCurrentCategory(state, currentCategory) {
            state.currentCategory = currentCategory
        },
        setAdminSid(state, adminSid) {
            state.adminSid = adminSid
        },
        setAdminName(state, adminName) {
            state.adminName = adminName
        }
    },
    actions: {

    }
})