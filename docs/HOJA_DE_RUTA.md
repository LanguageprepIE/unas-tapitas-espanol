# Hoja de ruta y decisiones — Unas Tapitas de Español

**Fecha:** 18 de octubre de 2026  
**Repositorio:** `LanguageprepIE/unas-tapitas-espanol` (público)

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
  6. **Spanish Around the World:** nombres, saludos y variedad del mundo hispanohablante sin estereotipos.
- **Incidencia detectada:** `speechSynthesis`/voz del navegador no funciona en un Android del docente. Sustituir los botones de audio por archivos reales reproducibles en navegadores de Android, iPad y PC; preferir voz española peninsular clara y controles por palabra. **Los audios nuevos de pronunciación aún no existen**.

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
- [ ] Integrar los seis laboratorios de Explore con el diseño existente.
- [ ] Reemplazar los audios generados por el navegador; crear y validar audios de pronunciación si procede.
- [ ] Desarrollar Play y sus tres primeros juegos.
- [ ] Crear Game Zone y mecanismos de reutilización por curso.
- [ ] Probar accesibilidad, móvil/iPad/PC y publicar.

**Estado importante:** el prototipo original (incluido Explore en su versión inicial) está en `main` y ha superado sus pruebas. Los seis nuevos laboratorios de Explore aún no se han integrado. Ninguna actividad nueva debe declararse publicada antes de probarla en el proyecto conjunto.
