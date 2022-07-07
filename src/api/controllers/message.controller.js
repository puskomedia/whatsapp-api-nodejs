const producerService = require('../../services/rabbitmq/producerService');
exports.Text = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendTextMessage(
        req.body.id,
        req.body.message
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Image = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'image',
        req.body?.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Video = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'video',
        req.body?.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Audio = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'audio'
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Document = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendMediaFile(
        req.body.id,
        req.file,
        'document',
        '',
        req.body.filename
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Mediaurl = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendUrlMediaFile(
        req.body.id,
        req.body.url,
        req.body.type, // Types are [image, video, audio, document]
        req.body.mimetype, // mimeType of mediaFile / Check Common mimetypes in `https://mzl.la/3si3and`
        req.body.caption
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Button = async (req, res) => {
    // console.log(res.body)
    const data = await WhatsAppInstances[req.query.key].sendButtonMessage(
        req.body.id,
        req.body.btndata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.Contact = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendContactMessage(
        req.body.id,
        req.body.vcard
    )
    return res.status(201).json({ error: false, data: data })
}

exports.List = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendListMessage(
        req.body.id,
        req.body.msgdata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.MediaButton = async (req, res) => {
    const data = await WhatsAppInstances[req.query.key].sendMediaButtonMessage(
        req.body.id,
        req.body.btndata
    )
    return res.status(201).json({ error: false, data: data })
}

exports.SetStatus = async (req, res) => {
    const presenceList = [
        'unavailable',
        'available',
        'composing',
        'recording',
        'paused',
    ]
    if (presenceList.indexOf(req.body.status) === -1) {
        return res.status(400).json({
            error: true,
            message:
                'status parameter must be one of ' + presenceList.join(', '),
        })
    }

    const data = await WhatsAppInstances[req.query.key]?.setStatus(
        req.body.status,
        req.body.id
    )
    return res.status(201).json({ error: false, data: data })
}

exports.BroadcastText = async (req, res) => {
    const id = req.body.id;
    const message = req.body.message;
    const key = req.query.key;
    const webhookUrl = req.body.webhook;
    const messageBody = {
        key,
        id,
        message,
        webhookUrl
    }
    await producerService.sendMessage('meotify:send:messages',JSON.stringify(messageBody));
    return res.status(201).json({ error: false, message: "Your message on queue." });
}

exports.BroadcastImage = async (req, res) => {
    const key = req.query.key;
    const id = req.body.id;
    const file = req.file;
    const caption = req.body?.caption;
    const webhookUrl = req.body.webhook;
    const type = 'image'
    const messageBody = {
        key,
        id,
        file,
        type,
        caption,
        webhookUrl
    }
    await producerService.sendMessage('meotify:send:message_images',JSON.stringify(messageBody));
    return res.status(201).json({ error: false, message: "Your message on queue." });
}

exports.BroadcastDocument = async (req, res) => {
    const key = req.query.key;
    const id = req.body.id;
    const file = req.file;
    const filename = req.body.filename;
    const webhookUrl = req.body.webhook;
    const type = 'document'
    const messageBody = {
        key,
        id,
        file,
        type,
        filename,
        webhookUrl
    }
    await producerService.sendMessage('meotify:send:message_images',JSON.stringify(messageBody));
    return res.status(201).json({ error: false, message: "Your message on queue." });
}
