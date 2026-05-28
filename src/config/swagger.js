import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book My Ticket API',
      version: '1.0.0',
      description: 'API documentation for the Book My Ticket backend service.',
    },
    servers: [
      {
        url: 'http://localhost:3000/bmt/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
          description: 'Provide your x-access-token obtained from login/signup'
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
