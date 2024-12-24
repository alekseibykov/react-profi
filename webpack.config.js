const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode ?? "development",
        entry: './src/index.tsx',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: 'inline-source-map',
        devServer: {
            static: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', './index.html'),
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            runtimeChunk: 'single',
        },
    }
};
