var assert = require('assert');
describe('FCPE', function() {
/*    it('devrait avoir le bon title', function () {
        browser.url('http://localhost:5000/campagnes');
        var title = browser.getTitle();
        assert.equal(title, 'FcpeFr');
    });*/
    it('doit trouver la bonne campagne', function () {
        browser.url('http://localhost:5000');
        browser.element('#myNavbar').click('a*=Gestion des campagnes')
        browser.element('#myNavbar').click('a*=Rechercher une campagne')
        browser.element('.campagneNom').setValue('T1')
        browser.element('.rechCampagne').click('button*=Rechercher')
        var res = browser.element('.results tbody td:first-child').getText()
        assert.equal(res, 'Campagne T1 2ndeC 2017');
    });
});


/*const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.navigate().to('http://localhost:5000/')
    .then(() => driver.findElement(By.css('title')))
    .then(element => element.getAttribute('value'))
    .then(value => console.log(value));*/


