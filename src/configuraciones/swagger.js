const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
        title: 'API seminario',
        version: '1.0.0',
        description: 'API para el seminario de desarrollo web',
        contact: {
            email: 'seminario@example.com',
            name: 'Equipo de Seminario',
            url: 'https://seminario.example.com'
        }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}/api`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },    
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../rutas/*.js')], // Ruta a los archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
