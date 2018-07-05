DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work')
;

DROP TABLE IF EXISTS notes;

-- CREATE SEQUENCE notes_sequence
--     start 1000
--     increment 1;

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

INSERT INTO notes
    (title, content, folder_id)
    VALUES 
    ('10 things to learn from cats', '#1. They are better than you.', 100),
    ('9 things to learn from cats on monday', '#2. The love to sleep.', 100),
    ('8 things to learn from cats in the morning', '#3. They can''t drink milk.', 101),
    ('6 things to learn from cats monday night', '#4. They are always napping.', 101),
    ('5 things to learn from cats on saturday', '#5. They are always hungry.', 102),
    ('4 things to learn from cats on fridays', '#6. Give them fish!!', 102),
    ('3 things to learn from cats on saturday morning', '#7. Cats hate baths.', 103)
;

-- (nextval('notes_sequence'), '5 things to learn from cats on saturday', '#5. They are always hungry.'),
    -- (id, title, content)