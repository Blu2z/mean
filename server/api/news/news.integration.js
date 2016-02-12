'use strict';

var app = require('../..');
import request from 'supertest';

var newThing;

describe('Thing API:', function() {

  describe('GET /api/news', function() {
    var news;

    beforeEach(function(done) {
      request(app)
        .get('/api/news')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          news = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      news.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/news', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/news')
        .send({
          name: 'New Thing',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      newThing.name.should.equal('New Thing');
      newThing.info.should.equal('This is the brand new thing!!!');
    });

  });

  describe('GET /api/news/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get('/api/news/' + newThing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      thing.name.should.equal('New Thing');
      thing.info.should.equal('This is the brand new thing!!!');
    });

  });

  describe('PUT /api/news/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put('/api/news/' + newThing._id)
        .send({
          name: 'Updated News',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated thing', function() {
      updatedThing.name.should.equal('Updated News');
      updatedThing.info.should.equal('This is the updated thing!!!');
    });

  });

  describe('DELETE /api/news/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/news/' + newThing._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete('/api/news/' + newThing._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
