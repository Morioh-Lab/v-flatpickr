module.exports = {
    "presets": [
      [
        "@babel/preset-env"      
      ]
    ],
    "plugins": [
    //   "lodash",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-modules-commonjs",  
      ["@babel/plugin-proposal-class-properties", { "loose": false }],
      ["@babel/plugin-syntax-dynamic-import"]
      
    ]
  }
  