CREATE TABLE jokes (
  id SERIAL PRIMARY KEY,
  joke_text TEXT NOT NULL
);

INSERT INTO jokes (joke_text) VALUES
('Why don''t scientists trust atoms? Because they make up everything!'),
('I told my wife she was drawing her eyebrows too high. She looked surprised.'),
('What do you call a fake noodle? An Impasta.'),
('Why did the scarecrow win an award? Because he was outstanding in his field.'),
('Did you hear about the restaurant on the moon? Great food, no atmosphere.');
