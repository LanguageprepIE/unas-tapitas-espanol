# Unas Tapitas de Español 2.0 — Validación de la Unidad 1

Fecha: 17 de octubre de 2026. Fase 4 iniciada; validación parcial del prototipo privado Orilla. Este documento registra comprobaciones de código y contenido; no sustituye las pruebas con alumnado y dispositivos reales.

## Decisiones confirmadas por el profesor

- Diseñar una progresión de tres años: la orientación adoptada para la nueva cohorte de 1st Year continuará con esa cohorte en 2nd y 3rd Year. Las programaciones anteriores son referencias que deben interpretarse según la cohorte; no justifican mantener dos productos pedagógicos separados permanentemente.
- Incorporar tareas orientadas a la acción con un propósito comunicativo y un resultado identificable. Una tarea de la plataforma no se presentará como un CBA oficial por el mero hecho de ser comunicativa.
- Aplicar los requisitos de evaluación vigentes que correspondan a cada cohorte. Esta aclaración del profesor no modifica por sí sola los requisitos oficiales ni constituye una nueva verificación normativa.
- Los role plays de Leaving Certificate los proporcionará el profesor cuando se desarrollen los módulos correspondientes. Su disponibilidad no bloquea la Unidad 1 ni obliga a reproducirlos ahora.
- Mantener English, Bilingual y Español, con apoyo en inglés accesible y sin perder el trabajo al cambiar de modo.

Son decisiones del proyecto y aclaraciones del profesor. No se atribuyen a NCCA o SEC como citas ni se introducen cambios silenciosos en las Units of Learning originales.

## Comprobaciones iniciales — anteriores a la ampliación

Trece pruebas automatizadas superadas. Comprueban respuestas cerradas y distractores, cambios de persona del laboratorio, conservación de tildes y signos durante la corrección, exclusión de textos libres del historial, recuperación controlada de datos guardados, campos bilingües, dependencias estáticas y ausencia de llamadas de micrófono o analítica en el código de la aplicación.

Un entorno simulado de vistas ejecuta las siete pantallas en los tres modos lingüísticos. También comprueba conservación y escape del texto escrito, mantenimiento de una respuesta al cambiar de idioma o consultar ayuda, y comportamiento del salto al contenido. No simula un navegador completo, el diseño visual ni un lector de pantalla.

Dos comprobaciones adicionales verifican que visitar las doce actividades sin responder no completa el apartado, y que intentar las doce sí registra práctica aunque algunas respuestas sean incorrectas. El indicador registra participación en la práctica, no dominio lingüístico ni una nota.

Revisión de contenido: modelos de saludo, presentación, edad con tener, estados con estar, deletreo y reparación de la comunicación; distinción de hablante, interlocutor y tercera persona; identidades ficticias; instrucciones y feedback en los tres modos. La tarea culmina en elegir una tarjeta que coincida con el nombre y la edad obtenidos y permite crear un intercambio propio.

## Incidencia corregida

La línea secundaria de los enlaces y botones de estilo transparente heredaba el blanco de los botones principales. En Bilingual podía perder contraste sobre los fondos claros. Ahora hereda el color del texto del propio control.

Cálculo de contraste con los colores opacos declarados, sin medición de píxeles del navegador:

| Combinación | Relación aproximada |
| --- | ---: |
| Blanco sobre turquesa principal | 6,30:1 |
| Turquesa sobre arena | 5,69:1 |
| Turquesa sobre blanco | 6,30:1 |
| Texto azul profundo sobre arena | 10,90:1 |
| Texto secundario sobre blanco | 6,41:1 |
| Texto de error sobre fondo de error | 6,89:1 |

Estos pares superan 4,5:1 para texto normal. El cálculo no certifica todos los estados de la interfaz ni el cumplimiento de WCAG.

## Privacidad y límites pedagógicos

El historial local es voluntario y guarda modo lingüístico, último apartado, apartados practicados, versión del formato y fecha de revisión. No guarda respuestas, identidad, escritura libre ni reflexión. En un navegador compartido el historial puede ser visible a otra persona y no se sincroniza entre dispositivos. La escritura libre se mantiene en memoria hasta cerrar o recargar; el alumno puede descargarla expresamente.

