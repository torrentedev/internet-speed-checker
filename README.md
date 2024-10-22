# Internet Speed Checker

Internet Speed Checker es una aplicación ReactJS y backend en NodeJS que mide la velocidad actual de descarga de Internet y muestra un gráfico de línea con las verificaciones realizadas. La aplicación también notifica al usuario sobre la estabilidad de la conexión a Internet.

## Características

- Muestra la velocidad actual de descarga.
- Notifica al usuario sobre la calidad de la conexión a Internet.
- Gráfico de línea que muestra el historial de velocidades de descarga.
- Interfaz de usuario moderna utilizando Bootstrap y la fuente Poppins.

## Tecnologías Utilizadas

- React
- Chart.js y react-chartjs-2
- Bootstrap
- Google Fonts (Poppins)
- react-toastify
- fast-speedtest-api

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/internet-speed-checker.git
    cd internet-speed-checker
    ```

2. Instala las dependencias en fronted y backend:

    ```bash
    npm install
    ```

3. Inicia la aplicación:

    ```bash
    npm start
    ```

## Configuración

Asegúrate de tener un servidor de prueba de velocidad en ejecución. Puedes configurar la URL del servidor editando la constante `API_URL` en `InternetSpeedChecker.js`.

```javascript
const API_URL = 'http://localhost:4000/speedtest';
 ```

## Configuración de fast-speedtest-api

Es indispensable contar con el token de Fast (https://fast.com/) para localizar el token, ingresa con las herramientas de desarrollo del navegador y busca "Red" en la lista de peticiones localiza la cadena:

```bash
https://api.fast.com/netflix/speedtest/v2?https=true&token=
```
