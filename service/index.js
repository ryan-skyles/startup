const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  });

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
      DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};


apiRouter.get('/totals', verifyAuth, async (_req, res) => {
  const totals = await DB.getHighTotals();
  res.send(totals);
});

apiRouter.post('/total', verifyAuth, async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await findUser('token', token);

  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const newTotal = req.body.total;

  try {
    // Update 'user' collection
    await DB.updateUserTotal(user.email, newTotal);

    // Add entry to 'totals' collection
    await DB.addTotal({ email: user.email, total: newTotal });

    res.send({ msg: 'Total updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Failed to update total' });
  }
});


app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function updateTotals(newTotal) {
  await DB.addTotal(newTotal);
  return DB.getHighTotals();
}


async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}
  
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
// const express = require('express');
// const uuid = require('uuid');
// const app = express();
// const DB = require('./database.js');

// const authCookieName = 'token';

// let users = [];
// let totals = [];

// const port = process.argv.length > 2 ? process.argv[2] : 4000;

// app.use(express.static('public'));

// app.use(express.json());

// app.use(cookieParser());

// // const apiRouter = express.Router();
// // app.use(`/api`, apiRouter);
// var apiRouter = express.Router();
//  app.use(`/api`, apiRouter);

// apiRouter.post('/auth/create', async (req, res) => {
//     if (await findUser('email', req.body.email)) {
//       res.status(409).send({ msg: 'Existing user' });
//     } else {
//       const user = await createUser(req.body.email, req.body.password);
//       setAuthCookie(res, user.token);
//       res.send({ email: user.email });
//     }
//   });

// apiRouter.post('/auth/login', async (req, res) => {
//   const user = await findUser('email', req.body.email);
//   if (user) {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       user.token = uuid.v4();
//       // await DB.updateUser(user);
//       setAuthCookie(res, user.token);
//       res.send({ email: user.email });
//       return;
//     }
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

// apiRouter.delete('/auth/logout', async (req, res) => {
//     const user = await findUser('token', req.cookies[authCookieName]);
//     if (user) {
//       delete user.token;
//       // DB.updateUser(user);
//     }
//     res.clearCookie(authCookieName);
//     res.status(204).end();
// });

// const verifyAuth = async (req, res, next) => {
//     const user = await findUser('token', req.cookies[authCookieName]);
//     if (user) {
//         next();
//     } else {
//         res.status(401).send({ msg: 'Unauthorized' });
//     }
// };


// apiRouter.get('/totals', verifyAuth, (_req, res) => {
//   // const totals = await DB.getHighTotals();
//   res.send(totals);
// });

// apiRouter.post('/total', verifyAuth, (req, res) => {
//   // const totals = updateTotals(req.body);
//   totals = updateTotals(req.body);
//   res.send(totals);
// });


// app.use(function (err, req, res, next) {
//     res.status(500).send({ type: err.name, message: err.message });
// });

// app.use((_req, res) => {
//     res.sendFile('index.html', { root: 'public' });
// });


// // async function updateTotals(newTotal) {
// //   await DB.addTotal(newTotal);
// //   return DB.getHighTotals();
// // }



// function updateTotals(newTotal) {
//   const existingIndex = totals.findIndex((t) => t.name === newTotal.name);

//   if (existingIndex >= 0) {
//     totals[existingIndex] = newTotal; 
//   } else {
//     totals.push(newTotal); 
//   }

//   totals.sort((a, b) => b.total - a.total);

//   return totals.slice(0, 10);
// }

// async function createUser(email, password) {
//   const passwordHash = await bcrypt.hash(password, 10);

//   const user = {
//     email: email,
//     password: passwordHash,
//     token: uuid.v4(),
//   };
//   // await DB.addUser(user);

//   return user;
// }

// async function findUser(field, value) {
//   if (!value) return null;

//   // if (field === 'token') {
//   //   return DB.getUserByToken(value);
//   // }
//   // return DB.getUser(value);
//   return users.find((u) => u[field] === value);
// }

// function setAuthCookie(res, authToken) {
//     res.cookie(authCookieName, authToken, {
//       secure: true,
//       httpOnly: true,
//       sameSite: 'strict',
//     });
// }

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
  
// const httpService = app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });





