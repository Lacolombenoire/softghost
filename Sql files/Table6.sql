
-- Vue combinée avec toutes les informations des tables
SELECT 
    'TABLE' as object_type,
    n.nspname as schema_name,
    c.relname as object_name,
    '' as parent_name,
    obj_description(c.oid) as description,
    '' as definition
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relkind = 'r'
AND n.nspname NOT IN ('pg_catalog', 'information_schema')

UNION ALL

SELECT 
    'COLUMN' as object_type,
    n.nspname as schema_name,
    a.attname as object_name,
    c.relname as parent_name,
    col_description(c.oid, a.attnum) as description,
    format_type(a.atttypid, a.atttypmod) || 
    CASE 
        WHEN a.attnotnull THEN ' NOT NULL'
        ELSE ''
    END ||
    CASE 
        WHEN pg_get_expr(ad.adbin, ad.adrelid) IS NOT NULL THEN 
            ' DEFAULT ' || pg_get_expr(ad.adbin, ad.adrelid)
        ELSE ''
    END as definition
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
JOIN pg_attribute a ON c.oid = a.attrelid
LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid AND a.attnum = ad.adnum
WHERE c.relkind = 'r'
AND n.nspname NOT IN ('pg_catalog', 'information_schema')
AND a.attnum > 0
AND NOT a.attisdropped

UNION ALL

SELECT 
    'CONSTRAINT' as object_type,
    n.nspname as schema_name,
    con.conname as object_name,
    c.relname as parent_name,
    CASE con.contype
        WHEN 'p' THEN 'PRIMARY KEY'
        WHEN 'f' THEN 'FOREIGN KEY'
        WHEN 'c' THEN 'CHECK CONSTRAINT'
        WHEN 'u' THEN 'UNIQUE CONSTRAINT'
        ELSE con.contype::text
    END as description,
    pg_get_constraintdef(con.oid) as definition
FROM pg_constraint con
JOIN pg_class c ON con.conrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')

ORDER BY object_type, schema_name, parent_name, object_name;
