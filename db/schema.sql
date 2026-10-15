DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE
);

CREATE TABLE files (
  id serial PRIMARY KEY,
  name text NOT NULL,
  size int NOT NULL,
  folder_id int NOT NULL REFERENCES folders (id) ON DELETE CASCADE,
  UNIQUE (name, folder_id)
);