const express = require('express');
const knex = require('../db/client');

const router = express.Router()

router.get('/', (req, res) => {
  knex('todos')
  .orderBy("createdAt", 'desc')
  .then(todos => {
    res.render("todos/index", {list: todos})
  })
})

router.get('/new', (req, res) => {
  res.render("todos/new")
})

module.exports = router