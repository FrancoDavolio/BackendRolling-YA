import mongoose from 'mongoose'

// const url = 'mongodb://localhost:27017/rolling-ya'
const url = 'mongodb+srv://rollingYa:rollingya@cluster0.nuzxsla.mongodb.net/rolling-ya'//usuarios

mongoose.connect(url)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('BD conectada')
})
