# 📊 CONFIGURACIÓN DE GOOGLE ANALYTICS 4
**Aluminios OTTO - Guía Paso a Paso**

---

## ✅ ESTADO ACTUAL

**Google Analytics 4 YA ESTÁ INSTALADO** en tu código (index.html líneas 8-26).

**Solo necesitas:**
1. Crear cuenta de Google Analytics (5 min)
2. Obtener tu ID: `G-XXXXXXXXXX`
3. Reemplazar en index.html
4. ¡Listo para medir visitas!

---

## 🚀 PASO 1: CREAR CUENTA (5 MIN)

1. **Ir a:** https://analytics.google.com/
2. **Iniciar sesión** con Gmail de la empresa
3. Clic en **"Empezar a medir"**

### Crear Propiedad:
- Nombre: **Aluminios OTTO**
- Zona horaria: **Colombia (GMT-5)**
- Moneda: **COP**
- Siguiente → Sector: **Construcción**
- Crear → Aceptar términos

### Flujo de Datos:
- Plataforma: **Web**
- URL: `https://www.aluminiosotto.com`
- Nombre: **Web Aluminios OTTO**
- Crear

### ⭐ COPIAR ID:
Verás: `G-XXXXXXXXXX` (ejemplo: `G-1A2B3C4D5E`)
**📋 Copia este ID**

---

## 🔧 PASO 2: INSTALAR (2 MIN)

Abrir: `/Users/macbookair/Otto/aluminios-otto/index.html`

**Buscar línea 8:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**Reemplazar G-XXXXXXXXXX con tu ID real**

**Buscar línea 14:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
```

**Reemplazar nuevamente**

**Guardar archivo**

---

## ✅ PASO 3: VERIFICAR (1 MIN)

1. Subir `index.html` a tu servidor
2. Ir a Google Analytics → **Informes → Tiempo real**
3. Abrir tu web en otra pestaña
4. En 30 seg verás **"1 usuario activo"** ✅

---

## 📊 QUÉ VAS A MEDIR

### Tráfico
- Cuántas visitas diarias/semanales
- De dónde vienen (Google, redes, directo)
- Qué ciudades de Colombia

### Productos
- Qué categorías ven más
- Cuánto tiempo permanecen
- Qué ventanas/puertas interesan

### Conversiones
- Clics en WhatsApp (intención de compra)
- Descargas de catálogo
- Formularios enviados

---

## 🎯 EVENTOS CONFIGURADOS

Ya incluidos en el código:

```javascript
trackEvent('Engagement', 'whatsapp_click', 'Cotización');
trackEvent('Product', 'category_view', 'Ventanas');
trackEvent('Download', 'catalog_download', 'PDF');
```

Para activarlos:
- Google Analytics → **Admin → Conversiones**
- Agregar: `whatsapp_click`, `catalog_download`

---

## ✅ CHECKLIST

- [ ] Cuenta GA4 creada
- [ ] ID `G-XXXXXXXXXX` copiado
- [ ] Reemplazado en index.html (líneas 8 y 14)
- [ ] Archivo subido al servidor
- [ ] Verificado en "Tiempo Real"

---

**¡Analytics listo! Ahora puedes medir si el SEO funciona** 🚀

**Siguiente:** Google Search Console para ver keywords de Google
