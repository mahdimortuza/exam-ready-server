import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_DEV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mahdi.webx@gmail.com',
      pass: 'zcwh uqmg jtzd gldu',
    },
  });
  await transporter.sendMail({
    from: 'mahdi.webx@gmail.com', // sender address
    to,
    subject: 'Reset your password within 10 minutes.', // Subject line
    text: 'Reset your password', // plain text body
    html, // html body
  });
};
