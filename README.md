# Insight Log Agent

Librería universal de logging que hace override de `console.log` para enviar logs a un servidor remoto, disponible para múltiples frameworks con selección explícita de plataforma.

## 🚀 Instalación desde GitHub

```bash
# Instalación directa desde GitHub
npm install github:tuusuario/insight-log-agent

# O usando la URL completa
npm install https://github.com/tuusuario/insight-log-agent.git

# Especificando branch específico
npm install github:tuusuario/insight-log-agent#main
```

## 📁 Estructura del Repositorio

```
insight-log-agent/
├── index.js              # Entry point principal (auto-detección)
├── index.esm.js          # Versión ESM
├── index.d.ts            # TypeScript definitions
├── nodejs/               # Implementación para Node.js
├── reactjs/              # Implementación para ReactJS
├── react-native/         # Implementación para React Native
├── package.json          # Configuración NPM
└── README.md             # Este archivo
```

## 🎯 Frameworks Soportados

- **Node.js** - Aplicaciones del lado del servidor
- **ReactJS** - Aplicaciones web React  
- **React Native** - Aplicaciones móviles React Native
- **Selección Explícita** - Debes elegir explícitamente la implementación de tu plataforma

## 📋 Características Principales

- ✅ **Override no intrusivo** - Mantiene la funcionalidad original de console
- ✅ **Stack trace automático** - Identifica automáticamente archivo y línea de código
- ✅ **Tolerante a fallos** - Nunca rompe la aplicación, falla silenciosamente
- ✅ **TraceID automático** - Seguimiento de logs a través de microservicios
- ✅ **Configuración flexible** - Parámetros personalizables por log
- ✅ **Múltiples niveles** - INFO, ERROR, WARNING, DEBUG
- ✅ **Serialización segura** - Objetos se muestran como [Object]

## 🛠️ Uso Básico

### Instalación

```bash
# Instalar desde GitHub
npm install github:tuusuario/insight-log-agent
```

### Selección Explícita de Plataforma

**⚠️ IMPORTANTE: Debes elegir explícitamente la implementación de tu plataforma**

#### Para Node.js
```javascript
const insightLogger = require('insight-log-agent/nodejs');
// o para ES6 modules:
// import insightLogger from 'insight-log-agent/nodejs';

insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-aplicacion-nodejs',
  environment: 'prod',
  client: 'cliente-default'
});
```

#### Para ReactJS
```javascript
const insightLogger = require('insight-log-agent/reactjs');
// o para ES6 modules:
// import insightLogger from 'insight-log-agent/reactjs';

insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-aplicacion-react',
  environment: 'prod',
  client: 'cliente-default'
});
```

#### Para React Native
```javascript
const insightLogger = require('insight-log-agent/react-native');
// o para ES6 modules:
// import insightLogger from 'insight-log-agent/react-native';

insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-app-react-native',
  environment: 'prod',
  client: 'cliente-mobile'
});
```

### Uso Normal (Después de la Inicialización)

```javascript
// Usar console.log normalmente - ahora enviará logs al servidor
console.log('Mi mensaje');
console.error('Error occurred');
console.warn('Warning message');

// Con configuración personalizada
console.log('Evento importante', { 
  client: 'tenant-123', 
  level: 'ERROR' 
});
```

## 🔧 API del Servidor

La librería envía logs vía GET al endpoint `/event` con los siguientes parámetros:

### Parámetros Principales
- `client` - ID del cliente/tenant
- `content` - Contenido del log
- `label` - Stack trace con archivo:línea
- `level` - Nivel del log (INFO, ERROR, WARNING, DEBUG)
- `service` - Nombre del servicio
- `environment` - Entorno (dev, prod, etc.)
- `value` - TraceID para seguimiento

## 🎯 Selección Explícita de Plataforma

**No hay auto-detección** - Debes elegir explícitamente la implementación correcta:

- **Node.js**: `require('insight-log-agent/nodejs')`
- **ReactJS**: `require('insight-log-agent/reactjs')`  
- **React Native**: `require('insight-log-agent/react-native')`

### ¿Por qué Selección Explícita?

