# 🚦 Medellín Traffic Monitor - Azure IoT Hub Simulator

Este proyecto es un simulador de telemetría de tráfico en tiempo real diseñado para enviar datos geográficos y de velocidad desde puntos clave de congestión en **Medellín, Colombia**, hacia **Azure IoT Hub** utilizando el protocolo MQTT.

Es ideal para demostraciones de Internet de las Cosas (IoT), telemetría urbana, procesamiento de datos en tiempo real (Stream Analytics), y paneles de control (Power BI/Web Apps).

---

## 🏗️ Arquitectura del Flujo de Datos

```mermaid
graph LR
    Sim[Simulador Node.js] -->|MQTT / Telemetría (JSON)| IoT[Azure IoT Hub]
    IoT -->|Event Hubs / Stream Analytics| Cons[Consumidores (PowerBI / DB / Web App)]
    style Sim fill:#f9f,stroke:#333,stroke-width:2px
    style IoT fill:#bbf,stroke:#333,stroke-width:2px
    style Cons fill:#bfb,stroke:#333,stroke-width:2px
```

---

## 🌟 Características

- **Puntos Reales de Congestión en Medellín**: Utiliza coordenadas geográficas reales de zonas conocidas por alta congestión en la ciudad.
- **Protocolo MQTT**: Conexión altamente eficiente y robusta con Azure IoT Hub utilizando la librería oficial de Azure IoT Device.
- **Configuración Segura**: Manejo de credenciales mediante variables de entorno (`.env`) para evitar subir secretos al control de versiones.
- **Envío Periódico**: Simulación automática y configurable (por defecto cada 3 segundos).

---

## 📋 Requisitos Previos

Antes de ejecutar el simulador, asegúrate de tener:

1. **Node.js** instalado (Versión 16.x o superior recomendada).
2. Un **Azure IoT Hub** configurado en tu suscripción de Azure.
3. Un **Dispositivo IoT** registrado en el Hub y su respectiva **Cadena de Conexión (Connection String)**.

---

## 🚀 Instalación y Configuración

1. **Clonar o acceder al repositorio:**
   ```bash
   cd az-traffic-monitor
   ```

2. **Instalar dependencias:**
   Instala los paquetes oficiales de Azure IoT y dotenv necesarios para el proyecto:
   ```bash
   npm install
   ```

3. **Configurar las Variables de Entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto (este archivo ya está configurado en `.gitignore` para tu seguridad):
   ```env
   CONNECTION_STRING="TuConnectionStringDeDispositivoAzureIoTHub"
   ```
   > ⚠️ **Importante**: Asegúrate de usar la **cadena de conexión de dispositivo** (que empieza por `HostName=...;DeviceId=...;SharedAccessKey=...`), **no** la de servicio o la del Hub.

---

## 💻 Uso

Para iniciar el simulador, simplemente ejecuta:

```bash
node simulador.js
```

**Salida esperada en consola:**
```text
Simulador de tráfico iniciado. Presiona Ctrl+C para detener.
Enviado: {"sensorId":"sensor-tdea-01","velocidad":12,"location":{"lat":6.2476,"lng":-75.5689},"timestamp":"2026-05-20T21:35:12.450Z"}
Enviado: {"sensorId":"sensor-tdea-01","velocidad":8,"location":{"lat":6.2108,"lng":-75.5735},"timestamp":"2026-05-20T21:35:15.458Z"}
```

Para detener la simulación en cualquier momento, presiona `Ctrl + C`.

---

## 📊 Estructura de la Telemetría (Payload JSON)

Cada mensaje enviado a Azure IoT Hub contiene la siguiente estructura de datos:

```json
{
  "sensorId": "sensor-tdea-01",
  "velocidad": 12,
  "location": {
    "lat": 6.2476,
    "lng": -75.5689
  },
  "timestamp": "2026-05-20T21:35:12.450Z"
}
```

### Descripción de campos:
| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `sensorId` | `String` | Identificador del dispositivo simulado. |
| `velocidad` | `Number` | Velocidad simulada en km/h (rango de 5 a 15 km/h que representa alta congestión). |
| `location.lat` | `Number` | Latitud del punto de congestión. |
| `location.lng` | `Number` | Longitud del punto de congestión. |
| `timestamp` | `String` | Fecha y hora en formato ISO 8601 UTC en que se generó la lectura. |

---

## 📍 Puntos de Congestión Simulados (Medellín)

El simulador recorre de forma aleatoria diversos puntos clave de Medellín, incluyendo coordenadas reales de zonas como:
- Alrededores del Politécnico Jaime Isaza Cadavid / TdeA.
- Zonas de El Poblado (Milla de Oro).
- Centro y Av. Oriental.
- Laureles y la Av. 80.
- Autopista Norte / Sur.

---

## 🛠️ Tecnologías Utilizadas

- [Node.js](https://nodejs.org/) - Entorno de ejecución JavaScript.
- [azure-iot-device](https://www.npmjs.com/package/azure-iot-device) - SDK oficial de Azure IoT para dispositivos.
- [azure-iot-device-mqtt](https://www.npmjs.com/package/azure-iot-device-mqtt) - Protocolo de transporte MQTT para dispositivos Azure IoT.
- [dotenv](https://www.npmjs.com/package/dotenv) - Carga de variables de entorno desde un archivo `.env`.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `package.json` para más detalles.
