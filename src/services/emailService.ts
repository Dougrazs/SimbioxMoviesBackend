import { transporter } from '../config/nodeMailerConfig'
import config from '../config/envConfig'
import { type IEmailConfiguration } from '../types/emailTypes'

export const sendEmail = (emailConfig: IEmailConfiguration): any => {
  const mailOptions = {
    from: config.EMAILUSER,
    to: emailConfig.to,
    subject: emailConfig.subject,
    text: emailConfig.text,
    html: emailConfig.html
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error); return
    }
    console.log('Email sent: ' + info.response)
  })
}
