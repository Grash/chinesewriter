const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: 'index_react.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new Dotenv()
    ]
};
module.exports = config;