var http = require('http');
var mime = require('mime');
const CONF = require('./config.json');
import {url2path, readContent} from './methods'

export var Server = http.createServer(function(req, res){
    try {
        res.setHeader('Server', CONF.server_id);
        try {
            readContent(url2path(CONF.basedir, req.url))
                .then(function(content) {
                    res.setHeader('Content-Type', mime.lookup(url2path(CONF.basedir, req.url)));
                    res.end(content);
                })
                .fail(function(err){
                    res.statusCode = 500;
                    res.end('Error de lectura');
                });
        } catch(err){
            console.log(err);
            res.statusCode = 404;
            res.end('Not Found');
        }
    } catch(err) {
        console.log(err);
    }
});
