# Banco de audio — 1st Year, Unit 2: El aula

Estado: preparación parcial para revisión, 18 de octubre de 2026. No es un banco completo ni está conectado todavía a actividades.

## Inventario y validación

- 69 recursos, con 69 nombres distintos: 4 listenings, 20 objetos, 7 días, 14 asignaturas, 8 transportes y 16 expresiones.
- `manifest-original.csv` conserva sin cambios el inventario del ZIP aportado por el docente.
- `audio-inventory.csv` añade ruta prevista, velocidad, identificador de voz, alcance de verificación, duración y SHA-256 cuando existe el archivo. Las voces nominales proceden del inventario; los identificadores de voz de los maestros proceden de ElevenLabs.
- Los textos de los 65 clips coinciden, en orden, con los prompts de los cinco maestros, ignorando mayúsculas, espacios y puntuación. Esto verifica los textos previstos, no el contenido del audio todavía inaccesible.
- La velocidad no está documentada en el inventario ni en los parámetros devueltos por la conexión. Se marca como pendiente; no se presume 1.0 ni se altera el audio.
- Los dos MP3 recibidos son LIS_02 (estuche, 31.53 s) y LIS_04 (transporte, 21.37 s). Se copian byte a byte del ZIP, con sus nombres originales. Ambos se decodifican completos sin errores con FFmpeg. Evidencia en `audio-validation.json`.
- El inventario solo contiene etiquetas temáticas para los listenings, no sus transcripciones completas. Se conserva su aprobación docente; no se afirma una nueva verificación lingüística.

## Organización prevista

Todos los archivos de esta unidad vivirán bajo `assets/audio/unit2/`:

| Carpeta | Categoría del paquete | Cantidad prevista | Disponibles |
| --- | --- | ---: | ---: |
| `listenings/` | LIS | 4 | 2 |
| `vocabulary/objects/` | OBJ | 20 | 0 |
| `vocabulary/days/` | DIA | 7 | 0 |
| `vocabulary/subjects/` | ASI | 14 | 0 |
| `vocabulary/transport/` | TRA | 8 | 0 |
| `expressions/` | EXP | 16 | 0 |

Las carpetas de clips pendientes se crearán al incorporar archivos reales. No se añaden MP3 vacíos. Se conserva la nomenclatura explícita del ZIP (`OBJ/DIA/ASI/TRA/EXP`); difiere del prefijo general `VOC` mencionado anteriormente. No se renombran recursos ni se inventan equivalencias aprobadas.

## Recuperación de los cinco maestros

Los cinco identificadores proporcionados son **flow IDs**, no asset IDs. `creative_get_flow` permite acceder a todos y confirma un nodo TTS completado en cada uno. `masters.json` recoge sus node IDs, prompts, modelo y voice IDs. Ningún nodo se ha ejecutado ni regenerado.

El bloqueo restante es concreto: la conexión permite leer el proyecto y la configuración del nodo, pero no enumera las generaciones/sesiones terminadas ni devuelve sus archivos o enlaces de descarga. `creative_get_flow_run_status` requiere session IDs de una ejecución previa, que no han sido proporcionados por las consultas de lectura. La consulta de assets con los cinco flow IDs no devuelve activos. La solicitud de una herramienta adicional confirma que no existe esa capacidad actualmente.

Hace falta acceso de solo lectura a **las salidas de generaciones ya completadas por flow/node**, incluyendo session IDs y URL del MP3 original (o descarga binaria). No falta acceso a los proyectos y no se necesita volver a generar ni localizar manualmente los maestros identificados.

## Pendientes

- Descargar los cinco maestros existentes y verificar su audio real.
- Cortar y verificar 65 clips individuales con pausas naturales, sin palabras adyacentes; aún no se ha separado ninguno.
- Recuperar los originales de LIS_01 y LIS_03; el ZIP confirma que siguen pendientes y no proporciona sus identificadores.
- Verificar las velocidades originales y las transcripciones completas de los listenings cuando sean accesibles.

Balance: 2 de 69 recursos integrados; 67 pendientes (65 clips y 2 listenings). Cinco maestros identificados, cero maestros descargados. La Unidad 1 y sus audios permanecen sin cambios. Vértice solo aparece en LIS_04 como excepción ya aprobada; no se utiliza para nuevas grabaciones.
