module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'api': '@/api',
                'common': '@/common',
                'store': '@/store',
                'router': '@/router'
            }
        }
    }
}