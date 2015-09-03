var signalk = require('signalk-client');

var chai = require("chai");
chai.Should();
chai.use(require('signalk-schema').chaiModule);
//chai.use(require('chai-things'));



describe('Server is Signal K v1 compliant', function () {
  var path = '/signalk';
  it(path, function () {
    return createClient().get('/signalk').then(function(parsedResponse) {
      parsedResponse.should.have.deep.property('endpoints.v1.version');
      parsedResponse.should.have.deep.property('endpoints.v1.signalk-http');
      parsedResponse.should.have.deep.property('endpoints.v1.signalk-ws');
    });
  });

  var apipath = path + '/v1/api';
  it(apipath, function () {
    return createClient().get(apipath).then(function(parsedResponse) {
      parsedResponse.should.be.validFullSignalK;
    })
  });

  var selfPath = apipath + "/vessels/self/";
  it(selfPath, function () {
    return createClient().get(selfPath).then(function(parsedResponse) {
      ({
        'vessels': {
          '230099999': parsedResponse
        }
      }).should.be.validFullSignalK;
    })
  });

  sogPath = selfPath + "/navigation/speedOverGround";
  it(sogPath, function () {
    return createClient().get(sogPath).then(function(parsedResponse) {
      ({
        'vessels': {
          '230099999' : {
            'navigation': {
              'speedOverGround': parsedResponse
            }
          }
        }
      }).should.be.validFullSignalK;
    })
  });

});

function createClient() {
  return new signalk.Client('localhost', 3000);
}
