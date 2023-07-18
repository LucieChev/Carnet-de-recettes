SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  mail_address VARCHAR(80) UNIQUE NOT NULL,
  hashed_password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(80),
  description VARCHAR(80),
  user_id INT NOT NULL,
  CONSTRAINT recipe_user FOREIGN KEY (user_id) REFERENCES user(id)
);

  INSERT INTO user
  (name,  mail_address, hashed_password) 
  VALUES
  ('Mamie Gateau',  'mamie.gateau@example.fr', 'hashed password'),
  ('Papy Cuistot', 'papy.cuistot@example.fr', 'hashed password');

  INSERT INTO recipe
  (title, description, user_id) 
  VALUES
  ('Quatre-Quarts',  '100g de farine, 100g de beurre..', 1),
  ('Gateau au yaourt',  '100g de farine, 100g de beurre..', 1),
  ('Risotto aux cepes',  '200g de riz, 500g de cepes..', 2);


SET FOREIGN_KEY_CHECKS = 1;