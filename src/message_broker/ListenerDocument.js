const axios = require('axios');
class ListenerDocument {
    async listen(messages) {
        try {
            const {
                key,
                id,
                file,
                filename,
                type,
                webhookUrl
            } = JSON.parse(messages.content.toString());
            // eslint-disable-next-line no-empty
            if(file.buffer === 'undefined'){
                console.log('image undefined. please send it again.');
            }else{
                file.buffer = Buffer.from(file.buffer.data);
                // console.log(id,file);
                const data = await WhatsAppInstances[key].sendMediaFile(
                    id,
                    file,
                    type,
                    '',
                    filename,
                )
                if(data.status == 1){
                    if (typeof webhookUrl !== 'undefined') {
                        if(webhookUrl != ''){
                            const axiosInstance = axios.create({
                                baseURL: webhookUrl,
                            });
                            const notifData = {
                                key,
                                message:'',
                                messageType: 'DOCUMENT',
                                receiver: id,
                                status: 2,
                            };
                            await axiosInstance.post('/api/set_status_message', notifData).catch(function(error){
                                console.log(error.response)
                            });
                        }
                    }
                }
            }
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = ListenerDocument;
