-- Récupérer toutes les tables avec leurs colonnes et propriétés détaillées
SELECT 
    n.nspname as schema_name,
    c.relname as table_name,
    a.attname as column_name,
    format_type(a.atttypid, a.atttypmod) as data_type,
    CASE 
        WHEN a.attnotnull THEN 'NOT NULL'
        ELSE 'NULL'
    END as nullable,
    COALESCE(pg_get_expr(ad.adbin, ad.adrelid), '') as default_value,
    CASE 
        WHEN a.attidentity = 'a' THEN 'ALWAYS'
        WHEN a.attidentity = 'd' THEN 'BY DEFAULT'
        ELSE ''
    END as identity,
    col_description(c.oid, a.attnum) as column_comment
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
JOIN pg_attribute a ON c.oid = a.attrelid
LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid AND a.attnum = ad.adnum
WHERE c.relkind = 'r'  -- Seulement les tables régulières
AND n.nspname NOT IN ('pg_catalog', 'information_schema')
AND a.attnum > 0
AND NOT a.attisdropped
ORDER BY n.nspname, c.relname, a.attnum;


