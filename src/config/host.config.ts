export const hostConfig = {
  protocol: process.env.HOST_PROTOCOL || "http",
  host: process.env.HOST || "localhost"
}