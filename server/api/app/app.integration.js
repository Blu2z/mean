'use strict';

var app = require('../..');
import request from 'supertest';

var newAdmin;

describe('Admin API:', function() {

  describe('GET /api/admin', function() {
    var admin;

    beforeEach(function(done) {
      request(app)
        .get('/api/admin')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          admin = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      admin.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/admin', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/admin')
        .send({
          name: 'New Admin',
          info: 'This is the brand new Admin!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAdmin = res.body;
          done();
        });
    });

    it('should respond with the newly created Admin', function() {
      newAdmin.name.should.equal('New Admin');
      newAdmin.info.should.equal('This is the brand new Admin!!!');
    });

  });

  describe('GET /api/admin/:id', function() {
    var Admin;

    beforeEach(function(done) {
      request(app)
        .get('/api/admin/' + newAdmin._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Admin = res.body;
          done();
        });
    });

    afterEach(function() {
      Admin = {};
    });

    it('should respond with the requested Admin', function() {
      Admin.name.should.equal('New Admin');
      Admin.info.should.equal('This is the brand new Admin!!!');
    });

  });

  describe('PUT /api/admin/:id', function() {
    var updatedAdmin;

    beforeEach(function(done) {
      request(app)
        .put('/api/admin/' + newAdmin._id)
        .send({
          name: 'Updated admin',
          info: 'This is the updated Admin!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAdmin = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdmin = {};
    });

    it('should respond with the updated Admin', function() {
      updatedAdmin.name.should.equal('Updated admin');
      updatedAdmin.info.should.equal('This is the updated Admin!!!');
    });

  });

  describe('DELETE /api/admin/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/admin/' + newAdmin._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Admin does not exist', function(done) {
      request(app)
        .delete('/api/admin/' + newAdmin._id)
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
