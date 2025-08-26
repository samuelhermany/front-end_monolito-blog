import { useState, ChangeEvent, FormEvent } from 'react'
import styles from './index.module.css'

import { NavLink, useNavigate } from 'react-router-dom'
import { Eye, EyeSlash, XCircle } from 'phosphor-react'
import logo from '../../assets/img/AKNSolutions_logo.png'

import apiClient from '../../helper/ApiClient'

export function Register() {
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    try {
      // Envia para o backend Java
      const response = await apiClient.authors.create({
        name: email.split('@')[0], // ou outro campo que queira usar
        email: email,
        bio: 'Usuário registrado via front-end', // pode ajustar
      })

      if (response.data) {
        setMessage('Conta criada com sucesso!')
        navigate('/login')
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || error.message)
    }

    setEmail('')
    setPassword('')
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const clearEmail = () => setEmail('')

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.login}>
        <h1>Crie sua conta</h1>
        {message && <span>{message}</span>}
        <form className={styles.formLogin} onSubmit={handleRegister}>
          <div className={styles.input}>
            <p className={styles.label}>Email</p>
            <input onChange={handleEmailChange} value={email} type="email" placeholder="usuario@gmail.com" required />
            <button type="button" onClick={clearEmail} className={styles.buttonClear}>
              <XCircle size={20} />
            </button>
          </div>
          <div className={styles.input}>
            <p className={styles.label}>Senha</p>
            <input
              onChange={handlePasswordChange}
              type={visible ? 'text' : 'password'}
              value={password}
              placeholder="senha"
              required
            />
            <button type="button" className={styles.buttonVisibilityPassword} onClick={() => setVisible(!visible)}>
              {visible ? <EyeSlash /> : <Eye />}
            </button>
          </div>
          <button type="submit">Registrar</button>
          <div className={styles.register}>
            <p>Você já tem uma conta?</p>
            <p>
              <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </form>
      </div>

      <div className={styles.background}></div>
    </div>
  )
}
