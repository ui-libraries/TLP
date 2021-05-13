const path = require("path")

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        publicPath: '/dist/',
        filename: "bundle.js"
      },
    module: {
        
    },
    resolve: {
        
    },
    node: {
        fs: "empty"
    }
};