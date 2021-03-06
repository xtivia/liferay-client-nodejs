'use strict';
var chai = require('chai');
/*global describe: true, it: true, before: false, after: false*/

describe('Test build of services using Xtivia\'s Liferay Demo server',function() {
    describe('Discover and generate liferay services',function() {
       it('should pass if server is available and mobile demo service is deployed to liferay demo server',function(done) {
           this.timeout(60000); // Just in case slow access to server
           require('../../index.js')({server:'http://liferaydemo.xtivia.com'}).then(function(connection){
               chai.assert.isNotNull(connection);
               var addressService = connection.require('LiferayAddressService');
               chai.assert.isNotNull(addressService);
               require('../../index.js')({server:'http://liferaydemo.xtivia.com',contexts:{'mobile-demo-integration-portlet':'MobileDemo'}}).then(function(connection){
                   chai.assert.isNotNull(connection);
                   var addressService = connection.require('LiferayAddressService');
                   chai.assert.isNotNull(addressService);
                   var guestService = connection.require('MobileDemoGuestmobileviewService');
                   chai.assert.isNotNull(guestService);
                   done();
               },function(err) {
                   throw err;
               });
           },function(err) {
               throw err;
           });
       });
    });
});