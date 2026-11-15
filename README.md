# Unas Tapitas de Español 2.0

Plataforma gratuita e interactiva para aprender español en secundaria en Irlanda. Complementa la enseñanza en clase y facilita la práctica autónoma con materiales originales y apoyo en inglés, bilingüe o en español.

**[Abrir la web pública](https://languageprepie.github.io/unas-tapitas-espanol/)** · GitHub Pages

| Itinerario | Disponible | En desarrollo o previsto |
| --- | --- | --- |
| 1st Year · Unidad 1: Hola y bienvenidos | Learn, Explore, Practise, Communicate y Play | — |
| 1st Year · Unidad 2: El aula | Learn A–D y cuatro laboratorios de Explore | Practise, Communicate y Play |
| 2nd Year y 3rd Year | Portadas de curso | Unidades de Junior Cycle |
| Leaving Certificate | Portadas de Higher Level y Ordinary Level | Unidades con progresión de 5th a 6th Year |

Cada unidad completa se organiza en Learn, Explore, Practise, Communicate y Play.

## Pruebas y compilación

Con Node.js 24 LTS, npm y FFmpeg (incluidos `ffmpeg` y `ffprobe` en el PATH):

```sh
npm test
npm run build
```

No hay dependencias npm que instalar. La compilación prepara la web estática en `dist/` sin publicarla.

## Documentación

- [Hoja de ruta e historial de decisiones](docs/HOJA_DE_RUTA.md)
- [Matriz curricular de 1st Year](docs/MATRIZ_CURRICULAR_1ST_YEAR.md) y [validación pedagógica de la Unidad 1](docs/Validacion_Unidad_1.md)
- [Arquitectura, rutas y progreso](docs/ARQUITECTURA_NAVEGACION.md) y [biblioteca de actividades](docs/ACTIVITY_LIBRARY.md)
- [Mantenimiento, accesibilidad y propuestas de licencias y privacidad](docs/MANTENIMIENTO.md)
