import { createClient } from "redis";

export const connectRedis = async () => {
  try {
    const client = createClient({
      uri: "redis://:4MZ6nX2eLwrE3ZjdjKNdxuD9C7QXZuLI@redis-14533.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:14533",
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    console.log("conected-redis");
  } catch (error) {
    console.log(error);
  }
};
