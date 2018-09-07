'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');

var expect = chai.expect;
chai.use(chaiHttp);

describe('App.js', function () {
    describe('/api/v1/orders', function () {
        it('responds with status of 200', function (done) {
            chai.request(app).get('/api/v1/orders').end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
        });
    });
    describe('/api/v1/orders/:id', function () {
        it('responds with status of 200', function (done) {
            chai.request(app).get('/api/v1/orders/1').end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
        });
    });
    describe('/api/v1/orders', function () {
        it('responds with status of 201', function (done) {
            chai.request(app).post('/api/v1/orders').send({ name: 'peter', food: 'yam', price: 4, quantity: 6 }).end(function (err, res) {
                expect(res).to.have.status(201);
                done();
            });
        });
    });
    describe('resource was created', function () {
        it('responds with status of 200', function (done) {
            chai.request(app).post('/api/v1/orders').send({ name: 'peter', food: 'yam', price: 4, quantity: 6 }).then(function () {
                chai.request(app).get('/api/v1/orders/last').end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.customerName).to.equal('peter');
                    expect(res.body.foodOrdered).to.equal('yam');
                    expect(res.body.total).to.equal(24);
                    done();
                });
            });
        });
    });
    describe('/api/v1/orders/:id', function () {
        it('should delete the order', function (done) {
            chai.request(app).delete('/api/v1/orders/:id').end(function (err, res) {
                expect(res).to.have.status(204);
                done();
            });
        });
    });
});