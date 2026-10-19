# Learn C — ¿Cómo voy al colegio?

## Punto de partida y alcance

Verificado `main` en `2ede0c779825ef04dc290f5e4a0080b30c6cd998`: A y B ya
integrados, PR #8 fusionado. Rama nueva `feature/unit2-learn-journey`; revisión
en PR en borrador, sin fusión autorizada. No se modifica el contenido de U1 ni
los módulos, datos, CSS, ilustraciones o audios aprobados de A/B.

Referencia curricular cotejada: programación adjunta «1st Year Units of Learning»,
Unidad 2 «El aula», que incluye ir al colegio, `ir`, frases negativas y
«¿Cómo vas al colegio?». Los textos y las ilustraciones de esta entrega son
originales; no se reproduce material del libro citado en esa programación.
Las duraciones son la ampliación funcional solicitada por el profesor, sin
adelantar la enseñanza de la hora reservada para una unidad posterior.

1. **Una mañana en el instituto:** escena original a color. Seis estudiantes
   ficticios seleccionables; aparece su modelo y la grabación disponible.
2. **¿Cómo lo dices?:** laboratorio de construcción de respuestas, diferenciado
   de la escena visual. El alumnado elige si quiere expresar rutina, motivo o
   contraste y hace crecer una expresión aislada en tres pasos: `en autobús` →
   `Voy en autobús` → `Normalmente voy en autobús`. No puntúa ni funciona como
   cuestionario. El feedback explica qué significado añade cada componente.
3. **Voy, vas, va:** situaciones de primera, segunda y tercera persona;
   también `vivo/vives/vive` y `tardo/tardas/tarda` dentro de frases. Se leen
   modelos completos sin tablas de conjugación. La hermana y los tiempos son
   ejemplos inventados, independientes de Marcos.
4. **¿Cuánto tardas?:** trayecto imaginario guiado; transporte, cerca/lejos/
   bastante lejos, 5/10/15/20/30 minutos. Respuesta corta → motivo → duración.
   Opción `unos` y equivalencia 30 minutos / media hora. No se enseñan horas.
   Las elecciones no imponen una relación universal entre transporte y distancia.
5. **Escucha a Marcos:** Listening 4 original, controles nativos para repetir
   y un único reconocimiento opcional con imágenes. Feedback solo tras elegir;
   sin transcripción ni pistas sobre la respuesta antes de contestar. Los nombres
   accesibles describen las imágenes para usuarios de lectores de pantalla.

Estado solo en memoria; no cuentas, entradas personales ni persistencia del
trayecto. Instrucciones EN/ES/bilingües. Botones nativos y foco conservado al
cambiar opciones; foco en el título al cambiar de momento. Una grabación fallida
muestra aviso visible y no activa voz sintética. No se cambian los cinco apartados
Learn → Explore → Practise → Communicate → Play; los posteriores de U2 siguen pendientes.

## Audios existentes utilizados

El inventario original permanece intacto. Tras la revisión auditiva docente, el
clip TRA 05 deja de considerarse utilizable pese a superar ASR y decodificación.
Las 11 referencias todavía activas se verifican contra sus SHA-256 y se decodifican
completas con FFmpeg, sin recodificar, cortar ni cambiar velocidad.
El informe reproducible está en `learn-block-c-audio-validation.json`.

| Archivo | Texto grabado | Uso |
| --- | --- | --- |
| `1Y_U02_AUD_TRA_01_v1.mp3` | a pie | Expresión existente, referencia del banco |
| `1Y_U02_AUD_TRA_02_v1.mp3` | andando | Alternativa al modelo escrito «Voy andando» |
| `1Y_U02_AUD_TRA_03_v1.mp3` | en autobús | Expresión, no frase completa |
| `1Y_U02_AUD_TRA_04_v1.mp3` | en coche | Clip aprobado corregido; expresión |
| `1Y_U02_AUD_TRA_06_v1.mp3` | en tren | Expresión, no frase completa |
| `1Y_U02_AUD_TRA_08_v1.mp3` | en patinete eléctrico | Expresión existente, referencia del banco |
| `1Y_U02_AUD_EXP_13_v1.mp3` | ¿Cómo vas al colegio? | Pregunta completa |
| `1Y_U02_AUD_EXP_14_v1.mp3` | Voy a pie. | Modelo completo |
| `1Y_U02_AUD_EXP_15_v1.mp3` | Voy en patinete eléctrico. | Modelo completo |
| `1Y_U02_AUD_EXP_16_v1.mp3` | No voy en coche. | Contraste negativo completo |
| `1Y_U02_AUD_LIS_04_transporte_v1.mp3` | Marcos | Listening original |

Son 11 recursos activos (incluidas las expresiones de a pie y patinete
cuyo modelo completo tiene prioridad en el reproductor); no son audios nuevos.
Los TRA están en `assets/audio/unit2/vocabulary/transport/`, EXP en
`assets/audio/unit2/expressions/`, LIS en `assets/audio/unit2/listenings/`.
JR consta en el inventario para TRA, Laura López para EXP y Vértice para este
Listening 4 ya aprobado. Solo se reutiliza el original de Marcos.

### Retirada de «en bicicleta»

