var expect = require('expect'),
    request = require('supertest');


/*
 * Define http test.
 */
describe('loading Express routes', function () {
  var server = null;

  beforeEach(function () {
    server = require('../src/app');
  });

  afterEach(function () {
    server.close();
  });

  it('responds with 200 on /', function (done) {
    request(server).get('/').expect(200).end(done);
  });

  it('responds with 200 on /ripee', function (done) {
    request(server).get('/pots').expect(200).end(done);
  });
});
