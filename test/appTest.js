import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import seedDb from '../src/db/createTable';

seedDb();

const { expect } = chai;
chai.use(chaiHttp);

describe('App.js', () => {
  
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

  describe('/api/v1/menu', () => {
    it('Item title should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          description: '',
          price: '',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item title is not specified');
          done();
        });
    });

    it('Item title should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: '',
          description: '',
          price: '',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item title is not specified');
          done();
        });
    });

    it('Item description should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: '',
          price: '',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item description is not specified');
          done();
        });
    });

    it('Item description should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: '',
          price: '',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item description is not specified');
          done();
        });
    });

    it('Item price should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: 'This is the sweetest fish on earth',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item price is not specified');
          done();
        });
    });

    it('Item picture should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: 'This is the sweetest fish on earth',
          price: '10000',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item picture is not specified');
          done();
        });
    });

    it('Item picture should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: 'This is the sweetest fish on earth',
          price: '10000',
          picture: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Item picture is not specified');
          done();
        });
    });

    it('Item price should be numeric', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: 'This is the sweetest fish on earth',
          price: 'Ten thousand',
          picture: 'fish.jpg',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('price is not valid');
          done();
        });
    });

    it('Item should be added to menu', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .send({
          title: 'Fried fish',
          description: 'This is the sweetest fish on earth',
          price: '10,000',
          picture: 'fish.jpg',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Item was sucessfully added to the menu');
          done();
        });
    });

    it('should get the menu', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body[0].food).to.equal('Fried fish');
          expect(res.body[0].description).to.equal('This is the sweetest fish on earth');
          expect(res.body[0].price).to.equal('10000');
          expect(res.body[0].picture).to.equal('fish.jpg');
          done();
        });
    });
  });

  describe('/api/v1/auth/signup', () => {
    it('name should be sent along', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
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

    it('name should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: ' okey123 dimkpa ',
          email: 'ghhhhgf',
          password: 'hsghgfj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please enter a correct name');
          done();
        });
    });

    it('email should be sent along', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          password: 'jhjm',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in your email address');
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

    it('email should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: ' bolaji.com ',
          password: 'hjkjffgh',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in a valid email address');
          done();
        });
    });

    it('password should be sent along', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'bola',
          email: 'bola@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in your password');
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
    it('email should be sent along', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          password: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in an email address');
          done();
        });
    });

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

    it('email should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: ' @busola.com  ',
          password: 'dfdgfh',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in a valid email address');
          done();
        });
    });

    it('password should be sent along', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'boll@gmail.com',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('please fill in your password');
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

  describe('/api/v1/orders', () => {
    it('customer ID should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('customer Id is not specified');
          done();
        });
    });

    it('customer ID should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: '  ', menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('customer ID is not valid');
          done();
        });
    });

    it('quantity should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: 99, menu_id: 35,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('quantity is not specified');
          done();
        });
    });
    
    it('quantity should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: 99, menu_id: 35, quantity: '',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('quantity is not valid');
          done();
        });
    });

    it('menu ID should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: 99, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('menu Id is not specified');
          done();
        });
    });

    it('menu ID should be specified', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: 99, menu_id: 'six', quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('menu ID is not valid');
          done();
        });
    });

    it('should sucessfully place an order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          customer_id: 1, menu_id: 1, quantity: 5,
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Thanks, we have received your order');
          done();
        });
    }).timeout(20000);

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

});
