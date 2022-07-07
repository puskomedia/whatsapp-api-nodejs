const axios = require('axios');
class ListenerImage {
    async listen(messages) {
        try {
            const {
                key,
                id,
                file,
                caption,
                type,
                webhookUrl
            } = JSON.parse(messages.content.toString());
            file.buffer = Buffer.from(file.buffer.data);
            // console.log(id,file);
            const data = await WhatsAppInstances[key].sendMediaFile(
                id,
                file,
                type,
                caption
            )
            if(data.status == 1){
                if (typeof webhookUrl !== 'undefined') {
                    if(webhookUrl != ''){
                        const axiosInstance = axios.create({
                            baseURL: webhookUrl,
                        });
                        const notifData = {
                            key,
                            caption,
                            messageType: 'IMAGE',
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

module.exports = ListenerImage;
