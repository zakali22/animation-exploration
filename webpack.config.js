const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/assets/js/index.js")
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        static: './dist',
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            { 
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"] // Evaluated from right to left
            },
            { 
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            { test: /\.html$/, loader: 'html-loader' } // For html pages
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ // For each create a new HtmlWebpackPlugin
            title: "Webpack Output",
            filename: 'index.html',
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: "Webpack Output",
            filename: './src/pages/svg-filters/svg-distortion.html',
            template: './src/pages/svg-filters/svg-distortion.html'
        }),
        new CleanWebpackPlugin()
    ],
};