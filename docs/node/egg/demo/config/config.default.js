// config/config.default.js
exports.keys = 'qifeng';

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};




// config/config.default.js
// add middleware robot
exports.middleware = [
    'robot'
];
// robot's configurations
exports.robot = {
    ua: [
        /Baiduspider/i,
    ]
};