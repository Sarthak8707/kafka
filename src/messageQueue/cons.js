import { getChannel } from "./rabbitmq.js";

async function run() {
  const channel = await getChannel();

  const queue = "orders";

  await channel.assertQueue(queue, {
    durable: true,
  });

  console.log("Waiting for messages...");

  channel.consume(queue, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("Received:", data);

    channel.ack(msg);
  });
}

run();