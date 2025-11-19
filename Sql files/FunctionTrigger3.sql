
-- Version combinée avec plus de détails
SELECT 
    'FUNCTION' as object_type,
    n.nspname as schema_name,
    p.proname as object_name,
    '' as table_name,
    pg_get_functiondef(p.oid) as definition,
    pg_get_function_arguments(p.oid) as details
FROM pg_proc p
LEFT JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')

UNION ALL

SELECT 
    'TRIGGER' as object_type,
    n.nspname as schema_name,
    t.tgname as object_name,
    c.relname as table_name,
    pg_get_triggerdef(t.oid) as definition,
    CASE 
        WHEN t.tgtype & 1 > 0 THEN 'ROW LEVEL'
        ELSE 'STATEMENT LEVEL'
    END as details
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE NOT t.tgisinternal
AND n.nspname NOT IN ('pg_catalog', 'information_schema')

ORDER BY object_type, schema_name, object_name;