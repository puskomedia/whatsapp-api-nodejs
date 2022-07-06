const axios = require('axios');
class ListenerText {
    async listen(messages) {
        try {
            const {
                key,
                id,
                message,
                webhookUrl
            } = JSON.parse(messages.content.toString());
            const data = await WhatsAppInstances[key].sendTextMessage(
                id,
                message
            );
            if(data.status == 1){
                if (typeof webhookUrl !== 'undefined') {
                    if(webhookUrl != ''){
                        const axiosInstance = axios.create({
                            baseURL: webhookUrl,
                        });
                        const notifData = {
                            key,
                            message,
                            messageType: 'TEXT',
                            receiver: id,
                            status: 2,
                        };
                        await axiosInstance.post('/api/set_status_message', notifData).catch(function(error){
                            console.log(error.response)
                        });
                    }
                }
            }
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = ListenerText;
