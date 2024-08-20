
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin','react-native-paper/babel'],
  // env: {
  //   production: {
  //     plugins: ['react-native-paper/babel'],
  //   },
  // },
  overrides: [
    {
      test: './node_modules/ethers',
      plugins: [
        ["@babel/plugin-transform-private-methods", { "loose": true }]
      ]
    }
  ]
  };

