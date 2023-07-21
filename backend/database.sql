SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  hashed_password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(80),
  description VARCHAR(200),
  user_id INT NOT NULL,
  CONSTRAINT recipe_user FOREIGN KEY (user_id) REFERENCES user(id)
 );

  INSERT INTO user
  (name,  email, hashed_password) 
  VALUES
  ('Mamie Gateau',  'mamie.gateau@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$wvR1EJg9klegFdYpo4xKCQ$3KXb/ZKix3t/lz+aMuMvDLMsyy6algAeSao+JuitPwE'),
  ('Papy Cuistot', 'papy.cuistot@example.fr', '$argon2id$v=19$m=65536,t=5,p=1$SKcvJrh/PENQgoAmUBQyHQ$hnU7IwXjI2ftJ3gUkdPhrWD0c873POb7HbdV4LFfcGw');

  INSERT INTO recipe
  (title, description, user_id) 
  VALUES
  ('Quatre-Quarts',  '4 œufs, le même poids en farine, le même poids en beurre ramolli, le même poids en sucre, 1 sachet de levure chimique, 1 pincée de sel', 3),
  ('Gateau au yaourt',  '1 pot de yaourt nature, 3 pots de farine, 2 pots de sucre, 1/2 pot huile végétale, 3 œufs, 1 sachet de levure chimique, 1 pincée de sel',3),
  ('Risotto aux cepes',  '300 g de riz Arborio, 200 g de cèpes, 1 oignon moyen, 2 gousses ail, 750 ml de bouillon de légumes, 150 ml de vin blanc sec, 60 g de parmesan râpé',3
  );


SET FOREIGN_KEY_CHECKS = 1;