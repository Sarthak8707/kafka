import { Kafka } from "kafkajs";
import fs from "fs";
import "dotenv/config";

export const kafka = new Kafka({
  clientId: "my-app",

  brokers: [
    "kafka-25c4bf9c-sarthakssingh49-391d.j.aivencloud.com:28750"
  ],

  ssl: {
    ca: [fs.readFileSync("./src/ca.pem", "utf-8")],
  },

  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME ,
    password: process.env.KAFKA_PASSWORD,
  },
});

const producer = kafka.producer();

async function run() {
  try{
    await producer.connect();

  await producer.send({
    topic: "test-topic",
    messages: [
      { value: "this will show in both consumer groups" }
    ],
  });

  console.log("Sent!");
  }
  catch(e){
    console.log("Failed:", e);
  }
}

run();