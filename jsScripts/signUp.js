const address = 'https://fast-food-fast-jes.herokuapp.com/api/v1/auth/signup';
const signUpForm = document.getElementById('sign-up-form');

const signUpFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.post-result');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const name = document.getElementById('sign-up-name').value.trim();
  const email = document.getElementById('sign-up-email').value.trim();
  const password = document.getElementById('sign-up-firts-pwd').value.trim();
  const password2 = document.getElementById('sign-up-sec-pwd').value.trim();

  if (name === '') {
    error += 'Your name is required <br />';
  } else if (name.length > 45) {
    error += 'Name provided is too long <br />';
  }

  if (email === '') {
    error += 'Your email address is required <br />';
  } else if (email.length > 45) {
    error += 'email address provided is too long <br />';
  }

  if (password === '') {
    error += 'Please choose a password<br />';
  } else if (password.length > 45) {
    error += 'Password provided is too long <br />';
  } else if (password.length < 5) {
    error += 'Password should be at least 5 characters <br />';
  }

  if (password2 === '') {
    error += 'Please confirm your password<br />';
  } else if (password !== password2) {
    error += 'Passwords do not match <br />';
  }

  if (error === '') {
    const user = {
      name,
      email,
      password,
    };
    loading.style.display = 'block';
    let success = false;
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        success = true;
      }
      return res.json();
    }).then((data) => {
      if (success) {
        resultDiv.innerHTML = 'Signup was sucessfull';
        resultDiv.classList.remove('error-div');
        resultDiv.classList.add('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
        window.localStorage.setItem('token', data.token);
        window.location = "https://jesse-efe.github.io/Fast-Food-Fast/UI/signed-in-menu.html";
      } else {
        resultDiv.innerHTML = data.message;
        resultDiv.classList.remove('success-div');
        resultDiv.classList.add('error-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
      }
    });
  } else {
    resultDiv.innerHTML = error;
    resultDiv.classList.remove('success-div');
    resultDiv.classList.add('error-div');
    resultDiv.style.display = 'block';
  }
};


signUpForm.onsubmit = signUpFormHandler;
