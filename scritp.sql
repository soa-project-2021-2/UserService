CREATE TABLE application_user ( 
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR ( 50 ) NOT NULL, 
    password VARCHAR ( 100 ) NOT NULL, 
    email VARCHAR ( 255 ) UNIQUE NOT NULL, 
    sendemail BOOLEAN NOT NULL 
    );

-- DROP TABLE application_user