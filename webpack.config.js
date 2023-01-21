const HtmlWebpackPlugin = require("html-webpack-plugin");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/assets/js/index.js")
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    node: {
        __dirname: "mock"
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
            { test: /\.svg$/, type: "asset" },
            { test: /\.html$/, loader: 'html-loader' }, // For html pages,
            { test: /\.handlebars$/, loader: "handlebars-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ // For each create a new HtmlWebpackPlugin
            title: "Webpack Output",
            filename: 'index.html',
            template: 'index.html'
        }),
        new HandlebarsPlugin({
            // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
            entry: path.join(process.cwd(), "handlebars", "*.hbs"),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "[name].html"),
            // you can also add a [path] variable, which will emit the files with their relative path, like
            // output: path.join(process.cwd(), "build", [path], "[name].html"),

            // globbed path to partials, where folder/filename is unique
            partials: [
                path.join(process.cwd(), "handlebars", "partials", "**", "*.hbs")
            ],
        }),
        new CleanWebpackPlugin()
    ],
};