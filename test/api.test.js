const kk_api = require('../src/api.js');
const assert = require('assert');
const sinon = require('sinon');
const winston = require('winston');
const rp = require('request-promise-native');
const fake_data = require('./api-example-data');

// Disable logging for tests
winston.remove(winston.transports.Console);

describe('api', () => {
  describe('#weather()', () => {
    beforeEach(() => {
      // Stub rp.get(...)
      this.requestStub = sinon.stub(rp, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      this.requestStub.resolves(fake_data.example_weather_data);

      kk_api.weather();

      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/weather'}));
    });

    it('should resolve on success', (done) => {
      this.requestStub.resolves(fake_data.example_weather_data);

      kk_api.weather()
        .then(() => {
          assert(true);
          done();
        })
        .catch(() => {
          assert(false)
          done();
        });
    });

    it('should reject on error', (done) => {
      this.requestStub.rejects();

      kk_api.weather()
        .then(() => {
          assert(false);
          done();
        })
        .catch(() => {
          assert(true);
          done();
        });
    });

    it('should return correct data', (done) => {
      this.requestStub.resolves(fake_data.example_weather_data);

      kk_api.weather()
        .then((weather_conditions) => {
          assert(weather_conditions.temperature !== undefined);
          done();
        });
    });
  });

  describe('#rain()', () => {
    beforeEach(() => {
      // Stub rp.get(...)
      this.requestStub = sinon.stub(rp, 'get');
    });

    afterEach(() => {
      this.requestStub.restore();
    });

    it('should call correct url', () => {
      this.requestStub.resolves(fake_data.example_rain_data);

      kk_api.rain();

      assert(this.requestStub.calledWithMatch({url: 'http://komakallio.dy.fi:9001/rain'}));
    });

    it('should resolve on success', (done) => {
      this.requestStub.resolves(fake_data.example_rain_data);

      kk_api.rain()
        .then(() => {
          assert(true);
          done();
        })
        .catch(() => {
          assert(false)
          done();
        });
    });

    it('should reject on error', (done) => {
      this.requestStub.rejects();

      kk_api.rain()
        .then(() => {
          assert(false);
          done();
        })
        .catch(() => {
          assert(true);
          done();
        });
    });

    it('should return correct data', (done) => {
      this.requestStub.resolves(fake_data.example_rain_data);

      kk_api.rain()
        .then((rain_conditions) => {
          assert(rain_conditions.rain !== undefined);
          done();
        });
    });
  });
});