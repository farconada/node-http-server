const CONF = require('./config.json');

export function url2path(basedir, url, defaultFile) {
    var path = require('path');
    var fs = require('fs');
    var value = path.join(basedir, url);
    if (defaultFile == undefined)
        defaultFile = CONF.default_file;
    if (url[url.length -1] === '/')
        value = path.join(value + defaultFile);
    fs.lstatSync(value);
    return value;
}

export function readContent(path) {
    var fs = require('fs');
    var q = require('q');
    var defer = q.defer();
    fs.readFile(path, function(err, content) {
        if (err) {
            defer.reject(err);
        }
        defer.resolve(content);
    });
    return defer.promise;
}