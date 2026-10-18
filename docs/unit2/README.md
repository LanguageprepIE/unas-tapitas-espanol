# Banco de audio — 1st Year, Unit 2: El aula

Estado: entrega parcial para revisión, 18 de octubre de 2026. PR #6 en borrador. No se han conectado estos recursos a actividades ni modificado la Unidad 1.

## Resultado

| Elemento | Cantidad |
| --- | ---: |
| Recursos del inventario | 69 |
| Maestros originales descargados | 5 de 5 |
| Clips separados | 65 de 65 |
| Clips con texto confirmado automáticamente | 65 |
| Clips pendientes de revisión auditiva | 0 |
| Listenings aprobados incluidos | 2 de 4 |
| Recursos presentes | 67 de 69 |
| MP3 totales, incluidos los cinco maestros | 72 |

Los recortes inconsistentes anteriores de `1Y_U02_AUD_TRA_04_v1.mp3` (en coche) y `1Y_U02_AUD_TRA_05_v1.mp3` (en bicicleta) se descartaron y sustituyeron desde el maestro original. Los nuevos MP3 incluyen márgenes de silencio ampliados, se decodifican y mantienen trazabilidad; el ASR local coincide con “en coche” (reconocido unido como “ENGOCHE”) y “en bicicleta”. No se generó audio nuevo.

Los listenings presentes son LIS_02 (estuche) y LIS_04 (transporte), recibidos en el ZIP. LIS_01 y LIS_03 siguen sin original local; no se han regenerado ni sustituido. Los cuatro conservan su aprobación docente. El inventario contiene etiquetas temáticas para los listenings, no sus transcripciones completas, por lo que no se afirma una nueva comprobación lingüística.

## Archivos y organización

Todos los MP3 de esta unidad se encuentran en `assets/audio/unit2/`:

| Carpeta | Categoría | Recursos presentes |
| --- | --- | ---: |
| `masters/` | originales completos, para trazabilidad | 5 |
| `listenings/` | LIS | 2 |
| `vocabulary/objects/` | OBJ | 20 |
| `vocabulary/days/` | DIA | 7 |
| `vocabulary/subjects/` | ASI | 14 |
| `vocabulary/transport/` | TRA | 8, incluidos los dos recortes revisados y confirmados con ASR |
| `expressions/` | EXP | 16 |

Se conserva la nomenclatura del ZIP (`OBJ/DIA/ASI/TRA/EXP`); difiere del prefijo general `VOC` mencionado anteriormente. No se han renombrado los recursos aprobados ni creado MP3 vacíos.

- `manifest-original.csv`: inventario del ZIP conservado sin cambios, incluidos sus finales de línea originales.
- `audio-inventory.csv`: 69 filas con texto, voz, velocidad, nombre, ruta, estado, SHA-256 y, para clips, maestro y tiempos de corte. Hay 69 nombres únicos.
- `masters.json`: flow, sesión, generación, voz, texto, duración y SHA-256 de los cinco originales. Se descargaron mediante `creative_get_flow_run_status` usando los identificadores aportados por el docente; el bloqueo de acceso anterior queda resuelto.
- `clip-cut-plan.json`: intervalos de cada clip en su maestro.
- `master-transcripts-local.json`: reconocimiento local de los originales. Los 65 textos coinciden con los del inventario, ignorando puntuación, mayúsculas y espacios.
- `clip-speech-verification.json`: evidencia lingüística y alcance de verificación de cada clip. Los 65 confirmados coinciden con su texto mediante reconocimiento local de los clips exportados, con comprobación individual de discrepancias cuando fue posible.
- `audio-validation.json`: resumen, hashes, duraciones y comprobaciones técnicas.

## Método y límites de validación

Los originales se conservan byte a byte, sin conversión. Los clips se extraen de PCM mono a 44 100 Hz usando los límites documentados, apoyados en los tiempos de palabra y tramos de baja energía. Se añaden 80 ms de silencio inicial y 180 ms final en la tanda original; TRA_04/05 usan 180 ms iniciales y 220 ms finales. Todos se exportan a MP3 a 128 kbps. Se preservan voz, tono y velocidad; no se aplica normalización ni se generan palabras nuevas.

La velocidad de generación no figura en los datos consultados. El inventario la marca como no documentada; no se presume ningún valor.

Los 65 clips se decodifican completos sin errores con FFmpeg. Su correlación con el recorte original supera 0.97 y sus longitudes difieren de las previstas en menos de un frame MP3, debido al contenedor/codificación. Esta comprobación técnica no sustituye la validación lingüística.

La validación del habla utiliza faster-whisper small ejecutado localmente, sin llamadas de pago a ElevenLabs. Es automática y no equivale a una revisión auditiva humana. No se declara verificado ningún resultado no concluyente.

Los dos listenings recibidos mantienen sus hashes del ZIP y se decodifican sin errores. Vértice solo aparece en LIS_04 como excepción previamente aprobada; no se ha usado para nuevas grabaciones. No se han gastado nuevos créditos ni ejecutado nodos de generación.

Las 62 pruebas existentes pasan. Solo cambian archivos de `assets/audio/unit2/` y `docs/unit2/`. La Unidad 1 permanece intacta. El PR continúa en borrador y no se fusiona con main.

## Pendientes

1. Recuperación de los originales aprobados LIS_01 y LIS_03.
2. Completar velocidades originales y transcripciones completas de listenings cuando se disponga de esos datos.
