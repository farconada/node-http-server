import {Server} from './server';

const CONF = require('./config.json');


Server.listen(CONF.port);