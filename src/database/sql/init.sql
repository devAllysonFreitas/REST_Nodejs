CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS application_user (
  uuid UUID DEFAULT gen_random_uuid (),
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (uuid)
);

INSERT INTO application_user (username, password) VALUES (
  'allyson',
  crypt('allyson', gen_salt('bf'))
);