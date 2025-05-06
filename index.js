// index.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 📧 Настройка почты (Gmail пример)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'giorgi.baxdasaryan@mail.ru',       // ⚠️ Твоя почта
    pass: 'junh mknq akzr bafp',    // ⚠️ Пароль приложения (НЕ обычный пароль!)
  },
});

// 📬 Обработка POST-запроса с формы
app.post('/api/send-email', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: 'grandauto1763@gmail.com', // куда отправлять
      subject: 'New Contact Form Message',
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed to send' });
  }
});

// 🚀 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
