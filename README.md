[README.md](https://github.com/user-attachments/files/32181979/README.md)
# ⚽ El Clásico Nacional

Sitio web conmemorativo del **Clásico Nacional** del fútbol mexicano — Club América vs. Chivas Guadalajara. Un recorrido interactivo por la historia, las leyendas, las cifras y la rivalidad más importante del país.

**🔗 Ver el sitio en vivo:** https://mauriciomubravo.github.io/El-Clasico-Nacional-del-Futbol-Mexicano/

---

## 📋 Contenido del sitio

El sitio está dividido en 11 secciones, cada una con su propia mecánica:

1. **Historia** — línea de tiempo con los hitos de ambos clubes (fundaciones, primeros duelos, etc.)
2. **Cifras** — barra comparativa de resultados históricos + tarjetas de estadísticas
3. **Leyendas** — tarjetas que se voltean (flip cards) con la biografía de cada ídolo, una columna por club
4. **Épocas** — las leyendas agrupadas por generación
5. **Cruzados** — jugadores que vistieron ambas camisetas a lo largo de su carrera
6. **Jugadas** — carrete horizontal de partidos y jugadas memorables
7. **Arma tu Once Ideal** — sección interactiva: arrastra/selecciona jugadores para armar tu alineación ideal, con sonido de festejo del club al completarla
8. **Cultura** — apodos, mascotas y anécdotas de cada afición
9. **Himnos** — porras y cánticos representativos de cada club
10. **Quiz** — ocho preguntas de trivia con puntaje final
11. **Predicción** — vota quién crees que gana el próximo Clásico (América / Empate / Chivas), con sonido de festejo según tu elección

## 🗂️ Estructura de archivos

```
├── index.html              # Estructura y contenido de las 11 secciones
├── styles.css              # Estilos: layout, animaciones (flip 3D, cancha en perspectiva), responsive
├── script.js                # Lógica: datos de jugadores, quiz, alineación, predicción, sonidos
├── favicon.ico               # Ícono multi-tamaño (16/32/48/64/128/256px) para navegadores
├── favicon-16.png             # Ícono 16×16
├── favicon-32.png             # Ícono 32×32
├── favicon-192.png            # Ícono 192×192 (Android/PWA)
├── favicon-512.png            # Ícono 512×512 (Android/PWA)
├── apple-touch-icon.png       # Ícono 180×180 (iOS, "agregar a pantalla de inicio")
├── crest_ame.png / crest_chi.png   # Escudos de ambos clubes
├── era_*.jpg                  # Fotos usadas en la sección Épocas
├── photo_*.jpg                # Fotos de jugadores/leyendas
├── sound_ame.mp3               # Sonido de festejo — América
├── sound_chi.mp3               # Sonido de festejo — Chivas
└── sound_stadium.mp3            # Ambiente de estadio de fondo
```

Todos los recursos (imágenes y audio) están **sueltos en la raíz**, junto a `index.html`, `styles.css` y `script.js` — sin subcarpetas. Esto es intencional: así es como quedaron organizados al subirlos a GitHub, y las rutas dentro de `script.js` apuntan directo a esos nombres de archivo (por ejemplo `"crest_ame.png"`, no `"assets/img/crest_ame.png"`). Si en algún momento mueves los recursos a una subcarpeta, hay que actualizar esas rutas en `script.js` para que coincidan.

## 🛠️ Tecnologías

Sitio 100% estático, sin frameworks ni dependencias externas:

- **HTML5** semántico
- **CSS3** — animaciones con `transform`/`transition` (flip cards, cancha con `rotateX` en perspectiva), layout con Grid/Flexbox, tamaños responsivos con `clamp()`
- **JavaScript** vainilla (sin librerías) — toda la interactividad: quiz, armado de alineación, predicción, reproducción de audio

No requiere build ni instalación de paquetes: son archivos estáticos que se sirven directo.

## 🚀 Cómo verlo localmente

Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y luego entrar a `http://localhost:8000`.

## 📦 Despliegue

El sitio se publica con **GitHub Pages** directamente desde la rama principal del repositorio. Cualquier cambio subido a `index.html`, `styles.css`, `script.js` o los recursos se refleja automáticamente en el sitio en vivo (puede tardar uno o dos minutos, y a veces hace falta refrescar en modo incógnito por el caché del navegador, sobre todo con el favicon).

## 🎨 Créditos

Sitio armado como proyecto personal en honor al Clásico Nacional del fútbol mexicano. Los nombres, escudos y colores de ambos clubes pertenecen a sus respectivos dueños; este proyecto es de carácter aficionado/conmemorativo, sin fines comerciales.