La lectura en voz alta utiliza una voz española que el dispositivo declare local. No equivale a un audio didáctico grabado y no se garantiza su disponibilidad. El código no solicita micrófono. El alojamiento sigue atendiendo las peticiones técnicas necesarias para entregar la página.

La escritura y la conversación abiertas requieren autoevaluación, revisión entre compañeros o revisión docente. El prototipo no las califica automáticamente. La biblioteca compartida ofrece refuerzo dentro del contexto de la unidad; todavía no constituye un sistema completo de microdiagnóstico adaptativo o revisión espaciada.

## Pruebas pendientes antes de usarlo en el aula

| Área | Prueba de aceptación | Estado |
| --- | --- | --- |
| Ordenador escolar | Completar el recorrido con teclado; comprobar foco tras cada interacción y cierre del diálogo | Pendiente |
| iPad / Safari | Cambiar idioma durante una respuesta y un texto libre; verificar controles táctiles, voz local y descarga | Pendiente |
| Móvil | Comprobar lectura y ausencia de desbordamiento en pantallas estrechas y en modo bilingüe | Pendiente |
| Accesibilidad | Revisar ampliación al 200 %, reflujo, lector de pantalla, anuncios y foco visible | Pendiente |
| Impresión | Revisar la vista previa y la legibilidad de tarea y texto escrito | Pendiente |
| Privacidad local | Comprobar guardado desactivado, activado y borrado en navegador normal y restringido | Pendiente |
| Red del instituto | Verificar que el dominio privado de revisión es accesible; planificar después el alojamiento destinado al alumnado | Pendiente |
| Didáctica | Observar si el alumno entiende el propósito, puede pedir ayuda y transfiere los modelos a un intercambio nuevo | Pendiente |

No estuvo disponible el control de navegador admitido por el entorno. No se realizaron pruebas visuales, con lector de pantalla ni con dispositivos físicos. El despliegue privado permite revisión docente; no equivale a validación de uso general con alumnado.

## Alcance preservado

No se han modificado los dos repositorios originales, las programaciones adjuntas ni materiales de LC. La corrección pertenece únicamente al prototipo independiente. La expansión a otras unidades deberá incorporar los resultados de la revisión docente y las pruebas pendientes.


## Ampliación de contenidos tras revisión docente

La revisión posterior desarrolla diez bloques, 48 actividades, tres textos de lectura y tres tareas nuevas además del encuentro guiado. Tener y estar incorporan las seis personas del presente en las tablas y el laboratorio. Hay diecinueve comprobaciones automáticas superadas, incluidas las nuevas rutas por tema, los campos bilingües de los materiales ampliados, las formas plurales, las respuestas conservadas entre temas y los equivalentes Unicode de las tildes.

Esta ampliación no resuelve por sí sola las pruebas pendientes de navegador, accesibilidad y dispositivos reales indicadas arriba. Véase Revision_contenidos_Unidad_1.md para el alcance y la justificación pedagógica de los cambios.


## Revisión de claridad y jerarquía

Tras la segunda revisión docente se han acortado las explicaciones esenciales de los diez bloques y destacado las expresiones españolas. Los detalles secundarios pasan a consulta opcional. Veintiuna comprobaciones automáticas superadas; no se han realizado nuevas pruebas visuales en navegador. El alcance funcional y las limitaciones de dispositivos anteriores siguen vigentes.


## Comprensión auditiva

Se añaden dos grabaciones originales con dos voces sintéticas de ElevenLabs: presentaciones (20 segundos) y conversación con deletreo (46 segundos). Montaje local con ajuste de tempo de 0,75 sin cambiar el tono y pausas entre intervenciones; cuatro segundos entre las dos presentaciones y 2,4 segundos tras el deletreo. Los archivos MP3 se alojan con la web. El alumnado no necesita cuenta ni conexión con ElevenLabs.

Doce preguntas nuevas, feedback bilingüe y transcripciones desplegables. Veinticinco comprobaciones automáticas superadas, incluidas las claves de respuesta, presencia de MP3, respuestas entre modos lingüísticos y simulación del estado de reproducción. La transcripción automática del montaje coincide con nombres, edades, estados y deletreo del guion. Esta comprobación no sustituye escuchar el audio y revisar el ritmo con el profesor. Siguen pendientes pruebas reales de reproducción, accesibilidad y descarga en iPad y otros navegadores.
