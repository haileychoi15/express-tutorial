const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const config = require('./server/config/key')
const { auth } = require('./server/middleware/auth')
const { User } = require('./server/models/User')
const { Article } = require('./server/models/Article')

// application/x-www-form-urlencoded 으로 온 데이터 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// mongoose를 이용해서 mongodb와 application을 연결 
const mongoose = require('mongoose')
const { json } = require('body-parser')

// Add your connection string into your application code

const contectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true, 
      useFindAndModify: false // 에러방지
    });
    console.log(`MongoDB Connected to ${conn.connection.host}`.cyan.underline.bold);

  } catch(err) {
    console.log(`Error : ${err.message}`.red);
  }
}

contectDB();

// ================== ARTICLE ====================

const throwServerError = (res) => {
    res.status(500).json({
      success: false,
      error: "Server error"
    })
}

app.delete('/api/articles/:id', (req, res) => {

  Article.findById(req.params.id, (err, article) => {

    if(err) return throwServerError(res);

    if(!article) {
      return res.status(404).json({
        success: false,
        message: "No article found."
      })
    }
    
    article.remove();

    return res.status(200).json({
      success: true,
      data: {}
    })
  });
})

app.get('/api/articles', (req, res) => {

  Article.find((err, doc) => {
    
    if(err) return throwServerError(res);

    return res.status(200).json({
      success: true,
      count: doc.length,
      data: doc
    })
  });

})

app.post('/api/articles', (req, res) => {

  const article = new Article(req.body);

  article.save((err, doc) => {
    
if(err) return throwServerError(res);

    return res.status(200).json({
      success: true,
      count: doc.length,
      data: doc
    })
  })

})


// ================== USER ====================

// 회원가입을 위한 라우터
app.post('/api/users/register', (req, res) => {

  // 회원가입 할 때 필요한 정보들을 client에서 가져오면 
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  // 이 단계에서 userSchema 에서 암호화 이루어진다. 코드는 User 파일에 있음

  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      registerSuccess: true
    })
  })
})

app.post('/api/users/login', (req, res) => {

   // 요청된 email을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "No email found"
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
            .json({ 
              loginSuccess: true, 
              user: {
                _id: user._id,
              }
            })
        })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과했다는 것은 auth가 true라는 뜻
  var user = req.user;

  // 어떤 페이지던지 유저 정보 이용 가능  
  res.status(200).json({ 
    authSuccess: true,
    user: {
      _id: user._id,
      isAdmin: user.role === 0 ? false : true,
      isAuth: true,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
      image: user.image
    }
   })
})

app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).send({
      logoutSuccess: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})