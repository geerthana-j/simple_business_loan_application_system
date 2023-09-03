const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

const mongoUri = "mongodb+srv://geerthikumar:f3rk02JZjpHfJ3z4@cluster0.3o1mx9f.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    const db = mongoClient.db('DemystData');
    return db;
  } catch (error) {
    throw error;
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const userRegData = req.body;
    console.log(userRegData);
    const { userName, password, firstName, lastName, emailAddress, phoneNumber, confirmPassword } = userRegData;
    if (firstName && lastName && emailAddress && phoneNumber && userName && password) {
      if (confirmPassword !== password) {
        return res.status(400).json({ "message": "Passwords are not matching" });
      } else {
        const db = await connectToDatabase();
        const userData = await db.collection('users').findOne({ phoneNumber: phoneNumber });
        if (!userData) {
          await db.collection('users').insertOne(userRegData);
          return res.status(200).json({ "message": "User is registered successfully" });
        } else {
          return res.status(200).json({ "message": "User is already registered" });
        }
      }
    }
    else {
      return res.status(400).json({ "message": "Please provide all required details" });
    }
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const userLoginData = req.body;
    const { phoneNumber, password } = userLoginData;
    if (phoneNumber && password) {
      const db = await connectToDatabase();
      const userData = await db.collection('users').findOne({ phoneNumber: phoneNumber });
      if (!userData) {
        return res.status(200).json({ "message": "User is not registered" });
      } else if (userData.password !== password) {
        return res.status(400).json({ "message": "Incorrect password" });
      } else {
        return res.status(200).json({ "message": "User is logged in successfully" });
      }
    } else {
      return res.status(400).json({ "message": "Please provide all required details" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
});

function fetchBalanceSheet(businessName, place, establishmentYear) {
  const sheet = [
    {
      "year": 2020,
      "month": 12,
      "profitOrLoss": 250000,
      "assetsValue": 1234
    },
    {
      "year": 2020,
      "month": 11,
      "profitOrLoss": 1150,
      "assetsValue": 5789
    },
    {
      "year": 2020,
      "month": 10,
      "profitOrLoss": 2500,
      "assetsValue": 22345
    },
    {
      "year": 2020,
      "month": 9,
      "profitOrLoss": -187000,
      "assetsValue": 223452
    }
  ];
  return sheet;
}

function calculatePreAssessment(sheet, loanAmount) {
  if (!Array.isArray(sheet) || sheet.length < 12) {
    return 20;
  }
  let totalProfit = 0;
  let totalAssets = 0;
  for (let i = 0; i < 12; i++) {
    totalProfit += sheet[i].profitOrLoss;
    totalAssets += sheet[i].assetsValue;
  }
  if (totalProfit > 0) {
    const averageAssets = totalAssets / 12;
    if (averageAssets > loanAmount) {
      return 100;
    } else {
      return 60;
    }
  }
  else {
    return 20;
  }
}

app.post('/api/fetchBalanceSheet', async (req, res) => {
  try {
    const businessData = req.body;
    const { businessName, place, establishmentYear, loanAmount } = businessData;
    console.log(businessName, place, establishmentYear, loanAmount);
    if (businessName && place && establishmentYear && loanAmount) {
        console.log(businessName, place, establishmentYear, loanAmount);
      const balanceSheet = fetchBalanceSheet(businessName, place, establishmentYear);
      return res.status(200).json({ "sheet": balanceSheet });
    } else {
      return res.status(400).json({ "message": "Please provide all required details" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
});

app.post('/api/processApplication', async (req, res) => {
  try {
    const businessData = req.body;
    const { businessName, place, establishmentYear, loanAmount, sheet } = businessData;
    if (businessName && place && establishmentYear && loanAmount && sheet) {
      const preAssessment = calculatePreAssessment(sheet, loanAmount);
      return res.status(200).json({ "preAssessment": preAssessment });
    } else {
      return res.status(400).json({ "message": "Please provide all required details" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ "message": "Internal Server Error" });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});