// // server.js
// const express = require('express');
// const speedTest = require('speedtest-net');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// app.use(cors());

// app.get('/speedtest', async (req, res) => {
//   try {
//     const test = await speedTest({ acceptGdpr: true });

//     res.json({
//       downloadSpeed: test.download.bandwidth / 125000, // Convertir de bytes/s a Mbps
//       uploadSpeed: test.upload.bandwidth / 125000, // Convertir de bytes/s a Mbps
//       ping: test.ping.latency,
//     });
//   } catch (err) {
//     console.error('Error running speed test:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




// server.js
// const express = require('express');
// const FastSpeedtest = require('fast-speedtest-api');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// app.use(cors());

// app.get('/speedtest', async (req, res) => {
//   const speedtest = new FastSpeedtest({
//     token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm', // Puedes obtener el token explorando las llamadas en fast.com
//     verbose: false,
//   });

//   try {
//     const speed = await speedtest.getSpeed();
//     res.json({
//       downloadSpeed: speed, // speed is in Mbps
//     });
//   } catch (err) {
//     console.error('Error running speed test:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




// server.js
// const express = require('express');
// const FastSpeedtest = require('fast-speedtest-api');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// // Asegúrate de obtener el token correcto explorando las llamadas en fast.com
// const SPEEDTEST_TOKEN = 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm'; 

// app.use(cors());

// app.get('/speedtest', async (req, res) => {
//   const speedtest = new FastSpeedtest({
//     token: SPEEDTEST_TOKEN,
//     unit: FastSpeedtest.UNITS.Mbps, // Añadir esta línea para obtener la velocidad en Mbps
//     verbose: false,
//   });

//   try {
//     const speed = await speedtest.getSpeed();
//     console.log(`Speed in Mbps: ${speed}`);

//     res.json({
//       downloadSpeed: parseFloat(speed.toFixed(2)), // Limitar a 2 decimales
//     });
//   } catch (err) {
//     console.error('Error running speed test:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });









// // server.js
// const express = require('express');
// const FastSpeedtest = require('fast-speedtest-api');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// const SPEEDTEST_TOKEN = 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm'; // Asegúrate de obtener el token correcto

// app.use(cors());

// const MAX_RETRIES = 3;

// async function getSpeedWithRetries(retries) {
//   const speedtest = new FastSpeedtest({
//     token: SPEEDTEST_TOKEN,
//     unit: FastSpeedtest.UNITS.Mbps,
//     verbose: false,
//   });

//   for (let i = 0; i < retries; i++) {
//     try {
//       const speed = await speedtest.getSpeed();
//       return speed;
//     } catch (error) {
//       console.error(`Attempt ${i + 1} failed: ${error.message}`);
//       if (i === retries - 1) throw error; // If last attempt, throw error
//     }
//   }
// }

// app.get('/speedtest', async (req, res) => {
//   try {
//     const speed = await getSpeedWithRetries(MAX_RETRIES);
//     console.log(`Speed in Mbps: ${speed}`);

//     res.json({
//       downloadSpeed: parseFloat(speed.toFixed(2)), // Limitar a 2 decimales
//     });
//   } catch (err) {
//     console.error('Error running speed test:', err.message);
//     res.status(500).json({ error: 'Error running speed test' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });










// server.js
const express = require('express');
const FastSpeedtest = require('fast-speedtest-api');
const cors = require('cors');

const app = express();
const port = 4000;

const SPEEDTEST_TOKEN = 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm'; // Asegúrate de obtener el token correcto

app.use(cors());

const MAX_RETRIES = 3;

async function getSpeedWithRetries(retries) {
  const speedtest = new FastSpeedtest({
    token: SPEEDTEST_TOKEN,
    unit: FastSpeedtest.UNITS.Mbps,
    verbose: false,
  });

  for (let i = 0; i < retries; i++) {
    try {
      const speed = await speedtest.getSpeed();
      return speed;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) throw error; // If last attempt, throw error
    }
  }
}

app.get('/speedtest', async (req, res) => {
  try {
    const speed = await getSpeedWithRetries(MAX_RETRIES);
    console.log(`Speed in Mbps: ${speed}`);

    res.json({
      downloadSpeed: parseFloat(speed.toFixed(2)), // Limitar a 2 decimales
    });
  } catch (err) {
    console.error('Error running speed test:', err.message);
    res.status(500).json({ error: 'Error running speed test' });
  }
});

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optional: send the error to a logging service or simply log it
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optional: send the error to a logging service or simply log it
  // In a real-world scenario, you might want to restart the process
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});