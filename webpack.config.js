const path = require('path');

module.exports = {
    entry: {
        'index': './src/index.js',
        'detail-room': './src/detail-room.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};