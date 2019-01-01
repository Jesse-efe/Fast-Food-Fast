import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import seedDb from '../src/db/createTable';

const { expect } = chai;
chai.use(chaiHttp);

// seedDb();

describe('App.js', () => {
  let loginToken;
  let adminToken;

  before(async () => {
    await seedDb();
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email@admin.com',
        password: 'adminpass',
      });
    adminToken = res.body.token;
  });

  describe('/api/v1/menu', () => {
    it('Item title should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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

    it('should sign in a registered user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'ade@hjjsj.com',
          password: '111111',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('You are not a rigistered user please signup');
          done();
        });
    });

    it('email and password should match', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'maka@gmail.com',
          password: 'bobo',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

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
          loginToken = res.body.token;
          done();
        });
    });
  });

  describe('/api/v1/orders', () => {
    it('should not place order for unauthorized user', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .send({
          menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

    it('customer ID should be specified to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('customer Id is not specified');
          done();
        });
    });

    it('customer ID should be valid to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: '  ', menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('customer ID is not valid');
          done();
        });
    });

    it('should not place order with another users id', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 57, menu_id: 35, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

    it('quantity should be specified to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 99, menu_id: 35,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('quantity is not specified');
          done();
        });
    });

    it('quantity should be valid to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 99, menu_id: 35, quantity: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('quantity is not valid');
          done();
        });
    });

    it('menu ID should be specified to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 99, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('menu Id is not specified');
          done();
        });
    });

    it('menu ID should be valid to place order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 99, menu_id: 'six', quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('menu ID is not valid');
          done();
        });
    });

    it('should sucessfully place an order', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .send({
          customer_id: 2, menu_id: 1, quantity: 5,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Thanks, we have received your order');
          done();
        });
    }).timeout(20000);

    it('should not get all orders for non admin user', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('Authorization', `bearer ${loginToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

    it('should get all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body[0].id).to.equal(1);
          expect(res.body[0].customer_id).to.equal(2);
          expect(res.body[0].menu_id).to.equal(1);
          expect(res.body[0].status).to.equal('New');
          expect(res.body[0].quantity).to.equal(5);
          done();
        });
    });

    it('should get an order with valid id', (done) => {
      chai.request(app)
        .get('/api/v1/orders/one')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Invalid order Id');
          done();
        });
    });

    it('should get an order with valid id', (done) => {
      chai.request(app)
        .get('/api/v1/orders/45')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Invalid order Id');
          done();
        });
    });

    it('should get an order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/1')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.id).to.equal(1);
          expect(res.body.customer_id).to.equal(2);
          expect(res.body.menu_id).to.equal(1);
          expect(res.body.status).to.equal('New');
          expect(res.body.quantity).to.equal(5);
          done();
        });
    });

    it('should update valid order ID', (done) => {
      chai.request(app)
        .put('/api/v1/orders/one')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          status: 'verifying',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid order Id');
          done();
        });
    });

    it('order status should be valid', (done) => {
      chai.request(app)
        .put('/api/v1/orders/45')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          status: 'verifying',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Invalid order Id');
          done();
        });
    });

    it('order status should be specified', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('order status not specified');
          done();
        });
    });

    it('order status should be valid', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          status: 'verifying',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid order status');
          done();
        });
    });

    it('should update order status', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          status: 'cancelled',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Order status updated sucessfully');
          done();
        });
    });

    it('order status should be updateable', (done) => {
      chai.request(app)
        .put('/api/v1/orders/1')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          status: 'cancelled',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Order status cannot be updated further');
          done();
        });
    });

    it('should not get orders of an authorised user', (done) => {
      chai.request(app)
        .get('/api/v1/users/one/orders/')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

    it('should get all orders of valid user', (done) => {
      chai.request(app)
        .get('/api/v1/users/one/orders/')
        .set('Authorization', `bearer ${loginToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid user Id');
          done();
        });
    });

    it('should not get orders of another user', (done) => {
      chai.request(app)
        .get('/api/v1/users/3/orders/')
        .set('Authorization', `bearer ${loginToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Auth failed');
          done();
        });
    });

    it('should get all orders of user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2/orders/')
        .set('Authorization', `bearer ${loginToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body[0].id).to.equal(1);
          expect(res.body[0].customer_id).to.equal(2);
          expect(res.body[0].menu_id).to.equal(1);
          expect(res.body[0].status).to.equal('cancelled');
          expect(res.body[0].quantity).to.equal(5);
          done();
        });
    });
  });
});
