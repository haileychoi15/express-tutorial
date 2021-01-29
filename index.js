const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User }  = require('./models/User')


// application/x-www-form-urlencoded 으로 온 데이터 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json())

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
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})