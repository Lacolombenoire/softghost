-- Récupérer toutes les fonctions avec leur définition
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    pg_get_function_result(p.oid) as return_type,
    pg_get_functiondef(p.oid) as function_definition,
    CASE 
        WHEN p.prokind = 'a' THEN 'AGGREGATE'
        WHEN p.prokind = 'w' THEN 'WINDOW'
        WHEN p.prorettype = 'trigger'::regtype THEN 'TRIGGER'
        ELSE 'NORMAL'
    END as function_type,
    l.lanname as language
FROM pg_proc p
LEFT JOIN pg_namespace n ON p.pronamespace = n.oid
LEFT JOIN pg_language l ON p.prolang = l.oid
WHERE n.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY n.nspname, p.proname;

