const path = require('path');
module.exports = {
    base: process.env.NODE_ENV === 'production' ? '/pages/lingmao/vue-ssr/docs/dist/' : '/',
    dest: path.resolve(__dirname, '../dist'),
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://git.gaoding.com/lingmao/vue-ssr' },
        ],
        sidebar: {
            '/md/': [
                ['home', '安装'],
                ['pages', '目录结构']
            ]
        }
    }
};
