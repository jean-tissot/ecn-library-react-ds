BEGIN;

CREATE TABLE public.book (
                id SERIAL NOT NULL,
                title VARCHAR(256) NOT NULL,
                authors VARCHAR(256) NOT NULL,
                available INTEGER NOT NULL DEFAULT 1,
                CONSTRAINT pk_book PRIMARY KEY (id)
);

CREATE TABLE public.person (
                id SERIAL NOT NULL,
                firstname VARCHAR(128) NOT NULL,
                lastname VARCHAR(128) NOT NULL,
                birthdate DATE,
                CONSTRAINT pk_person PRIMARY KEY (id)
);

CREATE TABLE public.borrow (
                id SERIAL NOT NULL,
                person_id INTEGER NOT NULL,
                book_id INTEGER NOT NULL,
                borrow_date DATE NOT NULL,
                return_date DATE,
                CONSTRAINT pk_borrow PRIMARY KEY (id)
);

TRUNCATE public.borrow CASCADE;
TRUNCATE public.person CASCADE;
TRUNCATE public.book CASCADE;

ALTER SEQUENCE book_id_seq RESTART WITH 1;
ALTER SEQUENCE person_id_seq RESTART WITH 1;
ALTER SEQUENCE borrow_id_seq RESTART WITH 1;

ALTER TABLE public.borrow ADD CONSTRAINT book_borrow_fk
FOREIGN KEY (book_id)
REFERENCES public.book (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.borrow ADD CONSTRAINT person_borrow_fk
FOREIGN KEY (person_id)
REFERENCES public.person (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

END;