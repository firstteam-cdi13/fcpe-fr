var assert = require('assert');
describe('FCPE', function() {
/*    it('devrait avoir le bon title', function () {
        browser.url('http://localhost:5000/campagnes');
        var title = browser.getTitle();
        assert.equal(title, 'FcpeFr');
    });*/
    it('doit trouver la bonne campagne', function () {// Broken ajouter ident
        browser.url('http://localhost:5000');
        browser.element('#myNavbar').click('a*=Gestion des campagnes')
        browser.element('#myNavbar').click('a*=Rechercher une campagne')
        browser.element('.campagneNom').setValue('T1')
        browser.element('.rechCampagne').click('button*=Rechercher')
        var res = browser.element('.results tbody td:first-child').getText()
        assert.equal(res, 'Campagne T1 2ndeC 2017');
    });
});




