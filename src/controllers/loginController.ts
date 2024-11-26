import { sendEmail } from '../services/emailService'
import { loginLink } from '../services/authService'
import { type ILogin } from '../types/loginControllerTypes'
import { type Request, type Response } from 'express'
import User from '../models/userModel'

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email } = req?.body as ILogin

  try {
    const user = await User.findOne({ email }).exec()
    if (!user) {
      res.status(200).send({ message: 'Se o email estiver registrado, você receberá um link para login.' })
      return
    }

    const link = loginLink({ email, req })

    await sendEmail({
      to: email,
      subject: 'Aqui está seu link',
      text: `Clique aqui para logar: ${link}`,
      html: `<p>Seu link para login:</p><p><a href="${link}">Clique aqui</a></p>`
    })

    res.status(200).send({ message: 'Se o email estiver registrado, você receberá um link para login.' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao processar o login')
  }
}
