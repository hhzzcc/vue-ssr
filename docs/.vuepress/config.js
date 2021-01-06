const path = require('path');
module.exports = {
    // base: '/pages/gaoding/gaoding-material-lib/dist/',
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
