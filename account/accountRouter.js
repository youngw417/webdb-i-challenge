const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

//get test
// router.get('/', (req, res) => {
//   res.status(200).send('Welcome to Database2');
// });

// get accounts
router.get('/', async (req, res, next) => {
  try {
    // translate to 'SELECT * FROM accounts'

    res.status(200).json(await db.select('*').from('accounts'));
    // or db.select('*').from('accounts')  ---> db('accounts).select()
  } catch (err) {
    next(err);
  }
});

// get a account for a id
router.get('/:id', async (req, res, next) => {
  try {
    // translate to 'SELECT * FROM accouns WHERE id = ???
    // res.status(200).json(
    // await db('account')
    //   .where('id', req.params.id)
    //   .select()

    const account = await db('accounts')
      .where('id', req.params.id)
      .first();
    res.status(200).json(account);
    // willl return the first object instead of array
  } catch (err) {
    next(err);
  }
});

// create a account
router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };

    // will translate to 'INSEET INTO accounts (name, budget) VALUES(?, ?)
    const [id] = await db('accounts').insert(payload);
    // res.status(201).json({ id });
    // res.status(201).json(
    //   await db('accounts')
    //     .where('id', id)
    //     .first()
    // );
    res.status(201).json(id);
  } catch (err) {
    next(err);
  }
});
// modify a account
router.put('/:id', async (req, res, next) => {
  try {
    // translate to 'UPDATE accounts SET name = ? and budget = ? WHERE id = ?;'
    const account = await db('accounts')
      .where('id', req.params.id)
      .update(req.body);
    // will return the number of accounts modified
    res.status(201).json(
      await db('accounts')
        .where('id', req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});
// delete a account
router.delete('/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .where('id', req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
module.exports = router;
