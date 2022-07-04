require('dotenv').config();
const amqp = require('amqplib');
const ListenerText = require('./ListenerText');

const init = async () => {
    const opt = { credentials: require('amqplib').credentials.plain(process.env.RABBITMQ_USER, process.env.RABBITMQ_PASSWORD) };
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER, opt);
    const channel = await connection.createChannel();
    const listenerTextBroadcast = new ListenerText();

    await channel.assertQueue('meotify:send:messages', {
        durable: true,
    });

    channel.consume('meotify:send:messages', listenerTextBroadcast.listen, {
        noAck: true
    });
}

init();

module.exports = init;
