const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: 'index_react.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
module.exports = config;