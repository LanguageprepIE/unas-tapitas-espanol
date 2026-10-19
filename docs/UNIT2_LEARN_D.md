# Learn D · Un día de colegio en España

## Alcance y fuentes

IES Bahía de Cádiz y Lucía son ficticios. La comparación utiliza el horario irlandés aprobado en `unit2-week-data.mjs` y un ejemplo posible de 1.º de ESO en Cádiz declarado en `unit2-day-data.mjs`. El ejemplo tiene 30 sesiones de 60 minutos y un recreo de 30 minutos; muestra una jornada de 08:15 a 14:45, pero no atribuye ese horario a todos los centros. El alumnado solo lee las horas digitales: no tiene que producirlas en español.

La [Orden andaluza de 30 de mayo de 2023](https://www.juntadeandalucia.es/boja/2023/104/36) establece 30 sesiones semanales de 60 minutos y enumera las materias de 1.º de ESO. Como ejemplo de una jornada local, el [IES La Caleta en Cádiz](https://blogsaverroes.juntadeandalucia.es/ieslacaleta/comienzo-de-curso-2025-26/) publicaba 08:15–14:45 en 2025/26. El horario de Lucía no representa al IES La Caleta ni copia su distribución de materias. En el ejemplo ficticio, Lucía cursa Francés como Segunda Lengua Extranjera, Computación y Robótica como optativa y Atención educativa.

## Cuatro experiencias

| Actividad | Implementación | Recursos |
| --- | --- | --- |
| 1. Un instituto en Cádiz | Tras presentar a Lucía, una tarjeta «¿Sabías que…?» sitúa los cuatro cursos de ESO y las opciones posteriores con edades orientativas; después, el contrato `cadizDiscovery` + `renderActivity` y `transition` de la biblioteca permite descubrir historia, geografía y educación física. El texto contextualiza los nombres completos de Geografía e Historia, Lengua Castellana y Literatura y Biología y Geología. | SVG de Learn B y MP3 ASI 05, 06 y 07. El reproductor dice únicamente la palabra breve mostrada. |
| 2. Dos jornadas, dos países | Interacción específica: selector de día, dos horarios y foco de comparación. El horario irlandés se importa de Learn B; el de Cádiz está en datos nuevos. | Ningún audio nuevo; horarios y etiquetas bilingües. |
| 3. Escucha y descubre | Contrato `cadizListening` + el mismo renderizador, transición, revelado y controlador de audio compartido. Dos audiciones de frases ya aprobadas; transcripción después de acertar. | EXP 09, «Hoy es lunes.» y EXP 12, «No me gustan las matemáticas.». Ambas frases mencionan elementos del horario mostrado. No se presentan como una grabación nueva de Lucía. |
| 4. ¿Todos los institutos son iguales? | Clasificación específica de cuatro tarjetas sobre lo que muestran los ejemplos y lo que no puede generalizarse; feedback inmediato. | Sin audio ni imágenes nuevos. |

No faltan recursos para estas cuatro experiencias. Si más adelante se desea que Lucía narre su horario particular, hará falta grabar guiones nuevos con transcripción exacta, por ejemplo «Soy Lucía. Estudio primero de ESO en Cádiz.» y «Hoy tengo Lengua Castellana y Literatura, Matemáticas y Geografía e Historia.». Esta fase no presenta esas frases como audios disponibles ni las usa en preguntas.

`unit2-day-data.mjs` contiene contenidos, horarios y respuestas; `unit2-day.mjs` contiene solo las interacciones propias de D y el montaje de la biblioteca; `unit2-day.css` presenta la comparación en dos columnas en ordenador y en una columna en pantallas estrechas. `app.js` registra D en la ruta Learn actual, sin crear una ruta nueva ni alterar el progreso; `scripts/build.mjs` incluye los tres archivos en `dist/`. Los módulos de A, B y C y los MP3 permanecen intactos.
