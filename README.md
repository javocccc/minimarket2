# 🛒 Minimarket Don Pepe

Aplicación web de gestión de minimarket con sistema de **login por roles**, **catálogo de productos** con stock y **registro de compras**. Desarrollada en HTML, CSS y JavaScript puro — sin frameworks, sin base de datos, sin pasos de compilación.

## ✨ Características

- **3 roles de usuario** con permisos diferenciados
- **Admin** → agrega y elimina productos del catálogo
- **Reponedor** → solo puede agregar productos
- **Cliente** → navega el catálogo, compra productos (descuenta stock) y ve su historial
- **Selector de emojis** por categoría para identificar productos visualmente
- **12 productos predeterminados** cargados al abrir la app por primera vez
- Los datos se guardan en el navegador (`localStorage`), sin necesidad de servidor ni base de datos

## 👤 Usuarios de prueba

| Usuario     | Contraseña   | Permisos                              |
|-------------|--------------|---------------------------------------|
| `admin`     | `admin123`   | Agregar y eliminar productos          |
| `reponedor` | `repo123`    | Solo agregar productos                |
| `cliente`   | `cliente123` | Comprar productos (descuenta stock)   |

## 📁 Estructura del proyecto

```
minimarketdonpepe/
├── index.html     → Estructura HTML de la página
├── styles.css     → Todos los estilos visuales
├── app.js         → Lógica de la aplicación (roles, productos, compras)
└── README.md      → Este archivo
```

## 🚀 Cómo ver la página localmente (sin instalar nada especial)

### Opción A — Abrir directo en el navegador (más fácil)
1. Descarga o clona el repositorio.
2. Abre el archivo `index.html` con doble clic en tu explorador de archivos.
3. Se abre directamente en el navegador. ¡Listo!

> Funciona así porque no usa módulos ES6 ni APIs que requieran servidor.

### Opción B — Servidor local con Python (recomendado si Option A no funciona)

> Python viene instalado por defecto en Mac y Linux. En Windows puedes verificar con `python --version` en la terminal.

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta uno de estos comandos según tu versión de Python:

```bash
# Python 3 (más común)
python -m http.server 8000

# Python 2 (si lo anterior no funciona)
python -m SimpleHTTPServer 8000
```

3. Abre tu navegador y entra a: **http://localhost:8000**
4. Para detener el servidor, presiona `Ctrl + C` en la terminal.

### Opción C — Servidor local con Node.js

Si tienes Node.js instalado:

```bash
npx serve .
```

Luego abre el link que aparece en la terminal (normalmente http://localhost:3000).

## ☁️ Cómo desplegarlo en Vercel (link público sin costo)

1. Entra a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar tu cuenta de GitHub).
2. Haz clic en **Add New... → Project**.
3. Selecciona el repositorio `minimarketdonpepe` (autoriza acceso a GitHub si te lo pide).
4. Vercel detecta que es un sitio estático — deja todo por defecto y haz clic en **Deploy**.
5. En unos segundos obtienes un link público tipo `https://minimarketdonpepe.vercel.app`.

> Cada vez que hagas un `git push` al repositorio, Vercel redespliega automáticamente.

## 🔧 Tecnologías

| Tecnología | Uso |
|------------|-----|
| HTML5      | Estructura y semántica |
| CSS3       | Estilos, variables CSS, grid y animaciones |
| JavaScript (ES6) | Lógica de negocio, manejo de estado y DOM |
| localStorage | Persistencia de datos en el navegador |
| Google Fonts | Tipografías Baloo 2 e Inter |

## 📝 Notas

- Los datos (productos y compras) se guardan en el `localStorage` de cada navegador de forma individual — cada persona que abra el link ve su propio conjunto de datos.
- Si el catálogo queda sin productos (porque el admin los eliminó todos), la app recarga automáticamente los 12 productos predeterminados.
- No requiere backend, base de datos ni ninguna variable de entorno para funcionar.
