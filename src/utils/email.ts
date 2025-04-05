import { SITE_TITLE } from '@/lib/constants';
import { createTransport } from 'nodemailer';
import React from 'react'

interface EmailOptions<T extends {}> {
  from: string
  to: string,
  subject: string,
  component: React.ComponentType<T>,
  props: T,
  plaintextFn: (props: T) => string,
}

const smtpPort = parseInt(process.env.SMTP_PORT || 'NaN') || 465

//const transporter = createTransport({
//  host: process.env.SMTP_HOST || 'smtp.gmail.com',
//  port: smtpPort,
//  secure: smtpPort === 465,
//  auth: {
//    user: process.env.SMTP_USER,
//    pass: process.env.SMTP_PASSWORD,
//  },
//});

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail<T extends {}>(options: EmailOptions<T>) {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { from, to, subject, component, props, plaintextFn } = options
  const html = renderToStaticMarkup(React.createElement(component, props))
  const plaintext = plaintextFn(props)

  const mail = await transporter.sendMail({
    to,
    from: { name: SITE_TITLE, address: String(process.env.SMTP_USER) },
    sender: { name: SITE_TITLE, address: String(process.env.SMTP_USER) },
    subject,
    text: plaintext,
    html
  })
}
