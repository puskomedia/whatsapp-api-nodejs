require('dotenv').config();
const amqp = require('amqplib');
const ListenerDocument = require('./ListenerDocument');

module.exports = {
    init: async () => {
        const opt = {
            credentials: require('amqplib').credentials.plain(process.env.RABBITMQ_USER, process.env.RABBITMQ_PASSWORD)
        };
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER, opt);
        const channel = await connection.createChannel();
        const listenerBroadcast = new ListenerDocument();

        await channel.assertQueue('meotify:send:message_documents', {
            durable: true,
        });

        channel.consume('meotify:send:message_documents', listenerBroadcast.listen, {
            noAck: true
        });
    }
}