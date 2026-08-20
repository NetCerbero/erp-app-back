-- INDICES LISTA GERENCIA
CREATE INDEX idx_ga_area_activo 
ON acreditacion_qa.gerencias_areas("fkidAreaTrabajo") 
WHERE "fechaEliminacion" IS NULL;

CREATE INDEX idx_ga_gerencia_activo 
ON acreditacion_qa.gerencias_areas("fkidGerencia") 
WHERE "fechaEliminacion" IS NULL;

CREATE INDEX idx_ecat_area_activo 
ON acreditacion_qa.emp_contratos_areas_trabajos("fkidAreaTrabajo") 
WHERE "fechaEliminacion" IS NULL;

CREATE INDEX idx_ecat_contrato_activo 
ON acreditacion_qa.emp_contratos_areas_trabajos("fkidEmpContrato") 
WHERE "fechaEliminacion" IS NULL;

CREATE INDEX idx_ec_id_centro_activo 
ON acreditacion_qa.emp_contratos(id, "fkidCentroTrabajo")
WHERE "fechaEliminacion" IS NULL;


-- INDICE LISTA EMPLEADOS

CREATE INDEX idx_ce_full_filter
ON cnt_empleados ("fkidEmpContrato", "fkidPrsPersona")
WHERE "fechaEliminacion" IS NULL
  AND estado IN ('ACREDITADO','CADUCADO','INHABILITADO');

CREATE INDEX idx_ce_filtro
ON cnt_empleados ("fkidEmpContrato")
WHERE "fechaEliminacion" IS NULL
  AND estado IN ('ACREDITADO','CADUCADO','INHABILITADO');


CREATE INDEX IF NOT EXISTS idx_prs_contactos_last
ON prs_contactos ("fkidPrsPersona", id DESC)
WHERE "fechaEliminacion" IS NULL;

CREATE INDEX idx_cnt_credenciales_lookup_last
ON cnt_credenciales ("fkidCntEmpleado", "fechaCreacion" DESC)
WHERE "fechaEliminacion" IS NULL AND estado = 'ACTIVA';
-- CONTACTOS

CREATE INDEX IF NOT EXISTS idx_prs_contactos_ciudad
ON prs_contactos ("fkidCiudadDireccion")
WHERE "fechaEliminacion" IS NULL;


-- EMP CONTRATOS
CREATE INDEX IF NOT EXISTS idx_emp_contratos_centro_elim
ON emp_contratos ("fkidCentroTrabajo")
WHERE "fechaEliminacion" IS NULL;

-- CNT EMPLEADO
CREATE INDEX idx_cnt_empleados_main
ON cnt_empleados ("fkidEmpContrato", estado)
WHERE "fechaEliminacion" IS NULL;

DROP INDEX IF EXISTS idx_cnt_empleados_main; 

-- NUEVO CIUDADES

CREATE INDEX IF NOT EXISTS idx_ext_ciudades_region
ON ext_ciudades ("fkidExtRegion");

CREATE INDEX IF NOT EXISTS idx_ext_localidades_ciudad
ON ext_localidades ("fkidExtCiudad");

CREATE INDEX IF NOT EXISTS idx_ext_regiones_pais
ON ext_regiones ("fkidExtPais");


/*SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'emp_contratos';*/

-- ACTUALIZAR ESTADISTICAS LISTA EMPLEADOS
ANALYZE prs_contactos;
ANALYZE ext_ciudades;
analyze ext_regiones;
ANALYZE ext_localidades;
ANALYZE cnt_credenciales;
ANALYZE emp_contratos;
ANALYZE cnt_empleados;
ANALYZE prs_personas;


-- ESTADISTICA GERENCIA
ANALYZE gerencias_areas;
ANALYZE emp_contratos_areas_trabajos;
--ANALYZE emp_contratos;

