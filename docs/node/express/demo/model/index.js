var connection = require('./mysql')

function setUser(post , cb) {
    connection.connect()
    var query = connection.query('INSERT INTO user SET ?', post, function (error, results, fields) {
        if (error) cb(error);
        else cb()
    });

    connection.end()
}

exports.setUser = setUser