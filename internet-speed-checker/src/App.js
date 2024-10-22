import React, { useEffect, useState } from 'react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = 'http://localhost:4000/speedtest';

const InternetSpeedChecker = () => {
  const [notifiedStable, setNotifiedStable] = useState(false);
  const [speed, setSpeed] = useState(null);
  const [speedHistory, setSpeedHistory] = useState([]);
  const [counter, setCounter] = useState(30); // 30 seconds

  useEffect(() => {
    const checkSpeed = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
        const data = await response.json();
        const speedMbps = data.downloadSpeed;

        setSpeed(speedMbps);
        setSpeedHistory(prevHistory => [...prevHistory, speedMbps]);

        if (navigator.onLine) {
          if (speedMbps >= 20.01) {
            if (!notifiedStable) {
              toast.success("En este momento, la conexión a internet es estable y con buena velocidad a internet.", { autoClose: 8000 });
              setNotifiedStable(true);
            }
          } else if (speedMbps >= 10.01 && speedMbps <= 20) {
            toast.info("En este momento, la calidad de conexión a internet es aceptable.", { autoClose: 8000 });
            setNotifiedStable(false);
          } else if (speedMbps >= 3.1 && speedMbps <= 10) {
            toast.warn("En este momento, la calidad de conexión a internet es mala y esto puede generar dificultades en el uso del ecosistema.", { autoClose: 8000 });
            setNotifiedStable(false);
          } else if (speedMbps < 3) {
            toast.error("En este momento, la conexión a internet es inferior a 3 megas.", { autoClose: 8000 });
            setNotifiedStable(false);
          }
        } else {
          toast.error("No se ha detectado conexión a internet, por favor verifica la conexión a internet.", { autoClose: 8000 });
          setNotifiedStable(false);
        }
      } catch (error) {
        console.error('Error fetching speed test data:', error.message);
        toast.error(error.message, { autoClose: 8000 });
        setNotifiedStable(false);
      }
    };

    // Medición inicial
    checkSpeed();

    const intervalId = setInterval(() => {
      checkSpeed();
      setCounter(30); // Reset counter to 30 seconds
    }, 30000); // 30 seconds

    const counterIntervalId = setInterval(() => {
      setCounter(prevCounter => (prevCounter === 0 ? 30 : prevCounter - 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(counterIntervalId);
    };
  }, [notifiedStable]);

  const formatSpeed = (speed) => {
    return speed ? speed.toFixed(2) : 'Calculando...'; // Limitar a 2 decimales
  };

  const getSpeedColor = (speed) => {
    if (speed < 3) {
      return 'red';
    } else if (speed >= 3.1 && speed <= 10) {
      return 'orange';
    } else if (speed >= 10.01 && speed <= 20) {
      return 'blue';
    } else if (speed > 20.01) {
      return 'green';
    } else {
      return 'black'; // Color por defecto
    }
  };

  // Datos para el gráfico
  const chartData = {
    labels: speedHistory.map((_, index) => `Consulta ${index + 1}`),
    datasets: [
      {
        label: 'Velocidad de Descarga (Mbps)',
        data: speedHistory,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="internet-speed-checker">
      <div className="indicator-container">
        <h3>
          Velocidad Actual:  
           <span style={{ color: getSpeedColor(speed) }}>
             {speed !== null ? formatSpeed(speed) : 'Calculando...'} Mbps
          </span>
        </h3>
        <h4>Próxima verificación en: {counter} segundos</h4>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        transition={Slide} 
      />
    </div>
  );
};

export default InternetSpeedChecker;
