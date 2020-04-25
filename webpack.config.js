module.exports = {
  module: {
    rules: [
      {
        test: /\.(json|scss$)/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
