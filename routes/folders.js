'use strict';

const express = require('express');
const knex = require('../knex');

const foldersRouter = express.Router();

// Get All (and search by query)

foldersRouter.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// FIND BY ID takes an id

foldersRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  
  knex.first('folders.id', 'name')
    .from('folders')
    .where('id', `${id}`)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      next(err);
    });
});

// UPDATE A FOLDER

// Put update an item
foldersRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex('folders')
    .update({name: `${updateObj.name}`})
    .where('id', `${id}`)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// CREATE A FOLDER

// Post (insert) an item

foldersRouter.post('/', (req, res, next) => {
  const { name } = req.body;
  
  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex
    .insert({ name: `${newItem.name}`})
    .into('folders')
    .returning('id', 'name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE A FOLDER

foldersRouter.delete('/:id', (req, res, next) => {
  const searchId = req.params.id;
  
  knex('folders')
    .where('id', `${searchId}`)
    .del()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = foldersRouter;