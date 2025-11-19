
-- Récupérer tous les triggers avec leur définition
SELECT 
    n.nspname as schema_name,
    c.relname as table_name,
    t.tgname as trigger_name,
    pg_get_triggerdef(t.oid) as trigger_definition,
    CASE 
        WHEN t.tgtype & 2 > 0 THEN 'BEFORE'
        WHEN t.tgtype & 4 > 0 THEN 'AFTER'
        WHEN t.tgtype & 64 > 0 THEN 'INSTEAD OF'
        ELSE 'UNKNOWN'
    END as trigger_timing,
    CASE 
        WHEN t.tgtype & 1 > 0 THEN 'ROW'
        ELSE 'STATEMENT'
    END as trigger_level,
    CASE 
        WHEN t.tgtype & 8 > 0 THEN 'INSERT'
        WHEN t.tgtype & 16 > 0 THEN 'DELETE'
        WHEN t.tgtype & 32 > 0 THEN 'UPDATE'
        WHEN t.tgtype & 8+16 > 0 THEN 'INSERT OR DELETE'
        WHEN t.tgtype & 8+32 > 0 THEN 'INSERT OR UPDATE'
        WHEN t.tgtype & 16+32 > 0 THEN 'DELETE OR UPDATE'
        WHEN t.tgtype & 8+16+32 > 0 THEN 'INSERT OR DELETE OR UPDATE'
        ELSE 'OTHER'
    END as trigger_events,
    p.proname as function_name,
    n2.nspname as function_schema
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
LEFT JOIN pg_proc p ON t.tgfoid = p.oid
LEFT JOIN pg_namespace n2 ON p.pronamespace = n2.oid
WHERE NOT t.tgisinternal
AND n.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY n.nspname, c.relname, t.tgname;