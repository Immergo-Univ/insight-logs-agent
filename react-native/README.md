# Insight Logger - React Native

Librería para override de console.log que envía logs a un servidor remoto de logging en aplicaciones React Native.

## Instalación

Simplemente copia el archivo `insight-logger.js` a tu proyecto React Native.

## Uso Básico

```javascript
import insightLogger from './insight-logger';

// Inicializar la librería (típicamente en App.js o index.js)
insightLogger.init({
  logServerUrl: 'https://tu-servidor-logs.com',
  service: 'mi-app-react-native',
  environment: 'prod',
  client: 'cliente-mobile'
});

// Usar console.log normalmente - ahora enviará logs al servidor
console.log('Mi mensaje de log');
console.error('Error message');
console.warn('Warning message');
```

## Uso en Componentes

```javascript
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function MiComponente() {
  useEffect(() => {
    console.log('Componente montado en React Native');
  }, []);

  const handlePress = () => {
    console.log('Botón presionado', { 
      client: 'user-mobile-123', 
      level: 'INFO' 
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Presionar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Configuración Avanzada

```javascript
// Con parámetros personalizados
console.log('Evento importante', { 
  client: 'tenant-mobile-123', 
  level: 'ERROR' 
});
```

## Características

- ✅ Override de console.log, console.error, console.warn, console.info, console.debug
- ✅ Mantiene funcionalidad original de console
- ✅ Stack trace automático optimizado para React Native
- ✅ Tolerante a fallos - nunca rompe la aplicación
- ✅ TraceID automático para seguimiento de logs
- ✅ Soporte para configuración por log individual
- ✅ Serialización segura de objetos como [Object]
- ✅ Compatible con Flipper y debugging tools
- ✅ Soporte para iOS y Android
- ✅ Soporte para diferentes engines (Hermes, JSC)

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

## Consideraciones para React Native

- La librería usa `fetch()` nativo de React Native
- Stack traces se adaptan automáticamente al engine JavaScript usado
- Compatible con Metro bundler
- Los logs se envían de forma asíncrona sin bloquear la UI
- Maneja automáticamente errores de red
- Funciona tanto en desarrollo como en producción

## Debugging

- Los logs originales siguen apareciendo en Metro/Flipper
- Los stack traces incluyen información específica del archivo fuente
- Compatible con source maps para debugging

