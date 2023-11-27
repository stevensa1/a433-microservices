require('dotenv').config();

const express = require('express');
const app = express();

const bp = require('body-parser');

const amqp = require('amqplib');
const amqpServer = process.env.AMQP_URL;
let channel, connection;

const maxRetries = 5; // Maximum number of connection retry attempts
let retryCount = 0;

async function connectToQueue() {
    try {
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue('order');
        channel.consume('order', (data) => {
            console.log(`Order received: ${Buffer.from(data.content)}`);
            console.log('** Will be shipped soon! **\n');
            channel.ack(data);
        });
        console.log('Connected to the queue successfully!');
        retryCount = 0; // Reset retry count on successful connection
    } catch (ex) {
        console.log(`Error while connecting to the queue: ${ex.message}`);
        if (retryCount < maxRetries) {
            retryCount++;
            console.log(
                `Retrying in 5 seconds (Retry ${retryCount}/${maxRetries})...`
            );
            setTimeout(connectToQueue, 5000); // Retry after 5 seconds
        } else {
            console.log('Maximum retry attempts reached. Exiting application.');
            process.exit(1); // Exit the application after maximum retries
        }
    }
}

connectToQueue(); // Initial connection attempt

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
});
