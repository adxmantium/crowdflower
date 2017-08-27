var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    },

    devtool: '#source-map', 

    module: {
        rules: [

            // resolve .css files using css-loader and style-loader modules
            {
                test: /\.scss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            // use babel-loader to resolve any js files
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',
            },

        ]
    },

    plugins: [],
}
