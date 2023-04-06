// Learn more https://docs.expo.io/guides/customizing-metro
// 1st trial
// const { getDefaultConfig } = require('expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname).resolver.assetExts.push("cjs");
// module.exports = defaultConfig;

// 2nd trial
// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'] //add here
//     },
// };  

// 3rd trial
// NOTE: No longer necessary in @apollo/client@3.6.4!
const { getDefaultConfig } = require('expo/metro-config');
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
exports.resolver = {
  ...defaultResolver,
  sourceExts: [...defaultResolver.sourceExts, "cjs"],
};