-- SELECT * FROM notes
-- ORDER BY created ASC
-- LIMIT 5;

-- SELECT * FROM notes
-- WHERE title = '9 things to learn from cats on monday';

-- SELECT * FROM notes
-- WHERE title LIKE '%saturday%morning%';

-- UPDATE notes 
--     SET title = 'Important things to learn from cats',
--     content = 'Just a lot of important stuff'
--     WHERE id = 4;

-- SELECT * FROM notes;

-- INSERT INTO notes  
--     (content)
--     VALUES ('Are dogs better than cats?');

-- DELETE FROM notes WHERE id = '4';

-- SELECT * FROM notes;

-- get all notes with folders

-- SELECT * FROM notes
-- INNER JOIN folders ON notes.folder_id = folders.id;

-- get all notes, show folders if they exists otherwise null
SELECT * FROM notes
LEFT JOIN folders ON notes.folder_id = folders.id
WHERE notes.id = 1005;
