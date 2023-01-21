const bcrypt = require('bcrypt');
const saltRounds = 10;
// const pass;


bcrypt.hash(pass, saltRounds, function(err, hash) {
    bcrypt.compare(pass, hash, function(err, result) {
        console.log(result);
    });
});

