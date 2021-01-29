const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) { // 비밀번호 변경시에만 수행

        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) { // hash가 암호화된 비밀번호
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash;
                next()
            });
        });
    }
    else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {

    // plainPassword와 암호화된 비밀번호를 비교할 때, plainPassword를 암호화해서 비교
    // 암호화된 비밀번호는 복구할 수 없기 때문
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err)
        callback(null, isMatch) // 동일하면 err는 없고(null) isMatch는 true 반환
    })
}

userSchema.methods.generateToken = function(callback) {

    var user = this;

    // jsonwebtoken을 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
    user.token = token
    user.save(function(err, user) {
        if(err) return callback(err)
        callback(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }