export default {
    created() {
        // 客户端将数据从window中提取，注入到组件中
        if (
            typeof window !== 'undefined' &&
            window.__INITIAL_STATE__ &&
            this.$options.name
        ) {
            const res = window.__INITIAL_STATE__[this.$options.name];
            if (res) {
                Object.assign(this, res);
            }
            // else {
            //     const { asyncData } = this.$options;
            //     asyncData.call(this).then(res => {
            //         // 数据合并到组件中
            //         Object.assign(this, res);
            //     }).catch(error => {
            //         throw error;
            //     });
            // }
        }
    },
    async serverPrefetch() {
        const { asyncData } = this.$options;
        // 服务端数据预处理
        if (asyncData) {
            return asyncData.call(this).then(res => {
                // 数据注入window，在客户端渲染时提取
                this.$ssrContext.state ?
                    this.$ssrContext.state[this.$options.name] = res :
                    this.$ssrContext.state = { [this.$options.name]: res };

                // 数据合并到组件中
                Object.assign(this, res);
            }).catch(error => {
                throw error;
            });
        }
    }
};