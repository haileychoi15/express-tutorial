const express = require('express')
const app = express()
const port = 3000


// mongoose를 이용해서 mongodb와 application을 연결 
const mongoose = require('mongoose')
// Add your connection string into your application code
mongoose.connect('mongodb+srv://haileychoi:qlqj0301@express-tutorial.cmvmt.mongodb.net/express-tutorial?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러방지
}).then((() => console.log('MongoDB connected...')))
  .catch((e) => console.log(e))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})