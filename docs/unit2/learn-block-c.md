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
2. **¿Cómo vas al colegio?:** seis modos contextualizados, a pie / andando,
   pregunta grabada y contraste opcional «No voy en coche».
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

El inventario original permanece intacto. Rutas verificadas contra sus SHA-256 y
decodificación completa con FFmpeg, sin recodificar, cortar ni cambiar velocidad.
El informe reproducible está en `learn-block-c-audio-validation.json`.

| Archivo | Texto grabado | Uso |
| --- | --- | --- |
| `1Y_U02_AUD_TRA_01_v1.mp3` | a pie | Expresión existente, referencia del banco |
| `1Y_U02_AUD_TRA_02_v1.mp3` | andando | Alternativa al modelo escrito «Voy andando» |
| `1Y_U02_AUD_TRA_03_v1.mp3` | en autobús | Expresión, no frase completa |
| `1Y_U02_AUD_TRA_04_v1.mp3` | en coche | Clip aprobado corregido; expresión |
| `1Y_U02_AUD_TRA_05_v1.mp3` | en bicicleta | Clip aprobado corregido; expresión |
| `1Y_U02_AUD_TRA_06_v1.mp3` | en tren | Expresión, no frase completa |
| `1Y_U02_AUD_TRA_08_v1.mp3` | en patinete eléctrico | Expresión existente, referencia del banco |
| `1Y_U02_AUD_EXP_13_v1.mp3` | ¿Cómo vas al colegio? | Pregunta completa |
| `1Y_U02_AUD_EXP_14_v1.mp3` | Voy a pie. | Modelo completo |
| `1Y_U02_AUD_EXP_15_v1.mp3` | Voy en patinete eléctrico. | Modelo completo |
| `1Y_U02_AUD_EXP_16_v1.mp3` | No voy en coche. | Contraste negativo completo |
| `1Y_U02_AUD_LIS_04_transporte_v1.mp3` | Marcos | Listening original |

Son 12 recursos referenciados (incluidas las expresiones de a pie y patinete
cuyo modelo completo tiene prioridad en el reproductor); no son audios nuevos.
Los TRA están en `assets/audio/unit2/vocabulary/transport/`, EXP en
`assets/audio/unit2/expressions/`, LIS en `assets/audio/unit2/listenings/`.
JR consta en el inventario para TRA, Laura López para EXP y Vértice para este
Listening 4 ya aprobado. Solo se reutiliza su original; no hay generación nueva.

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

### Recursos sin grabación equivalente completa

No bloquean la exploración escrita. No se crean sustitutos ni se combinan clips
para aparentar nuevas frases.

- «Voy andando», «Voy en bicicleta», «Voy en autobús», «Voy en coche» y «Voy en
  tren»: se ofrece la expresión exacta existente, claramente rotulada, junto al
  modelo escrito completo. «Normalmente voy en coche con mi padre» se lee y el
  reproductor identifica únicamente «en coche».
- Los intercambios nuevos de `voy/vas/va`, `vivo/vives/vive` y `tardo/tardas/tarda`
  (excepto la pregunta EXP 13), preguntas de duración/distancia, `normalmente`,
  `porque`, modelos de cerca/lejos y duraciones de 5/10/15/20/30 minutos,
  «unos…» y «media hora»: presentación escrita, sin botón que prometa su lectura.
  El listening contiene algunos de estos patrones en su contexto original, sin
  extraer ni atribuirle un modelo nuevo.

## Continuidad documentada, sin implementar

Ver [hoja de ruta](../HOJA_DE_RUTA.md): Explore con laboratorio de patrones y
duraciones; Practise con Marcos y actividades de distancias/tiempos; Communicate
«Mi camino al colegio» sobre el trayecto real; Play pendiente de juego original.
Se conserva también lo acordado para horarios y Lucía del Bloque B.

## Comprobaciones y revisión pendiente

- `npm test`: **87 pruebas correctas**, incluidas regresiones U1/A/B, navegación
  C en los tres idiomas, modelos, límites de estado y feedback sin anticipación.
- `npm run build`: correcto; distribuye módulos, CSS, ilustraciones y MP3.
- `git diff --check`: correcto. Decodificación FFmpeg y hashes de 12 referencias
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
