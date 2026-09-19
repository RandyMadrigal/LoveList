# ✅ Pendientes de why?

Lista de lo que falta por verificar, mejorar o decidir. Los puntos salen de lo que se habló y de lo que quedó sin comprobar durante el desarrollo.

Leyenda: 🔴 importante · 🟡 recomendable · 🟢 opcional

---

## 🔍 Por verificar

Cosas ya implementadas que no se pudieron comprobar del todo.

- [ ] 🔴 **Vibración en un Android real.** El navegador de escritorio no permite probarla. En iOS Safari no funciona (limitación del navegador).
- [ ] 🔴 **Arrastre con el dedo** en "Una a la vez". Solo se probó con teclado, clics y arrastres sintéticos.
- [ ] 🟡 **Experiencia "Scroll" en móvil.** En 390 px solo se revisaron crear, una a la vez, sobre y letra.
- [ ] 🟡 **Corazones del scroll con el color de la paleta.** Se cambió a máscara con el color de acento, pero no se vio a ojo.
- [ ] 🟡 **Apodo en pantalla.** La lógica está probada con pruebas automáticas, pero no se vio el resultado en el navegador. Al probarlo, pulsar Enter en el campo del apodo no envió el formulario; falta confirmar si fue la prueba o un fallo real.
- [ ] 🟡 **Cambio de idioma de la interfaz** en las 4 lenguas, a ojo. Las traducciones se escribieron pero no se recorrieron todas las pantallas.
- [ ] 🟢 **Logo en pantallas de "enlace caducado" / "enlace inválido".** Se alineó a la izquierda pero el ajuste no se vio.
- [ ] 🟢 **Animaciones de hover y pulsación** en escritorio.
- [ ] 🟢 **Un cuelgue puntual de una pestaña** al cargar "Una a la vez" durante las pruebas. No se pudo reproducir después; vigilar si vuelve a pasar.

---

## 🛠️ Mejoras pequeñas

- [ ] 🟡 Cambiar el texto **"Desliza o usa las flechas del teclado"** por algo neutro como "Desliza", porque en el móvil no hay teclado.
- [ ] 🟡 **Título de la pestaña** (`document.title`) usa el idioma de quien mira, no el de la página. La interfaz sí usa el de la página.
- [ ] 🟡 **Página de privacidad:** mencionar la caducidad de 24 h y que el contenido viaja en el enlace.
- [ ] 🟡 Revisar que el cambio del texto del **footer** (en inglés ahora es solo "❤️") sea coherente en los otros tres idiomas.
- [ ] 🟢 Evitar que el texto "Toca para abrir" del sobre se pueda seleccionar (`select-none`).
- [ ] 🟢 Botón para **renovar** un enlace a punto de caducar (ahora hay que crear otro).
- [ ] 🟢 Mostrar el enlace caducado con la opción de **avisar al remitente**, sin guardar datos.

---

## 🚀 Antes de publicar

- [ ] 🔴 **`og:image` absoluta.** WhatsApp y Twitter suelen exigir URL completa. Ponerla cuando esté el dominio final (`index.html`).
- [ ] 🔴 **Revisar las traducciones** de razones y textos en español, portugués y francés con alguien nativo. Las 60 razones por idioma las tradujo Claude.
- [ ] 🟡 **Renombrar el repositorio y la demo** si se cambia de `LoveList` a `why?`. Actualizar las URL del README.
- [ ] 🟡 Cambiar el `name` de `package.json` (ahora `whyiloveyou`). Es interno, pero conviene alinearlo con el nuevo nombre.
- [x] 🟡 **Dividir el bundle** (code-splitting). Hecho: las páginas y cada experiencia se cargan bajo demanda con `React.lazy`. **No usar la opción `lazy` del router**: al probarla, `/create` dejó de responder al hacer scroll (causa sin investigar).
- [ ] 🟢 Reducir más el bundle principal usando `LazyMotion` de Motion en lugar de la librería completa.
- [ ] 🟡 **Auditoría de accesibilidad** de las 4 experiencias: contraste, foco, lector de pantalla y navegación por teclado.
- [ ] 🟢 Añadir un archivo **`LICENSE`** y su badge en el README.
- [ ] 🟢 Configurar **CI** (lint + build) y añadir el badge de estado.

---

## 🧪 Calidad y pruebas

- [ ] 🟡 **Pruebas automáticas en el repo.** Las 18 comprobaciones de `generateReasons` y `lovePayload` (modos de nombre, apodo, estabilidad del orden, validación y enlaces antiguos) se ejecutaron sueltas y no quedaron guardadas. Pasarlas a Vitest.
- [ ] 🟢 Pruebas de componentes para el selector de experiencia y el de modo de nombre.
- [ ] 🟢 Prueba de extremo a extremo del flujo: crear → copiar enlace → abrir → ver cada experiencia.

---

## 🔐 Caducidad real y datos (cuando se retome la base de datos)

Hoy la caducidad es solo una comprobación en el navegador: cualquiera que edite el enlace puede cambiar la fecha, y el contenido siempre se puede leer desde la URL. Opciones pensadas:

- [ ] **Enlaces firmados:** una función serverless de Vercel firma el enlace con una clave secreta y lo verifica al abrir. Caducidad no manipulable, sin guardar contenido. Necesita carpeta `/api` y una variable de entorno.
- [ ] **Guardado con TTL** (Upstash o Vercel KV): borra el dato a las 24 h y permite **enlaces cortos**.
- [ ] Decidir si las 24 h cuentan **desde la creación** (como ahora) o **desde la primera apertura**.
- [ ] Decidir qué pasa con los enlaces antiguos sin fecha (ahora: caducados).

---

## 💡 Ideas para más adelante

- [ ] **Editar razones a mano** (añadir, quitar, cambiar el texto).
- [ ] **Modo oscuro** para las pantallas de crear y de inicio.
- [ ] Más **paletas** y más **experiencias**.
- [ ] Más **idiomas**.
- [ ] Reducir el número de razones o elegir cuántas (ahora siempre 50).
- [ ] Imagen de vista previa (`og:image`) **personalizada por página**.

---

## ❌ Descartado por ahora

- Favoritas y "responder" en la página que recibe el enlace (decidido quitarlas).
- Base de datos: se deja para otro momento; por ahora todo viaja en el enlace.
- Firebase: eliminado del proyecto.
