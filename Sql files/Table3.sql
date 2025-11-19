
-- Récupérer les contraintes de clé étrangère
SELECT 
    n.nspname as schema_name,
    c.relname as table_name,
    con.conname as constraint_name,
    ARRAY_AGG(a.attname) as columns,
    fn.nspname as foreign_schema,
    fc.relname as foreign_table,
    ARRAY_AGG(fa.attname) as foreign_columns,
    pg_get_constraintdef(con.oid) as constraint_definition
FROM pg_constraint con
JOIN pg_class c ON con.conrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(con.conkey)
JOIN pg_class fc ON con.confrelid = fc.oid
JOIN pg_namespace fn ON fc.relnamespace = fn.oid
JOIN pg_attribute fa ON fa.attrelid = fc.oid AND fa.attnum = ANY(con.confkey)
WHERE con.contype = 'f'
AND n.nspname NOT IN ('pg_catalog', 'information_schema')
GROUP BY n.nspname, c.relname, con.conname, fn.nspname, fc.relname, con.oid
ORDER BY n.nspname, c.relname, con.conname;