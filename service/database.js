const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Connect to the database cluster
const client = new MongoClient(url);
const db = client.db('whatyawatchin');
const userCollection = db.collection('user');
const totalsCollection = db.collection('totals');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// async function main() {
//   try {
//     const user = {
//       username: 'user123',
//       password: '123user'
//     };
//     await userCollection.insertOne(user)
//   } catch (ex) {
//     console.log(`Database (${url}) error: ${ex.message}`);
//   } finally {
//     await client.close();
//   }
// } 
// main()
async function updateUserTotal(email, newTotal) {
  await userCollection.updateOne(
    { email },
    {
      $set: {
        total: newTotal,
        date: new Date().toLocaleString(),
      },
    }
  );
}

async function getHighTotals() {
  const options = {
    sort: { total: -1 },
    limit: 5,
  };
  const cursor = userCollection.find({ total: { $exists: true } }, options);
  return cursor.toArray();
}


function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addTotal({ email, total }) {
  return totalsCollection.insertOne({
    email,
    total,
    date: new Date().toLocaleString(),
  });
}
 

function getHighTotals() {
  const query = { total: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { total: -1 },
    limit: 5,
  };
  const cursor = totalsCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addTotal,
  updateUserTotal,
  getHighTotals,
};


