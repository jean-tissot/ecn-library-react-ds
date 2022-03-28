-- Initialization
BEGIN;

INSERT INTO public.person(firstname, lastname, birthdate) VALUES
    ('Pierre', 'KIMOUS', '2000-02-04'),
    ('Jean-Yves', 'MARTIN', '1963-08-12'),
    ('Jean-Marie', 'NORMAND', '1991-04-16'),
    ('Arthur', 'DENT', '1995-11-15'),
    ('Henry', 'LE ROC''H', '1993-12-30'),
    ('Nathalie', 'DUPUIS', '2000-03-08'),
    ('Jacques', 'WEBER', '1975-07-03'),
    ('David', 'EMOUCHET', '1989-01-23'),
    ('Alexandra', 'CE''NEDRA', '1994-05-12')
;


INSERT INTO public.book(title, authors) VALUES
    ('Astérix chez les Bretons', 'René Goscinny, Albert Uderzo'),
    ('La Foire aux immortels', 'Enki Bilal'),
    ('Les Passagers du Vent, Volume 1', 'François Bourgeon'),
    ('Fairy Tail, Vol 1', 'Hiro Mashima')
;

INSERT INTO public.borrow(person_id, book_id, borrow_date, return_date) VALUES
    (2, 4, '2021-07-15', '2021-09-01'),
    (1, 2, '2021-08-01', NULL),
    (3, 3, '2021-10-01', NULL),
    (2, 1, '2021-10-02', NULL)
;

END;