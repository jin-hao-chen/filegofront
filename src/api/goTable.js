import axios from 'axios'
import * as utils from 'common/utils.js'
import * as options from './config.js'
import qs from 'qs'


export const downloadFile = (that, row) => {
    that.$message({
        message: '下载大文件可能会失败',
        type: 'warning'
    })
    axios.get('/api/files/' + row.sid, {
            params: {
                is_download: 1
            },
            responseType: 'blob'
        })
        .then(response => {
            var url = window.URL.createObjectURL(new Blob([response.data]))
            console.log(url)
            var link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download = row.filename
            link.click()
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.log(error)
            that.$message({
                message: '连接超时, 文件下载失败',
                type: 'warning'
            })
        })
}