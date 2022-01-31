const { render } = require('ejs');
const express = require('express');
const router = express.Router();

reservations = [];
wait_list = [];

router.get('/', async function (req, res) {
  res.render('home', { reservations });
});

router.get('/tables', async (req, res) => {
  res.render('tables', { reservations, wait_list });
});

router.get('/reserve', async (req, res) => {
  res.render('reserve', { reservations });
});

router.post('/new_reserve', async (req, res) => {
  const new_reservation = req.body;
  if (reservations.length >= 5) {
    console.log('You are on the waiting list!');
    wait_list.push(new_reservation);
  } else {
    console.log('Reservation was made!');
    reservations.push(new_reservation);
  }

  res.redirect('/');
});

router.get('/api/tables', async (req, res) => {
  res.json(reservations);
});

router.get('/api/waitlist', async (req, res) => {
  res.json(wait_list);
});

router.get('/clear_tables', async (req, res) => {
  reservations = [];
  wait_list = [];
  res.render('tables', { reservations, wait_list });
});

module.exports = router;
