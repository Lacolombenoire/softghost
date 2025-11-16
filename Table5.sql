
-- Récupérer les index (hors contraintes PK/UNIQUE)
SELECT 
    n.nspname as schema_name,
    c.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    am.amname as index_type,
    idx.indisunique as is_unique,
    pg_get_indexdef(idx.indexrelid) as index_definition
FROM pg_index idx
JOIN pg_class c ON idx.indrelid = c.oid
JOIN pg_class i ON idx.indexrelid = i.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
JOIN pg_am am ON i.relam = am.oid
JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
AND NOT idx.indisprimary
AND NOT idx.indisunique  -- Les UNIQUE sont déjà dans les contraintes
ORDER BY n.nspname, c.relname, i.relname;