✅ **Control total** - Sabes exactamente qué implementación usas  
✅ **Sin sorpresas** - No hay detección automática que pueda fallar  
✅ **Mejor rendimiento** - Solo carga el código necesario  
✅ **Debugging claro** - Es obvio qué plataforma estás usando  
✅ **Compatibilidad** - Funciona en todos los bundlers y entornos  

### Verificación de Plataforma

```javascript
// Ver qué implementación estás usando
console.log('Platform:', insightLogger._platform);
console.log('Version:', insightLogger._version);
```

## 📖 Documentación por Framework

Cada implementación tiene su documentación específica:

- [Node.js Documentation](./nodejs/README.md)
- [ReactJS Documentation](./reactjs/README.md)  
- [React Native Documentation](./react-native/README.md)

## 🎯 Casos de Uso

### Monitoreo de Aplicaciones
```javascript
console.error('Database connection failed', { 
  client: 'db-monitor', 
  level: 'CRITICAL' 
});
```

### Seguimiento de Usuario
```javascript
console.log('User login', { 
  client: 'user-analytics', 
  level: 'INFO' 
});
```

### Debugging Distribuido
```javascript
// El mismo traceID se propaga automáticamente
console.log('Processing in service A');
// ... call to service B ...
console.log('Processing in service B'); // Mismo traceID
```

## 🔒 Tolerancia a Fallos

- **Nunca rompe la aplicación** - Todos los errores son capturados silenciosamente
- **Fallback robusto** - Si falla el logging remoto, console funciona normalmente
- **Sin dependencias externas** - Código autónomo, sin librerías adicionales
- **Sin almacenamiento local** - No asume disponibilidad de localStorage/filesystem

## ⚙️ Configuración del Servidor

El servidor debe manejar GET requests al endpoint `/event` con los parámetros como query strings:

```
GET /event?client=tenant-123&content=mi%20log&level=INFO&service=mi-app&environment=prod&value=trace-abc&label=app.js:42
```

## 📝 Ejemplos Incluidos

Cada framework incluye archivos de ejemplo completos:
- `nodejs/example.js`
- `reactjs/example.js`  
- `react-native/example.js`

## 🚀 Instalación y Configuración

### 1. Crear Repositorio en GitHub

```bash
# Crear repo en GitHub y clonar
git clone https://github.com/tuusuario/insight-log-agent.git
cd insight-log-agent

# Subir archivos
git add .
git commit -m "Initial commit: Universal console logging library"
git push origin main
```

### 2. Instalar en Proyectos

```bash
# En cualquier proyecto Node.js/React/React Native
npm install github:tuusuario/insight-log-agent

# O usando URL completa
npm install https://github.com/tuusuario/insight-log-agent.git
```

### 3. Uso Inmediato

```javascript
// Elegir la implementación correcta para tu plataforma
const insightLogger = require('insight-log-agent/nodejs'); // Para Node.js
// const insightLogger = require('insight-log-agent/reactjs'); // Para ReactJS
// const insightLogger = require('insight-log-agent/react-native'); // Para React Native

insightLogger.init({ logServerUrl: 'https://tu-servidor.com' });
console.log('¡Funciona!'); // Se envía automáticamente al servidor
```

## 🔧 Configuración Avanzada

### Múltiples Instancias

```javascript
// Usar diferentes implementaciones en el mismo proyecto si es necesario
const nodeLogger = require('insight-log-agent/nodejs');
const reactLogger = require('insight-log-agent/reactjs');
const rnLogger = require('insight-log-agent/react-native');
```

### Verificación de Implementación

```javascript
// Verificar qué implementación estás usando
console.log('Platform:', insightLogger._platform);
console.log('Version:', insightLogger._version);

// Si usas el entry point principal por error, verás una advertencia
if (insightLogger._warning) {
  console.warn(insightLogger._warning);
}
```

## 🤝 Contribución

Este proyecto está diseñado para ser instalado directamente desde GitHub. Siéntete libre de hacer fork y modificar según tus necesidades.

## 📄 Licencia

MIT License - Código libre para uso comercial y personal.
