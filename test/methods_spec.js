import {expect} from 'chai';
import {url2path, readContent} from '../methods';


const CONF = require('../config.json');

describe('lee ficheros', () => {
    describe('URL -> path', () => {
        let base = './dist/';
        let defaultFile = 'index.html';

        it('de una url devuelve un path', () => {
            let url = '/index.html';
            expect(url2path(base, url, defaultFile)).to.equal('dist/index.html');
        });

        it('si el path termina en / añade ' + CONF.default_file, () => {
            let url = '/';
            expect(url2path(base, url, defaultFile)).to.equal('dist/' + CONF.default_file);
        });

        it('si el fichero no existe lanza una excepcion', () => {
            let url = 'algo/blas/';
            expect(() => {url2path(base, url, defaultFile)}).to.throw(Error);
        });
    });

    describe('contenido del fichero', () => {
        let fichero = 'dist/index.html';
        it('Resuelve el contenido del fichero', (done) =>{
            readContent(fichero).then((content) => {
                expect(content.toString()).to.equal("<body>\n<h1>test</h1>\n</body>");
                done();
            })
            .fail((err) => {
                done(err);
            });
        })
    });
});