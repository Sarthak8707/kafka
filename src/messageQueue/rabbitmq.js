import amqp from "amqplib";

import dotenv from "dotenv";
dotenv.config();

const URL = process.env.CLOUDAMQP_URL;

let channel;

export async function getChannel() {
  if (channel) return channel;

  const connection = await amqp.connect(URL);

  channel = await connection.createChannel();

  console.log("RabbitMQ connected");

  return channel;
}