La interfaz cargaba realmente `1Y_U02_AUD_TRA_05_v1.mp3`, SHA-256
`b5ee0c5369b7a24b47e48afbaa5fe78fdacf10b5b10fb05bce5cd16a4ee521b4`.
El inventario decía expresamente «sin revisión auditiva humana». El profesor ha
oído una vocal añadida al final, parecida a «bicicletae»; esta escucha invalida
las comprobaciones automáticas anteriores. El archivo se conserva sin cambios y
es recuperable en Git, pero Learn C ya no lo referencia. Su sustituto tendrá el
nombre `1Y_U02_AUD_TRA_05_v2.mp3`; solo se activará después de escucharlo.

Actualización: el profesor proporcionó un MP3 individual con la voz María Díaz.
La v2 se decodifica íntegramente (1,149375 s), SHA-256
`b7a9af5fd4ddbc13af579fc973673d995a20fd4580a357103ea87c720fcf0b3b`.
Learn C reproduce la v2 para la expresión «en bicicleta»; la v1 rechazada
permanece intacta y sin referencias activas. La frase visual «Voy en bicicleta»
es un modelo escrito y el reproductor identifica expresamente que solo dice
«en bicicleta». Las otras 14 grabaciones del manifiesto siguen pendientes.

### Marcos — comprobación de contenido

Duración **21.368163 s**, SHA-256
`3c734e8829b85ad67dcb23b57603e4e241e212ea26d528e8cd40822df9862a93`.
Coincide con el inventario; decodificación íntegra correcta. Transcripción local
automática usada para cotejar contenido (no se muestra en la actividad):

> Hola, soy Marcos. Voy al instituto a pie porque vivo cerca. Mi hermana va en
> bicicleta. Mi amiga Sara va en autobús porque vive lejos. A veces mi amigo Leo
> va en coche con su padre, pero normalmente va en patinete eléctrico. En mi
> instituto hay estudiantes que vienen en tren. ¿Y tú? ¿Cómo vas al colegio?

No contiene duraciones. Solo se pregunta cómo va Marcos; los tiempos inventados
de otros momentos no se atribuyen al audio. Voz, velocidad y bytes intactos.

### Manifiesto de grabaciones aprobadas

El manifiesto estructurado `learn-block-c-audio-manifest.json` contiene **15 MP3**:
la corrección TRA 05 v2 aportada por el profesor y 14 expresiones completas EXP 17–30
generadas por separado con María Díaz. Incluye texto exacto, nombre, ruta, finalidad,
hash y cuatro grabaciones existentes que no deben duplicarse. Es el conjunto mínimo reutilizable que cubre la nueva Actividad 2,
`vivo/vives`, `tardo/tardas`, `voy/vas/va` y los modelos prioritarios.

El docente escuchó y aprobó las 15 tomas el 19 de octubre de 2026. El banco
permanece en el manifiesto y el inventario; Learn C usa las grabaciones que
corresponden a cada actividad y ya no muestra el panel desplegable completo.
La actividad 4 permite descubrir cinco frases grabadas antes de mostrar su
texto y construir una respuesta personal para leer y decir en voz alta.

Se produjo y recuperó un único maestro en ElevenLabs, flujo
`LD8AZgKualXT9mM3OBEG`, con Alberto (`PFT8NrCPtO9yltPvubes`). El entorno permite
inspeccionar su formato y transcripción, pero no realizar una escucha humana real.
Ese maestro **no se dividió ni se integró**. Posteriormente se generaron catorce
archivos individuales con María Díaz, posteriormente escuchados y aprobados por
el docente. La v1 defectuosa de «en bicicleta» no
aparece en la interfaz; la v2 aportada por el profesor se mantiene separada.

## Continuidad documentada, sin implementar

Ver [hoja de ruta](../HOJA_DE_RUTA.md): Explore con laboratorio de patrones y
duraciones; Practise con Marcos y actividades de distancias/tiempos; Communicate
«Mi camino al colegio» sobre el trayecto real; Play pendiente de juego original.
Se conserva también lo acordado para horarios y Lucía del Bloque B.

## Comprobaciones y revisión pendiente

- `npm test`: **89 pruebas correctas**, incluidas regresiones U1/A/B, navegación
  C en los tres idiomas, diferenciación de las Actividades 1 y 2, retirada de
  TRA 05 v1, integridad de las tomas aprobadas, límites de estado y feedback.
- `npm run build`: correcto; distribuye módulos, CSS, ilustraciones y MP3.
- `git diff --check`: correcto. Decodificación FFmpeg y hashes de 26 referencias
  correctos. Los cuatro listenings y todo el banco existente se mantienen iguales.
- Ilustraciones revisadas en una lámina renderizada: colores propios, transporte
  reconocible, conductor/pasajero y cascos en bicicleta/patinete. CSS local a C con
  puntos de adaptación a 760 y 450 px; sin cambios al estilo de A/B.
- **Pendiente de revisión manual real:** presentación completa y desbordamientos
  en ordenador, iPad Safari y móvil; toque, audio/repetición, teclado/lector de
  pantalla y comprensión pedagógica. No hay navegador de QA disponible en este
  entorno; las pruebas de renderizado automatizadas no equivalen a verificar
  layout ni reproducción en esos dispositivos. La aprobación en iPad de B no
  se presenta como aprobación de C.

La vista previa es independiente del sitio aprobado. Abrir Unit 2 → Learn →
**C · ¿Cómo voy al colegio?**. No fusionar hasta revisión del profesor.
