DROP TABLE IF EXISTS movie;

CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(250),
    poster_path VARCHAR(255),
    overview VARCHAR(10000)
);
