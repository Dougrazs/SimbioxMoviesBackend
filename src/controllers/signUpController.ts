import { sendEmail } from '../services/emailService'
import { type Request, type Response } from 'express'
import { type IUser } from '../types/userTypes'
import { createNewUser } from '../services/userService'
import { loginLink } from '../services/authService'
import User from '../models/userModel'

export const signUpController = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req?.body
  const movies = []
  const user: IUser = { name, email, movies }

  try {
    const userExists = await User.findOne({ email }).exec()
    const link = loginLink({ email, req })
    if (userExists) {
      await sendEmail({
        to: email,
        subject: 'Login Link',
        text: `Clique no link para fazer login: ${link}`,
        html: `<p>Clique no link para fazer login:</p><p><a href="${link}">Link de login</a></p>`
      })

      res.status(200).send({ message: 'Usuário já registrado. Email de login enviado!' })
    } else {
      await createNewUser(user, res)
      await sendEmail({
        to: email,
        subject: `Bem-vindo, ${name}! Obrigado por se inscrever!`,
        text: `<h2>Preparado para criar sua lista de filmes favoritos?</h2> siga este link <p><a href={'${link}'}>Link de login</a></p>`
      })

      res.status(200).send({ message: 'Usuário criado com sucesso!' })
    }
  } catch (err) {
    console.error('Erro ao processar sua solicitação:', err)

    if (!res.headersSent) {
      res.status(500).send({ message: 'Erro ao criar usuário ou enviar o email.' })
    }
  }
}
