const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: { loader: 'html-loader' },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new HardSourceWebpackPlugin(),
        // required because of https://github.com/babel/babel/issues/7640
        new IgnoreNotFoundExportPlugin([
            'CallbackSideEffect',
            'NotificationSideEffect',
            'RedirectionSideEffect',
            'RefreshSideEffect',
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json'],
        alias: {
            'ra-core': path.join(
                __dirname,
                '..',
                'packages',
                'ra-core',
                'src'
            ),
        },
    },
    devServer: {
        stats: {
            children: false,
            chunks: false,
            modules: false,
        },
    },
};
