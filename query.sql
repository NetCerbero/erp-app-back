WITH centros AS MATERIALIZED (
  SELECT DISTINCT cmbdt."centroId" 
  FROM con_marca_bus_detalle_temp cmbdt
)

SELECT
  cmab.id,
  ce.id,
  cpc.id,
  cdt."tipoAcceso",
  date(cdt."fechaControlPasajero"),
  cdt."centroId",
  cdt."estadoPasajero",
  cdt."observacionPasajero",
  cdt.conductor,
  cdt.latitud,
  cdt.longitud,
  cdt."fechaControlPasajero",
  2,
  now(),
  now()
FROM con_marca_bus_detalle_temp cdt

JOIN con_puntos_control cpc 
  ON cpc."detallePuntoControl" = cdt."puntoControl"
  AND cpc."fkIdCentroTrabajo" = cdt."centroId"
  AND cpc."fechaEliminacion" IS NULL

JOIN con_marca_acceso_buses cmab 
  ON cmab."fkidCentroTrabajo" = cdt."centroId"
  AND cmab.patente = cdt.patente
  AND cmab."fechaControl" = cdt."fechaControlBus"
  AND cmab."fechaEliminacion" IS NULL

-- 🔥 lookup directo del empleado (clave)
JOIN LATERAL (
  SELECT ce.id
  FROM cnt_empleados ce
  JOIN prs_personas pp 
    ON pp.id = ce."fkidPrsPersona"
  JOIN emp_contratos ec 
    ON ec.id = ce."fkidEmpContrato"
  JOIN cnt_credenciales cc 
    ON cc."fkidCntEmpleado" = ce.id
  WHERE ce."fechaEliminacion" IS NULL
    AND ec."fechaEliminacion" IS NULL
    AND cc.hid IS NOT NULL
    AND ec."fkidCentroTrabajo" = cdt."centroId"
    AND (
      (cc.hid = cdt.tip AND ec."numeroContrato" = cdt."numeroContrato" AND pp.identificacion = cdt.rut)
      OR
      (ec."numeroContrato" = cdt."numeroContrato" AND pp.identificacion = cdt.rut)
      OR
      (cc.hid = cdt.tip)
    )
  ORDER BY ce.id DESC
  LIMIT 1
) ce ON true;