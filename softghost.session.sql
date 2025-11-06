-- Voir la fonction generate_reservation_id
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'generate_reservation_id';

-- Voir la fonction set_reservation_id  
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'set_reservation_id';