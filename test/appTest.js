import { chai } from 'chai';
import { chaiHttp } from 'chai-http';
import { app } from '../app.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('App.js', () => {
    describe('/api/v1/orders', () => {
        it('responds with status of 200', (done) => {
            chai.request(app)
            .get('/api/v1/orders')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
    })
    describe('/api/v1/orders/:id', () => {
        it('responds with status of 200', (done) => {
            chai.request(app)
            .get('/api/v1/orders/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            })
        })
    })
    describe('/api/v1/orders', () => {
        it('responds with status of 201', (done) => {
            chai.request(app)
            .post('/api/v1/orders')
            .send({name: 'peter', food: 'yam', price: 4, quantity: 6})
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            })
        })
    })
    describe('resource was created', () => {
        it('responds with status of 200', (done) => {
            chai.request(app)
            .post('/api/v1/orders')
            .send({name: 'peter', food: 'yam', price: 4, quantity: 6})
            .then(() => {
              chai.request(app)
                .get('/api/v1/orders/last')
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.customerName).to.equal('peter');
                  expect(res.body.foodOrdered).to.equal('yam');
                  expect(res.body.total).to.equal(24);
                  done();
                })
            })
        })
    })
    describe('/api/v1/orders/:id', () => {
        it('should delete the order', (done) => {
            chai.request(app)
            .delete('/api/v1/orders/:id')
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            })
        })
    })
})