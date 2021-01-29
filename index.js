const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User }  = require('./models/User')


// application/x-www-form-urlencoded 으로 온 데이터 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose를 이용해서 mongodb와 application을 연결 
const mongoose = require('mongoose')
const { json } = require('body-parser')

// Add your connection string into your application code
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러방지
}).then((() => console.log('MongoDB connected...')))
  .catch((e) => console.log(e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 회원가입을 위한 라우터
app.post('/register', (req, res) => {

  // 회원가입 할 때 필요한 정보들을 client에서 가져오면 
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body)

  // 이 단계에서 userSchema 에서 암호화 이루어진다. 코드는 User 파일에 있음

  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {

   // 요청된 email을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "없는 이메일입니다."
      })
    }

    // 요청된 email이 password와 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

        // user를 위한 token 생성
        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err)

          // token을 저장한다. 어디 ? 쿠키, 로컬스토리지 ... 
            res.cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})