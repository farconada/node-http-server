import {Server, logger} from './server';
const CONF = require('./config.json');

Log4js.loadAppender('file');
logger.setLevel(Log4js.levels.ALL);
Log4js.addAppender(Log4js.appenders.file('server.log'));

Server.listen(CONF.port);