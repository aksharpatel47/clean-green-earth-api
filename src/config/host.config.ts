export const hostConfig = {
  protocol: process.env.HOST_PROTOCOL || "http",
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 8080
}