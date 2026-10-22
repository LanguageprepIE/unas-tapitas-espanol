# Explore Unidad 2

Diseño aprobado por el profesor el 22 de octubre de 2026. Implementación conjunta de los cuatro laboratorios, pendiente de revisión docente antes de fusionar.

- A: comparar cantidad, artículo y nombre; conservar un modelo; regulares, lápiz/lápices, sacapuntas y el plural léxico tijeras. Los intentos no bloquean la experimentación.
- B: dos personas con citas en primera persona, asignaturas y preferencias independientes. Cambiar los nombres conserva las frases; intercambiar asignaturas permite observar gusta/gustan. Sin nuevas formas te/le ni intensificadores.
- C: cinco días editables, selección y movimiento de clases, adición y eliminación (1–8), comienzo, duración y descansos. Recalcula intervalos contiguos y salida. Copiar estructura conserva las materias de cada día en las casillas existentes. Vista terminada de semana y alternativa diaria en móvil. Horas digitales exclusivamente.
- D: escena de casa/colegio, distancia y transporte; tiempos ficticios tabulados, sin simulación de tráfico ni velocidades. Comparación con un trayecto conservado; ejemplos de tiempos iguales entre transportes y tiempos diferentes entre lugares lejanos.

## Reutilización y límites

Importa los objetos de Learn A, las asignaturas y semana de Learn B y los transportes de Learn C. Reutiliza sus tres sprites SVG. Los módulos, estilos, datos e imágenes de Learn A–D y todos los MP3 permanecen intactos. No hay grabaciones nuevas ni síntesis de voz. La biblioteca de PR #10 se revisó: sus dos formatos cerrados no se fuerzan sobre estas experiencias; la sección utiliza los controles de idioma y navegación ya existentes. No se introduce un motor genérico de horarios ni simuladores.

La integración habilita únicamente overview/learn/explore para U2 y añade acceso desde el curso, portada de unidad y navegación de Learn. Practise, Communicate y Play siguen pendientes. Estado solo en memoria de página; ningún perfil ni dato personal. Las opciones de guardado previas de U1 se mantienen aisladas. Cada laboratorio recuerda sus selecciones al cambiar idioma, sección o laboratorio dentro de la misma carga. Recargar o cerrar reinicia los experimentos.

Botones nativos y selectores etiquetados, sin depender de arrastre. Foco conservado al editar; foco de sección al cambiar laboratorio; anuncios con el modelo o resultado actual mediante la región persistente. Selección visible con texto/atributos y color. Vista de semana desplazable por teclado y vista diaria en móvil. No hay puntuaciones ni puertas de acierto.

## Validación

- `npm test`: 110 pruebas correctas, incluyendo concordancia y excepciones, preferencias, límites de parámetros, intervalos de horario sin solapamientos, independencia de días, escenarios de trayecto, modos lingüísticos, rutas y conservación de estado.
- `npm run build`: correcto; módulos y CSS nuevos incluidos en dist.
- `git diff --check`: correcto.
- Las pruebas existentes mantienen su cobertura de audios aprobados, integridad, transcripciones y bloques A–D/U1. Solo se actualizan las expectativas de acceso a Explore y la etiqueta de disponibilidad del curso.
- Revisión funcional en navegador de escritorio: cambio de cantidad/artículo/nombre; horario y aumento del recreo (salida 15:55 → 16:10); vista semanal terminada; simulador y comparación de tiempos iguales; conservación al cambiar a bilingüe. Pendiente de prueba docente en iPad/móvil y con lector de pantalla real. La inspección del árbol accesible no equivale a esa prueba.

Vista privada única de revisión; no publicar esta rama sobre la web de main ni fusionar hasta autorización expresa del profesor.

## Ajustes tras la revisión docente

El profesor aprobó las cuatro experiencias y pidió impresión del horario y duración editable del trayecto. La vista terminada ofrece cuatro estilos (Océano, Coral, Cuaderno y Blanco y negro), con vista previa y un botón de impresión nativa para imprimir o guardar como PDF. La hoja incluye exclusivamente los cinco días, sus intervalos, asignaturas, descansos y salida; las reglas de impresión solicitan A4 horizontal. Se mantiene la alternativa diaria en pantallas pequeñas. Los estilos no alteran el contenido del horario. No se abre una ventana nueva ni se envían datos.

La duración permite elegir 5, 10, 15, 20 o 30 minutos, conservando las formas trabajadas. El valor elegido permanece al cambiar distancia o transporte; «Usar el tiempo del ejemplo» restaura el comportamiento original del simulador. La frase, la escena, el anuncio accesible y la comparación usan el mismo valor.

Validación actualizada: 113 pruebas; compilación correcta. Comprobados en navegador el selector de estilo y la vista de hoja, la duración personalizada y su conservación al cambiar transporte e idioma. El entorno no muestra el diálogo nativo de impresión: la paginación y salida física requieren comprobación en el dispositivo docente. Los contenidos y audios aprobados permanecen sin cambios.
