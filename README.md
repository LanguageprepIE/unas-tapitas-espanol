# Unas Tapitas de Español

Plataforma educativa gratuita, accesible e interactiva para aprender español en secundaria en Irlanda, de 1st Year a 6th Year, incluyendo Leaving Certificate Higher Level y Ordinary Level.

## Estado de migración (18 de octubre de 2026)

- Este repositorio sustituye al proyecto antiguo, conservado en la rama `backup-before-tapitas-migration-2026-10-17`.
- Están disponibles los **dos MP3 definitivos** de la Unidad 1 de 1st Year en `assets/audio/`, y se ha verificado que son idénticos a los archivos del ZIP original.
- El **código completo del prototipo original** se ha importado a la rama `main`, conservando su estructura, actividades y recursos asociados.
- Los seis laboratorios de **Explore** están integrados tras la PR #2, incluida La máquina de preguntas.
- **Practise y Communicate** fueron revisados y aprobados por el docente: conservarlos sin modificaciones.
- La rama de revisión añade **Play** con tres juegos originales y opcionales. Ver [diseño e implementación](docs/PLAY_UNIDAD_1.md). La futura **Game Zone** común queda pendiente.

Ver [hoja de ruta](docs/HOJA_DE_RUTA.md).

## Principios

Contenido original (no reproducir libros comerciales); currículo en espiral; aprendizaje activo y comunicativo; feedback formativo; español peninsular como referencia con respeto a otras variedades; instrucciones claras en inglés cuando aporten valor; compatibilidad móvil/iPad/ordenador y accesibilidad; evitar gastos recurrentes y dependencias innecesarias de IA.

## Verificación técnica

Se han comprobado las rutas de HTML, CSS, JavaScript, datos y audios; los dos MP3 permanecen idénticos a los del ZIP. La suite original (`npm test`) se ejecuta correctamente. Play conserva los contenidos de Learn, Explore, Practise y Communicate y los 31 MP3 existentes. Las pruebas visuales en dispositivos reales y la revisión docente de los juegos siguen pendientes.
