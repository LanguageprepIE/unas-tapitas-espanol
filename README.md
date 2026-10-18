# Unas Tapitas de Español

Plataforma educativa gratuita, accesible e interactiva para aprender español en secundaria en Irlanda, de 1st Year a 6th Year, incluyendo Leaving Certificate Higher Level y Ordinary Level.

## Estado del proyecto (18 de octubre de 2026)

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

- La suite automatizada documentada en la PR #4 registró **53 pruebas superadas** antes de fusionarse; incluye recorridos de los tres juegos.
- La incorporación de Play preservó los contenidos de Learn, Explore, Practise y Communicate y los 31 MP3 existentes.
- El docente confirmó pruebas satisfactorias en dispositivos reales y aprobó las actividades de la Unidad 1.
- **Pendiente de verificación independiente:** ejecutar de nuevo `npm test` sobre el estado actual de `main` y efectuar una auditoría formal de accesibilidad y compatibilidad si se requiere. No se debe presentar como ya realizada.

## Mantenimiento

Mantener este README y la descripción de la web sincronizados con los cambios efectivamente publicados. Documentar claramente lo que está integrado, lo que se ha descartado y lo que sigue pendiente.
