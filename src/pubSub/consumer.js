import {kafka} from "./kafka.js"

const consumer = kafka.consumer({ groupId: "test-group-3" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Received =======>", message.value?.toString());
    },
  });
}

run();