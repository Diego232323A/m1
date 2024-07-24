const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.json());

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_email@gmail.com',
        pass: 'tu_contraseña'
    }
});

// Endpoint para enviar notificación
app.post('/sendNotification', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'tu_email@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`NotificationService is running on port ${port}`);
});
