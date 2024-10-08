
const express = require('express');
const app = express();
require("dotenv").config();
require("./db")
const userRoute = require("./routes/userRoutes")
const betRoute = require("./routes/betRoutes")
const transactionRoute = require("./routes/transactionRoutes")
const gameRoute = require("./routes/gameRoutes")
const cors = require('cors');
app.use(cors()); 
app.use(express.json());
//routes 
app.use("/api/v1" , userRoute );
app.use("/api/v1" , betRoute );
app.use("/api/v1" , transactionRoute);
app.use("/api/v1" , gameRoute);



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// const userRoutes = require('./routes/users');

// app.use('/api/users', userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

