// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time)).fromNow();