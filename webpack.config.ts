import {resolve as _resolve} from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

export default (env: { mode: any; }) => {
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
            port: 3000,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: _resolve(__dirname, 'public', './index.html'),
            }),
        ],
        output: {
            filename: '[name].[contenthash].js',
            path: _resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            runtimeChunk: 'single',
        },
    }
};
