# ⚓ Ankr — Drop your anchor anywhere

Conecta con viajeros reales en cualquier ciudad del mundo.

## 🚀 Cómo correr localmente

Abre `index.html` directamente en tu navegador, o usa un servidor local:

```bash
npx serve .
```

## 📱 Cómo probar en Android

1. Sube este código a GitHub
2. Conecta el repo a Railway (railway.app)
3. Railway te da un link público
4. Abre ese link en Chrome en tu Android
5. Chrome te pregunta "¿Agregar a pantalla de inicio?" — di que sí
6. ¡Ya tienes Ankr instalado como app!

## 🛠 Stack

- HTML + CSS + JS vanilla (sin dependencias)
- PWA (Progressive Web App)
- Listo para conectar con Supabase (backend + auth + DB)

## 📂 Estructura

```
ankr/
├── index.html          # App principal
├── manifest.json       # Config PWA
└── src/
    ├── styles.css      # Todos los estilos
    └── app.js          # Toda la lógica
```

## 🔜 Próximos pasos

- [ ] Conectar Supabase (usuarios reales, auth)
- [ ] Chat en tiempo real (WebSockets)
- [ ] Subir a Railway
- [ ] Probar en Android
