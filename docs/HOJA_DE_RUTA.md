# Hoja de ruta y decisiones — Unas Tapitas de Español

**Última comprobación del estado:** 15 de noviembre de 2026
**Repositorio:** `LanguageprepIE/unas-tapitas-espanol` (público)

## Estado confirmado en main

- **Unidad 1:** completa y aprobada; Learn, Explore, Practise, Communicate y Play. Explore contiene seis laboratorios (PR #2); Play ofrece tres aventuras tras la revisión docente (PR #4). Practise y Communicate quedan protegidos como contenido aprobado. Los dos listenings originales, verificados byte a byte en la migración, y los 29 MP3 de Explore siguen en el repositorio. El docente probó la unidad en dispositivos reales; ello no certifica accesibilidad ni compatibilidad universal.
- **Unidad 2:** Learn A–D y cuatro laboratorios de Explore. Learn A usa 20 clips de objetos y siete expresiones, con SVG de objetos y escuchas por imagen; Learn B consta en la PR #8; [Learn C](unit2/learn-block-c.md) recoge su evolución, incluido el audio de bicicleta; [Learn D](UNIT2_LEARN_D.md) y [Explore](unit2/explore.md) se integraron en las PR #11 y #12. La impresión del horario se confirmó en Safari del iPad; el visor de ChatGPT no abrió el diálogo durante la revisión docente.
- **Pendientes:** Practise, Communicate y Play de U2; las unidades de 2nd Year, 3rd Year y LC HL/OL; Game Zone común. Las portadas de los cursos futuros ya son visibles.
- **Historial:** el proyecto anterior se guardó en la rama `backup-before-tapitas-migration-2026-10-17`. La PR #3 de cultura se descartó y cerró sin fusionar; esto no afecta al apartado de cultura existente en Learn. El [README anterior](https://github.com/LanguageprepIE/unas-tapitas-espanol/blob/87ba93d9bfb1c8e0ac96cfdba1f48d6c35afd946/README.md) conserva el relato íntegro de aquella etapa.
- **Criterios permanentes:** materiales originales, aprendizaje activo y en espiral, feedback formativo, español peninsular como referencia, apoyo lingüístico graduado, accesibilidad y pocas dependencias. Enseñar `ser` y `estar` según el significado y la construcción en contexto; evitar la regla «permanente frente a temporal».

Las notas que siguen conservan el diseño y las decisiones de las fases de octubre. Sus antiguos «pendientes» y recuentos de pruebas describen aquellas entregas; el estado actual es el de arriba.

## Arquitectura pedagógica acordada

Cada unidad tendrá cinco espacios:
1. **Learn** — adquirir lenguaje y modelos.
2. **Explore** — manipular el idioma y descubrir patrones con experimentación sin penalizaciones.
3. **Practise** — consolidar con ejercicios y feedback.
4. **Communicate** — utilizar el español en tareas comunicativas reales.
5. **Play** — juegos motivadores relacionados con la unidad (sin obligación de completarlos).

Además, una **Game Zone** independiente permitirá reutilizar motores de juegos por nivel, unidad y contenidos. Todos los juegos comparten navegación básica, pero **cada uno tendrá identidad visual propia**.

## 1st Year · Unidad 1: Hola y bienvenidos

- **Learn:** diez apartados revisados en el prototipo original.
- **Practise:** aprobado tras revisión del docente; **no modificar** salvo nueva petición.
- **Communicate:** aprobado tras revisión del docente; **no modificar** salvo nueva petición.
- **Listening:** dos MP3 definitivos subidos a `assets/audio/` y verificados bit a bit con los archivos del ZIP original.
- **Explore:** ampliar de la actividad original a **seis laboratorios**:
  1. **Greetings Lab:** contexto, saludo/despedida y pertinencia cultural.
  2. **Spanish Sounds Lab:** escuchar, comparar y descubrir patrones en j, ñ, ll, h, etc.
  3. **Number Machine:** números de 0 a 20, patrones y comprensión auditiva.
  4. **Change the Person:** reutilizar y ampliar el laboratorio original con *me llamo/se llama*, *tengo/tiene*, *estoy/está*.
  5. **Conversation Builder:** transformar preguntas/respuestas y construir respuestas completas.
  6. **The Question Machine / La máquina de preguntas:** manipular preguntas y relacionarlas con respuestas.
- **Incidencia detectada:** `speechSynthesis`/voz del navegador no funciona en un Android del docente. Sustituir los botones de audio por archivos reales reproducibles en navegadores de Android, iPad y PC; preferir voz española peninsular clara y controles por palabra. **Actualización:** ya hay 29 MP3 de Explore en el repositorio; Play los conserva, junto con los dos listenings originales.

## Play: primera selección

1. **Anagramas con sorpresa:** ordenar letras **y** aplicar la palabra a frases/situaciones reales.
2. **Conversaciones imposibles:** situaciones cómicas, decisiones y consecuencias; un extraterrestre que aprende a saludar puede servir como narrativa inicial.
3. **Código secreto:** pequeños desafíos lingüísticos tipo escape room.

Otros motores potenciales: **El detective lingüístico** y **La fábrica de frases**. No convertir todos los juegos en cuestionarios camuflados, ni acumular sopas de letras convencionales. Humor, sorpresas y experimentación; dificultad progresiva.

## Orden técnico

- [x] Elegir repositorio público sin el sufijo «2».
- [x] Salvar proyecto anterior en una rama de seguridad y limpiar `main`.
- [x] Verificar que los dos MP3 originales ya están en `assets/audio/`.
- [x] Importar el código original del ZIP (sin sobrescribir MP3).
- [x] Comprobar rutas de audio y pasar los tests originales.
- [x] Integrar los seis laboratorios de Explore con el diseño existente (PR #2 fusionada).
- [ ] Reemplazar los audios generados por el navegador; crear y validar audios de pronunciación si procede.
- [x] Crear la primera versión jugable de Play y sus tres juegos en rama de revisión (ver PLAY_UNIDAD_1.md).
- [x] Revisión docente de Play y aprobación para integrar tras aclarar Conversaciones imposibles.
- [ ] Completar pruebas de accesibilidad y dispositivos reales.
- [ ] Crear Game Zone y mecanismos de reutilización por curso.
- [ ] Probar accesibilidad, móvil/iPad/PC y publicar.

**Estado actualizado:** Explore está en `main` tras la PR #2. Play ha sido probado por el profesor, con mejora de orientación en Conversaciones imposibles y aprobación para integrar. La PR #3 de cultura sigue siendo un trabajo separado; no se incluye ni modifica en esta entrega. La validación automatizada de Play no sustituye las pruebas visuales, de accesibilidad ni de aula.


## Preparación multicurso — integrada

Portada de cuatro itinerarios (1st, 2nd, 3rd Year y LC con HL/OL), catálogo
ampliable, U1 completa y U2 «El aula» con Learn A y B. El progreso
se aísla por curso/unidad/nivel y mantiene compatibilidad con U1.
Ver [arquitectura y regresiones](ARQUITECTURA_NAVEGACION.md).
La navegación multicurso ya está integrada. La ampliación de Learn B cuenta con
77 pruebas automatizadas y aprobación docente en iPad, además de una vista previa
independiente. Las nuevas entregas requieren revisión y aprobación docente.

## 1st Year · Unidad 2: El aula

### Learn — estado consolidado el 19 de octubre de 2026

- **Bloque A — ¿Qué hay en mi mochila?:** desarrollado y aprobado. Se conservan
  su contenido, ilustraciones y audios.
- **Bloque B — Mi semana escolar (PR #8):** probado y aprobado por el profesor
  en iPad; autorizada su fusión tras las comprobaciones finales. Incluye 18
  asignaturas con audio, días, preferencias y el horario ficticio de Álex: seis
  clases de lunes a jueves y cuatro el viernes, con descansos diferenciados.
- **Listening 3 — Lucía / Mi semana de clases:** original aprobado restaurado
  byte a byte, con Matilda Paz según confirmación del profesor. En Learn se
  mantiene como primera exposición al idioma y reconocimiento de palabras,
  sin añadir ahora preguntas ni modificar su grabación.
- **Bloque C — ¿Cómo voy al colegio?:** implementación en rama independiente
  siguiendo el diseño solicitado por el profesor; pendiente de revisión docente.
  Cinco momentos de descubrimiento, Actividad 2 revisada como laboratorio de
  construcción de respuestas, modelos graduados y Listening 4 original de Marcos.
  El audio defectuoso «en bicicleta» está retirado de la interfaz y existe un
  [manifiesto de 15 originales pendientes](unit2/learn-block-c-audio-manifest.json).
  Ver [alcance, audios y comprobaciones](unit2/learn-block-c.md).

### Explore — futuro laboratorio de horarios personalizables

Decisión acordada, **pendiente de diseño e implementación**. El alumnado podrá
manipular un horario de ejemplo, elegir asignaturas y cambiar su distribución
entre los días para observar cómo cambian frases como «El martes tengo español
y matemáticas» y «Tengo cuatro clases». El propósito será experimentar y
descubrir patrones con apoyo, antes de trabajar sobre su propio horario.

Las horas se mostrarán **solo en formato digital**, por ejemplo `09:00–10:00`,
como referencia visual. En esta fase no se enseñará cómo decir las horas en
español ni se exigirá producir expresiones como «a las nueve».

### Practise — futura comprensión auditiva de Lucía

Reutilizar el **mismo Listening 3 original** que aparece en Learn B para crear
actividades de comprensión auditiva con preguntas y feedback después de
responder. Trabajar datos presentes en la grabación: días, asignaturas y
preferencias de Lucía. Permitir volver a escuchar y evitar revelar las respuestas
antes de que el estudiante conteste. La grabación es la misma; no se regenerará
ni se adaptará para estas actividades. Las preguntas y el feedback se diseñarán
al desarrollar Practise, sin añadirlos ahora a Learn.

### Communicate — continuación con el horario real del alumnado

Tras el laboratorio de Explore y la consolidación en Practise, el alumnado
creará su **horario escolar real** con sus días y asignaturas, incluidas las
optativas que efectivamente curse. Utilizará ese horario para preguntar y
responder sobre sus clases, cantidades y preferencias, con modelos accesibles
como «¿Qué asignaturas tienes el martes?» y «El viernes tengo cuatro clases».

También aquí las horas aparecerán únicamente en formato digital: comprender
y comunicar días, asignaturas y cantidades será el objetivo, sin enseñar todavía
cómo decir la hora en español. Esta continuación queda documentada para su
futuro diseño; no se implementa en el PR #8.

### Continuidad de Learn C — decisiones para implementar más adelante

- **Explore:** laboratorio de `voy`, `vas`, `va`, transportes y duraciones.
  Cambiar componentes para observar cómo cambia el significado. Usar minutos
  de duración; no enseñar aún cómo decir la hora del reloj.
- **Practise:** comprensión auditiva del **Listening 4 original de Marcos**, con
  preguntas y feedback posterior a responder, sin anticipar las respuestas.
  Preguntar solo por datos realmente presentes: transportes, personas y motivos;
  el audio no proporciona tiempos de trayecto. Consolidar por separado preguntas
  y respuestas de transporte, distancia y duración con ejemplos identificados
  como tales, sin atribuirlos a Marcos.
- **Communicate — «Mi camino al colegio»:** explicar el trayecto real con
  respuestas completas: cómo voy, cuánto tardo, si vivo cerca o lejos y,
  opcionalmente, con quién voy. Ofrecer apoyos de distintos niveles; no exigir
  a todos la misma complejidad. Diseñar sin cuentas ni recogida de datos personales.
- **Play:** valorar un juego original sobre desplazamientos al colegio, evitando
  repetir mecánicamente los ejercicios anteriores. Pendiente de diseño pedagógico.

Esta entrega implementa **solo Learn C**. Las cuatro continuaciones anteriores
quedan documentadas y no añaden actividades ni rutas funcionales nuevas.
