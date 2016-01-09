var mongoose = require('mongoose');
mongoose.connect('mongodb://ds039095.mongolab.com:39095/jibrjabr');
var db = mongoose.connection;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    //connected!
    console.log('Connected to MongoLab!');

    UserSchema = createUserSchema();
});

var createUserSchema = function() {
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        displayName: String
    });
    userSchema.pre('save', function(next) {
        var user = this;

        if(!user.isModified('password')) return next();

        // generate salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if(err) return next(err);

            // hash password with salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);

                // override plaintext pwd with hashed pwd
                user.password = hash;
                next();
            });
        });
    });
    userSchema.methods.checkPassword = function(password, cb) {
        var user = this;

        bcrypt.compare(password, user.password, function(err, success) {
            if (err) return cb(err, false);

            if(success) {
                var tempUser = angular.copy(user);
                delete tempUser.password;
                cb(null, true, user); // got password right, give them user obj
            } else {
                cb(null, false, null); // didn't get password right, don't give them the user
            }
        });
    };

    return mongoose.model('User', userSchema);
};

module.exports = {
    db: db,
    UserSchema: UserSchema
};
