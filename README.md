# Unas Tapitas de Español

Plataforma educativa gratuita, accesible e interactiva para aprender español en secundaria en Irlanda, de 1st Year a 6th Year, incluyendo Leaving Certificate Higher Level y Ordinary Level.

## Navegación por cursos y unidades (rama de revisión)

La portada presenta **1st Year, 2nd Year, 3rd Year y Leaving Certificate (LC)**.
LC se divide en **HL y OL**, con una futura progresión común entre 5th y 6th Year.

- **1st Year · U1: Hola y bienvenidos**: completa, con Learn, Explore, Practise,
  Communicate y Play; sus contenidos y 31 MP3 se conservan intactos.
- **1st Year · U2: El aula**: ficha en desarrollo (objetos de clase), sin actividades
  ni enlaces de acceso. Los demás cursos y niveles muestran «Próximamente».
- Rutas por curso/unidad y compatibilidad con los antiguos enlaces de U1.
- Progreso opcional separado por curso/unidad/nivel y lectura del guardado anterior
  de U1; no se guardan textos ni respuestas personales.

Ver [arquitectura, rutas y ampliación](docs/ARQUITECTURA_NAVEGACION.md).
Esta propuesta se revisa en una rama independiente; no supone una fusión en main.

## Estado de los contenidos aprobados (18 de octubre de 2026)

- El proyecto anterior se conserva en la rama `backup-before-tapitas-migration-2026-10-17`; el prototipo original se migró a `main`.
- **1st Year · Unidad 1: Hola y bienvenidos**: desarrollo pedagógico completado, revisado y aprobado por el docente. Las cinco secciones están integradas en `main`: **Learn, Explore, Practise, Communicate y Play**.
- **Explore** contiene seis laboratorios interactivos, incluida **La máquina de preguntas** (PR #2, fusionada).
- **Practise y Communicate** fueron revisados y aprobados por el docente; no deben alterarse sin un motivo pedagógico o técnico.
- **Play** ofrece tres aventuras originales y opcionales, integradas mediante PR #4 tras la revisión docente. Ver [diseño e implementación](docs/PLAY_UNIDAD_1.md). La futura **Game Zone** común queda pendiente.
- Los dos MP3 definitivos de listening y los 29 MP3 de Explore están en `assets/audio/`; se verificó la identidad de los dos listening con los originales migrados. El docente confirmó que los audios funcionan.
- El espacio cultural opcional propuesto en PR #3 se **descartó y cerró sin fusionar**. No forma parte de la Unidad 1.
- El docente ha probado satisfactoriamente la unidad en dispositivos reales. Esto no equivale a una certificación formal de accesibilidad ni a una prueba exhaustiva de todos los navegadores.

Ver [hoja de ruta](docs/HOJA_DE_RUTA.md).

## Principios

Contenido original (no reproducir libros comerciales); currículo en espiral; aprendizaje activo y comunicativo; feedback formativo; español peninsular como referencia con respeto a otras variedades; instrucciones claras en inglés cuando aporten valor; compatibilidad móvil/iPad/ordenador y accesibilidad; evitar gastos recurrentes y dependencias innecesarias de IA.

Evitar enseñar **ser = permanente / estar = temporal** como regla: es una simplificación engañosa. Explicar los usos según el significado y la construcción en contexto.

## Verificación técnica

Ejecutar `npm test` con Node.js; no requiere instalar dependencias.
`npm run build` prepara `dist/` con la web estática y todos sus recursos para
alojamiento; no modifica los archivos fuente.

- **62 pruebas superadas** en esta rama: las 53 anteriores y 9 regresiones nuevas
  de navegación, guardado, migración, privacidad y aislamiento de unidades/niveles.
- Datos de U1, motores de actividades, juegos y 31 MP3 sin cambios respecto a la base.
- La nueva navegación se comprueba con renderizado simulado en Node. Sigue pendiente
  la revisión manual de esta rama en móvil, iPad y ordenador; las pruebas previas
  del docente corresponden a U1 antes de este cambio.
- No se ha realizado una auditoría formal de accesibilidad.

## Mantenimiento

Mantener este README y la descripción de la web sincronizados con los cambios efectivamente publicados. Documentar claramente lo que está integrado, lo que se ha descartado y lo que sigue pendiente.
