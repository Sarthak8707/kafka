import { getChannel } from "./rabbitmq.js";

const items = [{orderId: 111, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
    {orderId: 11, product: "laptop"}, {orderId: 222, product: "phone"}, {orderId: 333, product: "tablet"},
]

async function run() {
  const channel = await getChannel();

  const queue = "orders";

  await channel.assertQueue(queue, {
    durable: true,
  });

  for(let i=0; i<items.length; i++){
    const item = items[i];
    channel.sendToQueue(
    queue,
    Buffer.from(
      JSON.stringify(item)
    ),
    {
      persistent: true,
    }
  );
  }

  console.log("Message sent");
}

run();