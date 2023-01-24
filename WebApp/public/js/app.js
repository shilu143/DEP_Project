// const mongoose = import('mongoose');

var studentModel = require('../../models/studentModel.js');

const data = document.cookie;
console.log(data);
console.log("Checking");
const info = document.querySelectorAll('.info');

const h2 = document.createElement('h2');
h2.innerText = data;

document.body.append(h2);



