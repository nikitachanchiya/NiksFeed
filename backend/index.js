require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// 1. Initialize DB Connection
global.foodData = require('./db')(function call(err, data, CatData) {
  if (err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

// 2. Allow requests from React frontend (CORS fix)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 3. Define routes
app.get('/', (req, res) => {
  res.send('NiksFeed Backend Running');
});

// Match endpoints used by frontend (foodData and createuser)
app.use('/api/auth', require('./Routes/Auth'));


app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});