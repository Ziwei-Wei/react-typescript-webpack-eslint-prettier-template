const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const common = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "asset"),
        use: ["file-loader"],
      },
    ],
  },
};

const production = {
  ...common,
  mode: "production",
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: `${__dirname}/src/index.html`}),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

const development = {
  ...common,
  mode: "development",
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
    }),
  ],
  optimization: {
    moduleIds: "hashed",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};

module.exports = (_, argv) => {
  switch (argv.mode) {
    case "development":
      return development;
    case "production":
      return production;
    default:
      return development;
  }
};
