var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../fcpe-api/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Campagnes', function() {
    it('GET /api/campagnes/zxyz \n devrait renvoyer 404 URL NON VALIDE', function(done) {
    chai.request(server)
        .get('/api/campagnes/zxyz')
        .end(function(err, res){
        res.should.have.status(404)
/*        res.should.be.json
        res.body[0].should.have.property('msg',"URL non valide").and.to.be.a('string')*/
        done();
        });
    });
    it('GET /api/campagnes/listeNomCampagne \n devrait renvoyer json => nom:string', function(done) {
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
    it('GET /api/campagnes/listeCampagneFiltree \n devrait renvoyer json => id:int,nom:string,dateConseil:string,nomClasse:int,statutLib:string', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree')
        .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body[0].should.have.property('id').and.to.be.a('number')
        res.body[0].should.have.property('nom').and.to.be.a('string')
        res.body[0].should.have.property('dateConseil').and.to.be.a('string')
        res.body[0].should.have.property('nomClasse').and.to.be.a('number')
        res.body[0].should.have.property('statutLib').and.to.be.a('string')
        done();
        });
    });
    it('GET /api/campagnes/listeCampagneFiltree?nom=T1 \n devrait renvoyer les campagnes qui contiennent T1 dans leur nom', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree?nom=T1')
        .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body[0].should.have.property('nom','Campagne T1 2ndeC 2017').and.to.be.a('string')
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
    });
    it('GET /api/campagnes/listeCampagneFiltree?statut=1 \n devrait renvoyer : En cours', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree?statut=1')
        .end(function(err, res){
        res.body[0].should.have.property('statutLib','En cours').and.to.be.a('string')
        done();
        });
    });
    it('GET /api/campagnes/listeCampagneFiltree?statut=2 \n devrait renvoyer : Terminée', function(done) {
    chai.request(server)
        .get('/api/campagnes/listeCampagneFiltree?statut=2')
        .end(function(err, res){
        res.body[0].should.have.property('statutLib','Terminée').and.to.be.a('string')
        done();
        });
    });
/*    it('DELETE /api/campagnes/1', function(done) {
    chai.request(server)
        .delete('/api/campagnes/1')
        .end(function(err, res){
        res.should.have.status(200)
        res.body.should.have.property('msg','Suppression OK')
        done();
        });
    });*/
});