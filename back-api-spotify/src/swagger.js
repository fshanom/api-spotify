import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Spotify Collector',
    description: 'Collects data from artist from the Spotify API Service, such as albums.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('./routes/index.js'); // Your project's root file
});
