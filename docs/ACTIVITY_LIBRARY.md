# Biblioteca de actividades: primera fase

Esta fase es una demostración aislada en `/activity-library/demo.html`. No aparece en las rutas del alumnado ni cambia las unidades aprobadas. `activity-library/contract.mjs` valida datos; `renderer.mjs` contiene las dos interfaces y la lógica compartida; `demo-data.mjs` contiene cuatro instancias, dos de cada formato. No hay dependencias externas.

## Contrato

Una actividad tiene `id` único, `kind` (`illustrated-discovery` o `listen-choose-reveal`), `section` (Learn, Explore, Practise, Communicate o Play), `objective` e `instructions` como `{en, es}`, e `items` no vacíos con identificadores únicos. En cada objeto traducible son obligatorios ambos idiomas. `localize` muestra inglés, español o ambos (`en`, `es`, `bi`). `validateActivity` lanza un error con la ruta del dato defectuoso antes de renderizar.

| Formato | Datos de cada elemento | Revelado y avance |
| --- | --- | --- |
| Descubrimiento ilustrado | `id`, `label: {en,es}`, `image: {src,symbol,alt:{en,es}}`, `audio: {src,transcript}` | La palabra y el reproductor aparecen tras seleccionar la imagen. Cada selección cambia el elemento descubierto. La transcripción del MP3 debe ser exactamente `label.es`. |
| Escucha, elige y revela | `id`, `question: {en,es}`, `audio`, `options: [{id,label:{en,es},image?}]`, `answer` (ID), `feedback: {correct:{en,es},incorrect:{en,es}}`, `reveal: {transcript}` | El audio se presenta primero. Una respuesta incorrecta permite reintentar; solo un acierto habilita avanzar. `transcript` admite `after-correct`, `after-answer` y `never`. |

`src` se escribe desde la raíz del repositorio (`assets/...svg` o `assets/...mp3`); el renderizador añade el prefijo relativo de la página. Las imágenes son símbolos de los SVG existentes; `alt` describe el dibujo en ambos idiomas. `audio.transcript` reproduce exactamente la grabación aprobada, incluida la puntuación cuando procede. Un validador no puede escuchar un MP3: la revisión de fidelidad oral sigue siendo pedagógica; las pruebas cruzan las transcripciones de esta demo con los datos aprobados y verifican la existencia de los archivos.

El estado se crea con `initialState()`: `{index, selected, attempts, status}`. `status` pasa por `ready`, `revealed` (imagen), `incorrect`, `correct`, `complete` (escucha). `transition()` ignora opciones desconocidas y bloquea `next` antes del acierto. El reproductor compartido pausa los otros audios de la página al comenzar uno, pausa antes de cambiar contenido o idioma, y anuncia los errores de carga en un mensaje accesible. Los controles HTML nativos permiten pausa, repetición y uso por teclado.

## Añadir contenidos sin tocar la interfaz

Para añadir otra instancia a esta demostración, edita **solo `activity-library/demo-data.mjs`**: agrega otro objeto a `demonstrations` con la forma de una instancia del mismo `kind`, sustituye objetivo, instrucciones, elementos, opciones, respuesta, feedback, rutas y transcripciones por contenidos aprobados. Se montará automáticamente en `demo.mjs`; no copies ni edites `renderer.mjs`, `contract.mjs`, `demo.html` ni `demo.css`. Usa símbolos SVG existentes y MP3 aprobados. Ejecuta `npm test` y `npm run build`. El recurso referenciado debe estar ya en `assets/` y su transcripción debe verificarse con el inventario aprobado. Para una futura sección real, crea su archivo de datos y llama a `mountActivity` desde su punto de montaje **después** de la revisión docente; esta fase no añade rutas al alumnado.

La página contiene dos instancias de descubrimiento (objetos del aula, transporte) y dos de escucha (objeto, distancia). Son ejemplos con datos de Learn A y C de la Unidad 2, sin modificar esos bloques. Las otras seis propuestas de la auditoría y las experiencias especiales quedan pendientes.
