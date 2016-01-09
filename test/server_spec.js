import {expect} from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {Server} from '../server';
const CONF = require('../config.json');
chai.use(chaiHttp);

describe('Server', () =>{
    let baseUrl = 'http://localhost:' + CONF.port;
    before(() => {
        Server.listen(CONF.port);
    });
    it('Devuelve cabecera de Server', (done) => {
        chai.request(baseUrl).get('/').then((res) => {
            expect(res.header['server']).to.equal(CONF.server_id);
            done();
        }).catch((err) => {done(err)});
    });

    it('error si no GET', (done) => {
        chai.request(baseUrl).head('/').then((res) => {
            expect(res.statusCode).to.equal(501);
            done();
        }).catch((err) => {done(err)});
    });

    it('404 si el fichero no existe', (done) => {
        chai.request(baseUrl).get('/noexiste').then((res) => {
            expect(res.statusCode).to.equal(404);
            done();
        }).catch((err) => {done(err)});
    });

    it('maneja MIME text/html', (done) => {
        chai.request(baseUrl).get('/index.html').then((res) => {
            expect(res.header['content-type']).to.equal('text/html');
            done();
        }).catch((err) => {done(err)});
    });

    it('maneja MIME image/png', (done) => {
        chai.request(baseUrl).get('/apache-logo.png').then((res) => {
            expect(res.header['content-type']).to.equal('image/png');
            done();
        }).catch((err) => {done(err)});
    });

    after(() => {
        Server.close();
    });
});


