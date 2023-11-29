import Redis from "ioredis";
const host = process.env.DATASOURCE_HOST || "localhost";
const port = process.env.DATASOURCE_PORT || 6379;
const secret = process.env.DATASOURCE_SECRET
  ? `:${process.env.DATASOURCE_SECRET}@`
  : "";

const redis = () => new Redis(`redis://${secret}${host}:${port}`);

export default redis;