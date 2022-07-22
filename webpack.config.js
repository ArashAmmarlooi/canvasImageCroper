var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const devMode = process.env.NODE_ENV === "production"; // Adding development mode vs production mode option

// option for produce manifest file and the path
const options = { 
  "dist/manifest.js": "dist/manifest.1234567890.js",
};

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? "bundle.js" : "bundle.[contenthash].js", // if is devMode just bundle if not hash bundle
  },
  devServer: {
    stats: { colors: true },
    hot: true,
    historyApiFallback: true, // Handle history api when routes changed . 
    open: true,
    port: 8090,
    contentBase: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"], // Adding jsx extesion 
  },
  module: {
    rules: [
        {
            test: /\.(jsx|js)$/, // For handiling js and jsx files 
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    ["@babel/preset-env", { targets: "defaults" }],
                    "@babel/preset-react", // babel loader react preset 
                  ],
                  plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-proposal-optional-chaining",
                    "@babel/plugin-proposal-nullish-coalescing-operator",
                  ],
                },
              },
            ],
          },
      {
        test: /\.(sa|sc|c)ss$/, // For handling sass files 
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader, // If dev mode style-loder will be in charge if not MiniCssExtarct
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              modules: {
                localIdentName: "[local]-[hash:base64:5]", // Make local hash classes in css budnle bundle 
              },
            },
          },
          // "postcss-loader", // if we wantd use post css options and make application reliable for the browsers . 
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, // For handling all file types .
        loader: "file-loader",
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          noquotes: true,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[hash].css",
      linkType: "text/css",
      experimentalUseImportModule: true,
    }),
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./app/index.html",
    }),
    new CleanWebpackPlugin(), // clean web pack build folder . 
    new WebpackManifestPlugin(options), // Make Manifest file and info in dist folder with option parameters . 
  ],
};
