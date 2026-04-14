const swaggerJsdoc = require("swagger-jsdoc");

// ✅ dynamic base URL
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://product-figma-5.onrender.com/api"
    : "http://localhost:3000/api";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shoe Store API",
      version: "1.0.0",
      description: "API documentation for Shoe Ecommerce Project"
    },

    // ✅ FIXED HERE
    servers: [
      {
        url: baseUrl
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./app/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;