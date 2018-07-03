'use strict';

const knex = require('../knex');

let searchTerm = 'gaga';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

// FIND BY ID takes an id

let searchId = '1001';

knex
  .first('id', 'title', 'content')
  .from('notes')
  .where('id', `${searchId}`)
  .then(item => {
    console.log(item);
  });

// UPDATE takes an ID and update data

let updateCol = 'title';
let updateVal = 'bla bla';

knex('notes')
  .update(`${updateCol}`, `${updateVal}`)
  .where('id', `${searchId}`)
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(err);
  });

// CREATE NOTE takes an object w/ the note properties and inserts it
// returns the new note (including new id) as an obj
// id, title, content

let newName = 'new name';
let newContent = 'new content';

knex
  .insert({ title: `${newName}`, content: `${newContent}` })
  .into('notes')
  .returning('id', 'title', 'content')
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(err);
  });

// DELETE takes an id and deletes a note from the database

knex('notes')
  .where('id', `${searchId}`)
  .del()
  .then(console.log)
  .catch(err => {
    console.error(err);
  });