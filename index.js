require('dotenv').config();

const express = require('express');
const app = express();

const bp = require('body-parser');
app.use(bp.json());

const amqp = require('amqplib');
const amqpServer = process.env.AMQP_URL;
let channel, connection;

connectToQueue();

async function connectToQueue() {
    try {
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        const queue = 'order';
        await channel.assertQueue(queue);
        console.log('Connected to the queue!');
    } catch (ex) {
        console.error(`Error while connecting to the queue: ${ex.message}`);
        retryConnection(); // Retry the connection
    }
}

function retryConnection() {
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectToQueue, 5000); // Retry after 5 seconds
}

app.post('/order', (req, res) => {
    const { order } = req.body;
    createOrder(order);
    res.send(order);
});

const createOrder = async (order) => {
    const queue = 'order';
    try {
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
        console.log('Order successfully created!');
    } catch (ex) {
        console.error(`Error while sending order to the queue: ${ex.message}`);
    }
};

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
});

process.once('SIGINT', async () => {
    console.log('Got SIGINT, closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
});
