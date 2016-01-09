var http = require('http');
var mime = require('mime');
import {sendError} from './responses';
const CONF = require('./config.json');
import {url2path, readContent} from './methods'
import Log4js from 'log4js';

export var logger = new Log4js.getLogger("Node HTTPd");

export var Server = http.createServer(function(req, res){
    try {
        res.setHeader('Server', CONF.server_id);
        try {
            logger.info('Request recibida ' + req.method + ' ' +req.url );
            if(req.method !== 'GET') {
                sendError(res, 501, 'No es un GET').end();
                logger.warn('Error 501: ' + 'No es un GET');
                return -1;
            }
            readContent(url2path(CONF.basedir, req.url))
                .then(function(content) {
                    res.setHeader('Content-Type', mime.lookup(url2path(CONF.basedir, req.url)));
                    res.end(content);
                    logger.info('Request resuelta ' + url2path(CONF.basedir, req.url) );
                })
                .fail(function(err){
                    logger.warn('Error 500: ' + err);
                    sendError(res, 500, 'Error de lectura').end();
                });
        } catch(err){
            sendError(res, 404, 'La ruta ' + req.url + ' no existe').end();
            logger.warn('Error 404: ' + 'La ruta ' + req.url + ' no existe');
        }
    } catch(err) {
        logger.error('Error 500: ' + err);
    }
});
