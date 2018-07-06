'use strict';

const express = require('express');
const knex = require('../knex');

const tagsRouter = express.Router();

// GET ALL TAGS

tagsRouter.get('/', (req, res, next) => {
  knex.select('tags.id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// GET BY ID

tagsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex.first('tags.id', 'name')
    .from('tags')
    .where('id', `${id}`)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      next(err);
    });
});

// POST/CREATE A NEW TAG

tagsRouter.post('/', (req, res, next) => {
  const { name } = req.body;
  
  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  const newItem = { name };
  
  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

// PUT/UPDATE AN ITEM

tagsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if(field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  // VALIDATION FOR INPUT

  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('tags')
    .update({name: `${updateObj.name}`})
    .where('id', `${id}`)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });

});

// DELETE A TAG

tagsRouter.delete('/:id', (req, res, next) => {
  const searchId = req.params.id;
      
  knex('tags')
    .where('id', `${searchId}`)
    .del()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});



module.exports = tagsRouter;