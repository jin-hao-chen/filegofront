import axios from 'axios'
import * as utils from 'common/utils.js'
import * as options from 'api/config.js'

export const getCurrentCategory = (that) => {
    axios.get('/api/files/categories', {
            params: {
                is_current: 1
            }
        })
        .then(response => {
            utils.hideLoading()
            var data = response.data
            if (data.code == options.CODE_OK) {
                var currentCategory = data.item.name
                var currentCategoryExpireTime = data.item.expire_time
                that.$store.commit('setCurrentCategory', currentCategory)
                that.$store.commit('setCurrentCategoryExpireTime', currentCategoryExpireTime.toString())
                that.currentCategory = currentCategory
                that.currentCategoryExpireTime = currentCategoryExpireTime
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