const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const DeviceClient = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;


const connectionString = 'HostName=traffic-sensor-hub-tda.azure-devices.net;DeviceId=sensor-tdea-01;SharedAccessKey=vRsoQXr1iEodEkS46AUO9DaPxkxIKh2s0TRCvlBpM1k=';

const client = DeviceClient.fromConnectionString(connectionString, Mqtt);

async function sendTrafficData() {
const velocidad = Math.floor(Math.random() * (15 - 5) + 5);
const datos = JSON.stringify({
    sensorId: 'sensor-tdea-01',
    velocidad: velocidad,
    location: { lat: 6.2442, lng: -75.5812 },
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