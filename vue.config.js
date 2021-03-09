module.exports = {
    /**
     * publicPath
     * Type: string
     * Default: '/'
     *
     * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
     */
    publicPath: '/',

    /**
     * outputDir
     * Type: string
     * Default: 'dist'
     *
     * 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
     */
    // outputDir: 'dist',

    /**
     * assetsDir
     * Type: string
     * Default: ''
     *
     * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
     */
    // assetsDir: '',

    /**
     * indexPath
     * Type: string
     * Default: 'index.html'
     *
     * 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
     */
    // indexPath: 'index.html',

    /**
     * filenameHashing
     * Type: boolean
     * Default: true
     *
     * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
     */
    // filenameHashing: true,

    /**
     * pages
     * Type: Object
     * Default: undefined
     *
     * 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
     * 1、一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
     * 2、或一个指定其 entry 的字符串。
     */
    // pages: undefined,

    /**
     * lintOnSave
     * Type: boolean | 'warning' | 'default' | 'error'
     * Default: true
     *
     * 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
     * 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'error'。这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
     */
    lintOnSave: 'error',

    /**
     * runtimeCompiler
     * Type: boolean
     * Default: false
     *
     * 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
     */
    // runtimeCompiler: false,

    /**
     * transpileDependencies
     * Type: Array<string | RegExp>
     * Default: []
     *
     * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
     */
    // transpileDependencies: [],

    /**
     * productionSourceMap
     * Type: boolean
     * Default: true
     *
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     */
    productionSourceMap: false,

    /**
     * crossorigin
     * Type: string
     * Default: undefined
     *
     * 置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
     * 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
     */
    // crossorigin: undefined,

    /**
     * integrity
     * Type: boolean
     * Default: false
     *
     * 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
     * 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
     * 另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次。
     */
    // integrity: false,

    /**
     * configureWebpack
     * Type: Object | Function
     * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
     * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
     * 参考：https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
     */
    // configureWebpack: {},

    /**
     * chainWebpack
     * Type: Function
     * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
     * 参考：https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级
     */
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境下去除所有console
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.compress.drop_console = true;
                return args;
            });
        }

        // 直接加载SVG
        config.module
            .rule('vue')
            .use('vue-svg-inline-loader')
            .loader('vue-svg-inline-loader')
            .options({});

        return config;
    },

    css: {
        /**
         * requireModuleExtension
         * Type: boolean
         * Default: true
         *
         * 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
         */
        requireModuleExtension: true,

        /**
         * extract
         * Type: boolean | Object
         * Default: 生产环境下是 true，开发环境下是 false
         *
         * 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
         * 同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。
         * 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
         * 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
         */
        extract: process.env.NODE_ENV === 'production',

        /**
         * sourceMap
         * Type: boolean
         * Default: false
         *
         * 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
         */
        sourceMap: false,

        /**
         * loaderOptions
         * Type: Object
         * Default: {}
         *
         * 向 CSS 相关的 loader 传递选项。
         */
        loaderOptions: {
            css: {},
            scss: {},
            postcss: {}
        }
    },

    /**
     * devServer
     * Type: Object
     * 所有 webpack-dev-server 的选项都支持。注意：
     * 有些值像 host、port 和 https 可能会被命令行参数覆写。
     * 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。
     */
    devServer: {
        /**
         * 代理，参考 http-proxy-middleware：
         * https://github.com/chimurai/http-proxy-middleware#proxycontext-config
         */
        proxy: {
            '/api/': {
                target: 'https://solutions.test.shopee.cn',
                changeOrigin: true
            }
        },

        /**
         * ESLint错误时，显示遮罩层
         */
        overlay: {
            warnings: true,
            errors: true
        }
    },

    /**
     * parallel
     * Type: boolean
     * Default: require('os').cpus().length > 1
     *
     * 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
     */
    parallel: require('os').cpus().length > 1

    /**
     * pwa
     * Type: Object
     *
     * 向 PWA 插件传递选项。
     */
    // pwa: {}

    /**
     * pluginOptions
     * Type: Object
     *
     * 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
     */
    // pluginOptions: {}
};
