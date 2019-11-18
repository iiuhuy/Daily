async function getKeys() {
  const Redis = require("ioredis");

  const redis = new Redis({
    port: 6379, // redis port
    host: "127.0.0.1" // host
  });

  await redis.set("c", 12345);
  await redis.setex("yh", 10, "10 s disappear!");
  const keys = await redis.keys("*"); // 异步 await 获取
  console.log(keys);
  console.log(await redis.get("b"));
}

getKeys();
