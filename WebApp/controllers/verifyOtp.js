const bcrypt = require('bcrypt');
const saltRounds = 10;
const pass1 = '12456';
const pass2 = '12456';

bcrypt.hash(pass1, saltRounds, function(err, hash) {
    bcrypt.compare(pass2, hash, function(err, result) {
        console.log(result);
    });
});

