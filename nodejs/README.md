# Insight Logger - Node.js

Librería para override de console.log que envía logs a un servidor remoto de logging.

## Instalación

Simplemente copia el archivo `insight-logger.js` a tu proyecto Node.js.

## Uso Básico

```javascript
const insightLogger = require('./insight-logger');

// Inicializar la librería
insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-aplicacion-nodejs',
  environment: 'prod',
  client: 'cliente-default'
});

// Usar console.log normalmente - ahora enviará logs al servidor
console.log('Mi mensaje de log');
console.error('Error message');
console.warn('Warning message');
```

## Configuración Avanzada

```javascript
// Con parámetros personalizados
console.log('Evento importante', { 
  client: 'tenant-123', 
  level: 'ERROR' 
});
```

## Características

- ✅ Override de console.log, console.error, console.warn, console.info, console.debug
- ✅ Mantiene funcionalidad original de console
- ✅ Stack trace automático para identificar línea de código
- ✅ Tolerante a fallos - nunca rompe la aplicación
- ✅ TraceID automático para seguimiento de logs
- ✅ Soporte para configuración por log individual
- ✅ Serialización segura de objetos como [Object]

## API

### insightLogger.init(options)

Inicializa el logger con la configuración especificada.

**Opciones:**
- `logServerUrl` (requerido): URL del servidor de logs
- `service`: Nombre del servicio
- `environment`: Entorno (dev, prod, etc.)
- `client`: ID del cliente por defecto

### insightLogger.restore()

Restaura el comportamiento original de console.

## Campos Enviados

La librería envía los siguientes campos al endpoint `/event`:

- `client`: ID del cliente
- `content`: Contenido del log
- `label`: Stack trace con archivo y línea
- `level`: Nivel del log (INFO, ERROR, WARNING, DEBUG)
- `service`: Nombre del servicio
- `environment`: Entorno
- `value`: TraceID para seguimiento

