const env = {
    dev: {
        ENV: 'dev'
    },
    stage: {
        ENV: 'stage'
    },
    prod: {
        ENV: 'prod'
    }
};

module.exports = JSON.stringify(env['dev']);