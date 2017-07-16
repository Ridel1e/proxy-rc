var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    watch: true,

    entry: {
        'proxy-rest-client': './src/proxy-rc.builder.js',
        'proxy-rest-client.min': './src/proxy-rc.builder.js'
    },
    output: {
        filename: '[name].js',
        library: 'createRCBuilder',
        libraryTarget: 'umd'
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({include: /\.min\.js$/})
    ]
};
