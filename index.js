import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { MongoClient } from 'mongodb'
import cors from 'cors'
const ObjectId = require('mongodb').ObjectId

//initialization
const app = express()

app.use(express.json())
app.use(cors())

//env config
dotenv.config()

//monogdb Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@noyonecommerce.qnayd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function run() {
  try {
    await client.connect()
    const database = client.db('volunteer')
    const usersCollection = database.collection('users')
    const volunteerEvent = database.collection('volunteerEvent')
    // GET API
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({})
      const users = await cursor.toArray()
      res.json(users)
    })

    // app.get('/users/:id', async (req, res) => {
    //   const id = req.params.id
    //   const query = { _id: ObjectId(id) }
    //   const user = await usersCollection.findOne(query)
    //   res.json(user)
    // })

    // // POST API
    // app.post('/users', async (req, res) => {
    //   const newUser = req.body
    //   const result = await usersCollection.insertOne(newUser)
    //   res.json(result)
    // })

    // //UPDATE API
    // app.put('/users/:id', async (req, res) => {
    //   const id = req.params.id
    //   const updatedUser = req.body
    //   const filter = { _id: ObjectId(id) }
    //   const options = { upsert: true }
    //   const updateDoc = {
    //     $set: {
    //       name: updatedUser.name,
    //       email: updatedUser.email,
    //       password: updatedUser.password,
    //       isAdmin: updatedUser.isAdmin,
    //     },
    //   }
    //   const result = await usersCollection.updateOne(filter, updateDoc, options)
    //   res.json(result)
    // })

    // // DELETE API
    // app.delete('/users/:id', async (req, res) => {
    //   const id = req.params.id
    //   const query = { _id: ObjectId(id) }
    //   const result = await usersCollection.deleteOne(query)

    //   console.log('deleting user with id ', result)

    //   res.json(result)
    // })
  } finally {
    // await client.close();
  }
}

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Running my CRUD Server')
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
)
