# Insight Logger - ReactJS

Librería para override de console.log que envía logs a un servidor remoto de logging en aplicaciones React.

## Instalación

Simplemente copia el archivo `insight-logger.js` a tu proyecto React.

## Uso Básico

```javascript
import insightLogger from './insight-logger';

// Inicializar la librería (típicamente en App.js o index.js)
insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-aplicacion-react',
  environment: 'prod',
  client: 'cliente-default'
});

// Usar console.log normalmente - ahora enviará logs al servidor
console.log('Mi mensaje de log');
console.error('Error message');
console.warn('Warning message');
```

## Uso en Componentes

```javascript
import React, { useEffect } from 'react';

function MiComponente() {
  useEffect(() => {
    console.log('Componente montado');
  }, []);

  const handleClick = () => {
    console.log('Botón clickeado', { 
      client: 'user-123', 
      level: 'INFO' 
    });
  };

  return <button onClick={handleClick}>Hacer Click</button>;
}
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
- ✅ Compatible con React DevTools
- ✅ Soporte para múltiples navegadores

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

## Consideraciones para Producción

- La librería usa `fetch()` para enviar logs
- Los logs se envían de forma asíncrona sin bloquear la UI
- Maneja automáticamente errores de red sin afectar la aplicación
- Compatible con CORS (configura tu servidor según sea necesario)

