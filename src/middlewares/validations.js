import pool from '../db/config';

export const checkLoginData = (req, res, next) => {
  let { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'please fill in an email address' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: 'please fill in your password' });
  }
  email = email.trim();
  password = password.trim();

  if (email === '') {
    return res.status(400).json({ message: 'please fill in an email address' });
  }
  if (password === '') {
    return res.status(400).json({ message: 'please fill in your password' });
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ message: 'please fill in a valid email address' });
  }

  req.body.email = email;
  req.body.password = password;
  next();
};

export const checkSignupData = (req, res, next) => {
  let { name, email, password } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: 'please fill in your name' });
  }
  if (email === undefined) {
    return res.status(400).json({ message: 'please fill in your email address' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: 'please fill in your password' });
  }
  name = name.trim();
  email = email.trim();
  password = password.trim();
  if (name === '') {
    return res.status(400).json({ message: 'please fill in your name' });
  }
  if (email === '') {
    return res.status(400).json({ message: 'please fill in an email address' });
  }
  if (password === '') {
    return res.status(400).json({ message: 'please choose a password' });
  }
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return res.status(400).json({ message: 'please enter a correct name' });
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({ message: 'please fill in a valid email address' });
  }
  req.body.name = name;
  req.body.email = email;
  req.body.password = password;
  next();
};

export const checkOrderData = async (req, res, next) => {
  let { customer_id: customerId, menu_id: menuId, quantity: units } = req.body;
  if (customerId === undefined) {
    return res.status(400).json({ message: 'customer Id is not specified' });
  }
  if (menuId === undefined) {
    return res.status(400).json({ message: 'menu Id is not specified' });
  }
  if (units === undefined) {
    return res.status(400).json({ message: 'quantity is not specified' });
  }

  customerId = parseInt(customerId);
  menuId = parseInt(menuId);
  units = parseInt(units);

  if (isNaN(customerId)) {
    return res.status(400).json({ message: 'customer ID is not valid' });
  }
  if (isNaN(menuId)) {
    return res.status(400).json({ message: 'menu ID is not valid' });
  }
  if (isNaN(units)) {
    return res.status(400).json({ message: 'quantity is not valid' });
  }

  let query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [customerId],
  };
  try {
    const result = await pool.query(query);
    if (result.rowCount !== 1) {
      return res.status(400).json({ message: 'customer ID is not valid' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'there was an error...please try later' });
  }

  query = {
    text: 'SELECT * FROM menu WHERE id = $1',
    values: [menuId],
  };
  try {
    const result = await pool.query(query);
    if (result.rowCount !== 1) {
      return res.status(400).json({ message: 'menu ID is not valid' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'there was an error...please try later' });
  }

  req.body.customerId = customerId;
  req.body.menuId = menuId;
  req.body.units = units;
  next();
};

export const checkmenuData = (req, res, next) => {
  let {
    title, description, price, picture,
  } = req.body;

  if (title === undefined) {
    return res.status(400).json({ message: 'Item title is not specified' });
  }
  if (description === undefined) {
    return res.status(400).json({ message: 'Item description is not specified' });
  }
  if (price === undefined) {
    return res.status(400).json({ message: 'Item price is not specified' });
  }
  if (picture === undefined) {
    return res.status(400).json({ message: 'Item picture is not specified' });
  }

  title = title.trim();
  description = description.trim();
  picture = picture.trim();
  if (title === '') {
    return res.status(400).json({ message: 'Item title is not specified' });
  }
  if (description === '') {
    return res.status(400).json({ message: 'Item description is not specified' });
  }
  if (picture === '') {
    return res.status(400).json({ message: 'Item picture is not specified' });
  }

  price = parseInt(price.replace(/,/g, ''));

  if (isNaN(price)) {
    return res.status(400).json({ message: 'price is not valid' });
  }

  req.body.price = price;
  next();
};
