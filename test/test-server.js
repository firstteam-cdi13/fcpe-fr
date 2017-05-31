var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../fcpe-api/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Routes', function() {
    it('GET /api/campagnes/zxyz \n devrait renvoyer 404 URL NON VALIDE', function(done) {
    chai.request(server)
        .get('/api/campagnes/zxyz')
        .end(function(err, res){
        res.should.have.status(404)
        done();
        });
    });
/*    it('GET /api/campagnes/listeNomCampagne \n devrait renvoyer status 200', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeNomCampagne')
        .end(function(err, res){
        res.should.have.status(200)
        done();
        });
    });
    it('GET /api/campagnes/listeCampagneFiltree \n devrait renvoyer status 200', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree')
        .end(function(err, res){
        res.should.have.status(200)
        done();
        });
    });*/
/*    it('GET /api/campagnes/listeCampagneFiltree \n devrait renvoyer json => nom:string', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeNomCampagne')
        .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body[0].should.have.property('nom').and.to.be.a('string')
        done();
        });
    });
    it('GET /api/campagnes/listeCampagneFiltree?statut=0 \n doit renvoyer : En préparation', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree?statut=0')
        .end(function(err, res){
        res.body[0].should.have.property('statutLib','En préparation').and.to.be.a('string')
        done();
        });
    });*/
});