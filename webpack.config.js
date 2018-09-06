module.exports = {
    entry: './app/init.ts',
    output: {
        filename: 'dist/bundle.js',
        path: __dirname,
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json',
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js/,
                loaders: ['babel-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader'
                    },
                    esModule: true
                }
            },
            {
                test: /\.css/,
                loaders: ['css-loader']
            }
        ]
    },
    devServer: {
        compress: true,
        port: 8001
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map'
};