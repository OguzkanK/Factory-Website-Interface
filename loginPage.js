const mainLogin = document.getElementById('login-select');
const musteriLogin = document.getElementById('musteri-login');
const musteriLoginBtn = document.getElementById('musteri-login-btn');
const personelLogin = document.getElementById('personel-login');
const personelLoginBtn = document.getElementById('personel-login-btn');

musteriLoginBtn.addEventListener('click', function () {
  mainLogin.classList.toggle('grid-container');
  mainLogin.classList.toggle('grid-hide');
  musteriLogin.classList.toggle('grid-container');
  musteriLogin.classList.toggle('grid-hide');
});
personelLoginBtn.addEventListener('click', function () {
  mainLogin.classList.toggle('grid-container');
  mainLogin.classList.toggle('grid-hide');
  personelLogin.classList.toggle('grid-container');
  personelLogin.classList.toggle('grid-hide');
});

const backToSelection = function (target) {
  mainLogin.classList.toggle('grid-container');
  mainLogin.classList.toggle('grid-hide');
  document.getElementById(target).classList.toggle('grid-container');
  document.getElementById(target).classList.toggle('grid-hide');
};

const Get = function () {
  let xhttpGet = new XMLHttpRequest();
  xhttpGet.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const { password, name, id } = JSON.parse(this.responseText)[0];
      console.log(name);
    }
  };
  xhttpGet.open('GET', 'http://localhost:8080/GET/', true);
  xhttpGet.send();
};

const login = function (name, password, occupation) {
  let targetJson = `[{name: ${name}}]`;
  let xhttpPost = new XMLHttpRequest();
  xhttpPost.open('POST', `http://localhost:8080/POST/${occupation}`, true);
  xhttpPost.setRequestHeader('Content-Type', 'application/json');
  xhttpPost.send(targetJson);
  xhttpPost.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      if (this.responseText === 'empty') {
        console.log('error');
        return;
      }
      const { password: passwordCheck } = JSON.parse(this.responseText);
      if (password === passwordCheck) console.log('welcome');
      else console.log('wrong');
    }
  };
};
