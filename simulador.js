require('dotenv').config();

const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const DeviceClient = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('CONNECTION_STRING no está definida en las variables de entorno');
}

const client = DeviceClient.fromConnectionString(connectionString, Mqtt);

// Tus puntos reales de Medellín
const puntosCongestionMedellin = [
  { latitud: 6.2889, longitud: -75.5647 },
  { latitud: 6.2108, longitud: -75.5735 },
  { latitud: 6.2764, longitud: -75.5702 },
  { latitud: 6.2081, longitud: -75.5653 },
  { latitud: 6.2476, longitud: -75.5689 },
  { latitud: 6.2452, longitud: -75.5774 },
  { latitud: 6.2301, longitud: -75.5983 },
  { latitud: 6.2448, longitud: -75.5941 },
  { latitud: 6.2245, longitud: -75.6017 },
  { latitud: 6.2519, longitud: -75.5698 }
];


async function sendTrafficData() {
  const puntoAleatorio = puntosCongestionMedellin[Math.floor(Math.random() * puntosCongestionMedellin.length)];
  const velocidad = Math.floor(Math.random() * (15 - 5) + 5);
  const datos = JSON.stringify({
    sensorId: 'sensor-tdea-01',
    velocidad: velocidad,
    // 6.279681, -75.583859
    location: {
      lat: puntoAleatorio.latitud,
      lng: puntoAleatorio.longitud
    },
    timestamp: new Date().toISOString()
  });

  const mensaje = new Message(datos);

  try {
    await client.sendEvent(mensaje);
    console.log(`Enviado: ${datos}`);
  } catch (err) {
    console.error(`Error al enviar: ${err.toString()}`);
  }
}

// Enviar datos cada 3 segundos
setInterval(sendTrafficData, 3000);

console.log('Simulador de tráfico iniciado. Presiona Ctrl+C para detener.');