const path = require('path');
// const srcPath = path.resolve(__dirname, './src');

// module.exports = {
//   resolvers: [
//     {
//       alias(id) {
//         if (id.startsWith('@/')) {
//           return path.join(srcPath, id.slice(2));
//         }
//       },
//     },
//   ],
// };

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src'),
  },
};
