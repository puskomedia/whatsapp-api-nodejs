class ListenerText {
    async listen(messages) {
        try {
            const {
                key,
                id,
                message
            } = JSON.parse(messages.content.toString());
            const data = await WhatsAppInstances[key].sendTextMessage(
                id,
                message
            )
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ListenerText;
