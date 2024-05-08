// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/event', async (req, res) => {
  const events = await Event.find().populate('createdBy');
  res.render('events', { events });
});

router.get('/event/:id', async (req, res) => {
  const event = await Event.findById(req.params.id).populate('createdBy');
  res.render('event', { event });
});

router.get('/event/:id/edit', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('eventForm', { event });
});

router.post('/event/:id/edit', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect(`/event/${event.id}`);
});

router.get('/event/:id/delete', async (req, res) => {
  await Event.findByIdAndRemove(req.params.id);
  res.redirect('/event');
});

router.post('/event', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.redirect('/event');
});

