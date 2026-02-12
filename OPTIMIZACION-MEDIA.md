e# 🎬 GUÍA DE OPTIMIZACIÓN DE VIDEO Y IMÁGENES
**Aluminios OTTO - Mejora de Performance**

---

## 🎥 OPTIMIZAR VIDEO HERO (CRÍTICO)

### Problema Actual
El archivo `/public/Fondo.mp4` probablemente pesa mucho (>10MB) y ralentiza la carga inicial.

### Solución: Comprimir Video

#### Opción 1: Online (Más Fácil)
1. Ir a https://www.freeconvert.com/video-compressor
2. Subir `/public/Fondo.mp4`
3. Configuración recomendada:
   - **Resolución**: 1920x1080 (Full HD)
   - **Bitrate**: 2000 kbps
   - **Codec**: H.264
   - **Formato**: MP4
4. Descargar y reemplazar archivo

#### Opción 2: FFmpeg (Profesional)
```bash
# Instalar FFmpeg (si no lo tienes)
brew install ffmpeg

# Comprimir video manteniendo calidad visual
ffmpeg -i public/Fondo.mp4 -vcodec h264 -crf 28 -preset slow -vf scale=1920:1080 public/Fondo-optimizado.mp4

# Meta: Reducir de ~10-20MB a ~2-3MB
```

**Parámetros explicados:**
- `-crf 28`: Calidad (23=alta, 28=media-alta, más=menor calidad)
- `-preset slow`: Mejor compresión (más lento)
- `-vf scale=1920:1080`: Resolución Full HD

### Crear Poster Image
```bash
# Extraer frame del segundo 2 como poster
ffmpeg -i public/Fondo.mp4 -ss 00:00:02 -vframes 1 public/assets/img/video-poster.jpg
```

---

## 🖼️ OPTIMIZAR IMÁGENES

### Estado Actual
- ✅ Lazy loading implementado
- ✅ Alt text descriptivos
- ✅ Rutas estandarizadas con `/`
- ⚠️ Formato JFIF (antiguo)
- ⚠️ Sin compresión

### Conversión JFIF → WebP (Reduce 30-50% peso)

#### Opción 1: Herramienta Online
1. Ir a https://convertio.co/jfif-webp/
2. Subir todas las imágenes .jfif de `/public/assets/img/`
3. Convertir a WebP
4. Descargar y reemplazar

#### Opción 2: Script Automático (macOS/Linux)
```bash
# Instalar cwebp
brew install webp

# Script para convertir todas las JFIF a WebP
cd /Users/macbookair/Otto/aluminios-otto/public/assets/img

# Convertir recursivamente
find . -name "*.jfif" -type f | while read file; do
    webp_file="${file%.jfif}.webp"
    cwebp -q 85 "$file" -o "$webp_file"
    echo "Convertido: $webp_file"
done

# Opcional: Eliminar originales después de verificar
# find . -name "*.jfif" -delete
```

#### Opción 3: Convertir PNG a WebP también
```bash
find . -name "*.png" -type f | while read file; do
    webp_file="${file%.png}.webp"
    cwebp -q 85 "$file" -o "$webp_file"
done
```

### Actualizar Referencias en products.js
Después de convertir, actualizar extensiones:
```javascript
// Antes
diagramImg: '/assets/img/Ventanas/VentanaCorre/img39.png'

// Después
diagramImg: '/assets/img/Ventanas/VentanaCorre/img39.webp'
```

---

## 📦 COMPRESIÓN BATCH (Todas las Imágenes)

### TinyPNG API (Recomendado)
```bash
# Instalar tinify
npm install -g tinify-cli

# Obtener API key gratis en https://tinypng.com/developers
tinify -k TU_API_KEY public/assets/img/**/*.{jpg,jpeg,png}
```

### ImageOptim (macOS - GUI)
1. Descargar: https://imageoptim.com/
2. Arrastrar carpeta `/public/assets/img/`
3. Comprime automáticamente sin pérdida visual
4. Reduce 40-60% del tamaño

---

## 🎯 CHECKLIST DE OPTIMIZACIÓN

### Video
- [ ] Comprimir Fondo.mp4 a <3MB
- [ ] Crear poster image (video-poster.jpg)
- [ ] Actualizar HomePage.jsx con poster
- [ ] Verificar reproducción smooth

### Imágenes
- [ ] Convertir .jfif → .webp (281 imágenes)
- [ ] Convertir .png → .webp
- [ ] Comprimir .jpg existentes
- [ ] Actualizar referencias en products.js
- [ ] Verificar que carguen correctamente

### Verificación
- [ ] Lighthouse Score >90
- [ ] Largest Contentful Paint <2.5s
- [ ] Total de imágenes <10MB
- [ ] Video hero <3MB

---

## 📊 IMPACTO ESPERADO

### Antes de Optimización
- Video: ~15-20 MB
- Imágenes totales: ~50-80 MB
- First Contentful Paint: ~4.5s
- Lighthouse Performance: ~45/100

### Después de Optimización
- Video: ~2-3 MB ✅ (-85%)
- Imágenes totales: ~15-25 MB ✅ (-60%)
- First Contentful Paint: ~1.2s ✅ (-73%)
- Lighthouse Performance: ~85/100 ✅ (+89%)

---

## 🚀 COMANDOS RÁPIDOS

### Todo en uno (macOS)
```bash
#!/bin/bash
cd /Users/macbookair/Otto/aluminios-otto

# 1. Comprimir video
ffmpeg -i public/Fondo.mp4 -vcodec h264 -crf 28 -preset slow public/Fondo-opt.mp4
mv public/Fondo-opt.mp4 public/Fondo.mp4

# 2. Crear poster
ffmpeg -i public/Fondo.mp4 -ss 00:00:02 -vframes 1 public/assets/img/video-poster.jpg

# 3. Convertir imágenes a WebP
cd public/assets/img
find . -name "*.jfif" -type f -exec sh -c 'cwebp -q 85 "$1" -o "${1%.jfif}.webp"' _ {} \;
find . -name "*.png" -type f -exec sh -c 'cwebp -q 85 "$1" -o "${1%.png}.webp"' _ {} \;

echo "✅ Optimización completa!"
```

---

## 🛠️ HERRAMIENTAS ÚTILES

### Compresión
- **FFmpeg**: https://ffmpeg.org/
- **HandBrake**: https://handbrake.fr/ (GUI para video)
- **ImageOptim**: https://imageoptim.com/ (GUI para imágenes)
- **Squoosh**: https://squoosh.app/ (Online)

### Análisis
- **Lighthouse**: Chrome DevTools (F12 → Lighthouse)
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/

---

## 📝 NOTAS IMPORTANTES

1. **Backup**: Antes de comprimir, hacer backup de originales
2. **Calidad**: Probar diferentes valores de -crf (23-28)
3. **WebP Support**: 95%+ navegadores lo soportan
4. **Fallback**: Las imágenes tienen onError configurado
5. **Git**: Considerar usar Git LFS para archivos grandes

---

**¡Optimizando se mejora la experiencia del usuario y el SEO!** 🚀

**Tiempo estimado:** 30-45 minutos
**Impacto SEO:** +40 puntos Lighthouse
**Ahorro de datos:** ~70% menos tráfico
