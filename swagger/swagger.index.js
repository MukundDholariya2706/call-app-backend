const swaggerDoc = {
  openapi: "3.0.0",
  host: "",
  info: {
    title: "Call app swagger",
    version: "1.1",
    description: "Call app swagger. ",
  },
  servers: [
    {
      url: "http://172.16.0.210:3001",
      description: "Local Server",
    },
    {
      url: "https://call-app-backend.vercel.app/",
      description: "Vercel server",
    },
  ],
  tags: [
    {
      name: "User",
      description: "Users All API Route",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  paths: {},
};

module.exports = swaggerDoc;
