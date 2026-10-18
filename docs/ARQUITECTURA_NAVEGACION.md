# Cursos, unidades y progreso

## Alcance de esta rama

Portada → curso → unidad → Learn / Explore / Practise / Communicate / Play.
Los cuatro cursos son 1st Year, 2nd Year, 3rd Year y Leaving Certificate (LC).
LC contiene HL y OL: no existen cursos independientes de 5th y 6th Year.
Su futura secuencia de unidades podrá atravesar ambos años, de fundamentos a
consolidación y preparación de examen, con refuerzo integrado. No se han
inventado ni desarrollado todavía unidades de LC.

U1 de 1st Year conserva todos sus datos, ejercicios, juegos, motores y 31 MP3.
U2 «El aula» presenta Learn · Bloque A, centrado en objetos de clase.
Solo su resumen y su Learn están abiertos; el resto de las etapas está pendiente.
Los demás cursos/niveles muestran un catálogo informativo sin unidades disponibles.

## Módulos y ampliación

- `catalogue.mjs`: cursos, niveles, metadatos de unidades, estados de publicación,
  identificadores de motores aprobados y validación/construcción de rutas.
- `app.js`: interfaz existente de U1, catálogo compartido, navegación contextual,
  estado de la sesión y registro de vistas por motor (`unit1`, `unit2`).
- `unit2-learn.mjs`: contenido, MP3 aprobados, estado local y vistas de Learn A.
- `assets/illustrations/unit2-objects.svg`: iconos propios de los objetos.
- `progress.mjs`: preferencias globales y almacenamiento por curso/unidad/nivel.
- `engine.mjs`, `explore.mjs`, `play-engine.mjs`, `play.mjs` y `data/`: permanecen
  intactos; mantienen las comprobaciones, experimentos y juegos aprobados.
- `style.css`: conserva los estilos actuales y añade solo reglas del catálogo.
- `scripts/build.mjs`: `npm run build` prepara `dist/`, incluidos módulos, datos
  y audios; no requiere dependencias ni servidor y mantiene el hosting estático.

Para añadir una unidad: incorporar metadatos (curso, `id`, `level` si es LC,
`title`, descripción EN/ES y `status`); mantenerla en desarrollo mientras se
prepara. Crear o reutilizar su adaptador de contenidos y sus vistas, registrarlo
en el motor y aislar su estado de sesión antes de marcarla como `available`.
El adaptador deberá cargar y guardar con la identidad completa de la ruta.
El catálogo, las fichas, el parser y el almacenamiento se reutilizan: no copiar
la aplicación entera por unidad. La interfaz existente de U1 conserva su adaptador; U2 añade un adaptador limitado
a Learn A. No se generalizan los ejercicios de U1.

Una unidad completa solo es accesible si figura como `available`; un estado `partial`
abre únicamente sus rutas `overview` y `learn`. En ambos casos el motor debe estar registrado. El registro de identificadores de `catalogue.mjs` y el
registro de vistas de `app.js` deben actualizarse juntos. Cada nuevo adaptador
necesita regresiones de rutas, estado y contenido antes de habilitarse.

## Rutas estáticas

Se usan fragmentos URL para funcionar en GitHub Pages y otros alojamientos
estáticos sin reglas de servidor:

| Destino | Fragmento |
| --- | --- |
| Portada | `#home` |
| Curso | `#course/1st-year` |
| LC | `#course/lc` |
| LC HL / OL | `#course/lc/hl` / `#course/lc/ol` |
| U1 | `#course/1st-year/unit/1/overview` |
| Apartado de U1 | `#course/1st-year/unit/1/learn` (y otros apartados) |
| U2 Learn A | `#course/1st-year/unit/2/learn` |

Los antiguos `#learn`, `#explore`, `#practise`, `#communicate`, `#play`,
`#grammar`, `#vocabulary` y `#listening` siguen abriendo U1. `#unit` abre su
resumen. `#home` pasa a ser la portada de cursos. Las rutas válidas se normalizan
con `history.replaceState`, sin introducir pasos extra en el historial.
Una unidad pendiente, una sección aún no abierta de U2 o una unidad inexistente devuelve al
catálogo del curso/nivel; un curso desconocido devuelve a la portada. No se
renderizan actividades de U1 como sustituto de una unidad pendiente.
El progreso de Learn A permanece en la sesión y nunca se guarda como progreso de U1.
`#main` conserva el salto accesible al contenido. Atrás/adelante usan el
historial nativo y `hashchange`; no se necesita router externo.

## Progreso y compatibilidad

El guardado continúa siendo opcional y local al navegador. Sin consentimiento,
no se escribe en almacenamiento. La portada siempre abre el catálogo; el resumen
de U1 conserva el botón de continuación según los apartados practicados.

- Preferencias globales: `tapitas-preferences-v2` (versión e idioma).
- Unidad: `tapitas-unit-v2:<curso>:<nivel o common>:<unidad>`.
- Cada registro de unidad es schema 2 y agrupa `practice` (snapshot schema 1 del
  motor aprobado) y `play` (checkpoint schema 1 del motor aprobado).
- Se guardan idioma, último apartado de la unidad, apartados practicados, fecha
  de revisión y checkpoints ficticios de juegos. Las visitas a los catálogos no
  sobrescriben el último apartado con una ruta ajena a la unidad.
- No se guardan textos libres, reflexión, identidad ni respuestas a ejercicios.
  Los checkpoints de Play conservan su comportamiento anterior: no incluyen
  cada letra, cada diálogo ni la habitación abierta; al recargar se elige de
  nuevo el juego y se retoman los hitos guardados.
- `tapitas-orilla-v1` y `tapitas-play-v1` se leen exclusivamente como datos de
  1st Year U1 si no existe su registro v2. El siguiente guardado dentro de U1
  escribe el nuevo registro. Se conservan los originales como respaldo; una
  escritura fallida nunca los elimina. Si ya existe v2, es la fuente prioritaria.
- Desactivar el guardado o «Borrar la práctica guardada» elimina preferencias,
  todas las claves de unidades de Tapitas y ambos respaldos antiguos. Nunca se
  usa `localStorage.clear()` ni se borran datos de otras aplicaciones.
- Si el navegador bloquea el almacenamiento o hay JSON inválido, las actividades
  siguen funcionando y el diálogo de opciones muestra el aviso. Si falla una
  escritura, se desactiva el guardado de esa sesión.

El progreso de un dominio no se comparte con otro: una vista previa independiente
no puede leer el guardado del sitio original. La compatibilidad de migración se
verifica con datos antiguos en las regresiones y se aplicará en el dominio donde
ya se utilizaba la plataforma.

## Verificación y límites

`npm test`: 62 pruebas superadas (53 originales y 9 regresiones nuevas).
Incluyen renderizado EN/ES/bilingüe de catálogos y apartados, enlaces generados,
rutas antiguas, entradas inválidas, U2 bloqueada, migración, recarga, aislamiento
por unidad/curso/nivel, checkpoints, exclusión de datos privados, opt-in, borrado
y fallos de almacenamiento. Las regresiones existentes de actividades y audio
siguen pasando.

Las pruebas de vistas usan un DOM simulado en Node: no equivalen a una prueba de
navegador, lector de pantalla ni dispositivos reales. Esta rama conserva las
reglas responsive y el tratamiento de foco; no se han repetido las pruebas
manuales de móvil/iPad/ordenador que el docente hizo sobre la U1 anterior.
La vista previa usa una identidad de Site distinta, sin sustituir el sitio
original. La fusión en `main` requiere revisión y aprobación del docente.
