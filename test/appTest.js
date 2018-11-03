import chai from 'chai';
import chaiHttp from 'chai-http';
//import { getMaxListeners } from 'cluster';
import app from '../src/app';
import pool from '../src/db/config';
import seedDb from '../src/db/createTable';

seedDb();

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
        });
    });
  });
  // describe('/api/v1/orders/:id', () => {
  //   it('responds with status of 200', (done) => {
  //     chai.request(app)
  //       .get('/api/v1/orders/1')
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //         done();
  //       });
  //   });
  // });
  // describe('/api/v1/orders', () => {
  //   it('responds with status of 201', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/orders')
  //       .send({
  //         name: 'peter', food: 'yam', price: 4, quantity: 6,
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(201);
  //         done();
  //       });
  //   });
  // });
  // describe('resource was created', () => {
  //   it('responds with status of 200', (done) => {
  //     chai.request(app)
  //       .post('/api/v1/orders')
  //       .send({
  //         name: 'peter', food: 'yam', price: 4, quantity: 6,
  //       })
  //       .then(() => {
  //         chai.request(app)
  //           .get('/api/v1/orders/last')
  //           .end((err, res) => {
  //             expect(res).to.have.status(200);
  //             expect(res.body.customerName).to.equal('peter');
  //             expect(res.body.foodOrdered).to.equal('yam');
  //             expect(res.body.total).to.equal(24);
  //             done();
  //           });
  //       });
  //   });
  // });
  describe('/api/v1/orders/:id', () => {
    it('should delete the order', (done) => {
      chai.request(app)
        .delete('/api/v1/orders/:id')
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe('/api/v1/auth/signup', () => {
    it('name field should not be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: '  ',
          email: '',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in your name');
          done();
        });
    });

    it('email field should not be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: '  ',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in an email address');
          done();
        });
    });

    it('password field should not be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: 'bola@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please choose a password');
          done();
        });
    });

    it('should sign user up', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: 'maka@gmail.com',
          password: 'lolo',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('created successfully');
          done();
        });
    });
    
    it('should sign user up', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: 'maka@gmail.com',
          password: 'lolo',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('You are already a rigistered user please signin');
          done();
        });
    });
  });
  
  describe('/api/v1/auth/login', () => {
    it('email field should not be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '   ',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in an email address');
          done();
        });
    });

    it('password field should not be empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'boll@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in your password');
          done();
        });
    });

    it('should sign user in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ade@hjjsj.com',
          password: '111111',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('You are not a rigistered user please signup');
          done();
        });
    }).timeout(20000);
    
    it('should sign user in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'maka@gmail.com',
          password: 'lolo',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Welcome back bola you have signed in successfully');
          done();
        });
    }).timeout(20000);
  });
});
