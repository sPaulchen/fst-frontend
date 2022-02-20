import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, CssBaseline, TextField } from '@mui/material'

const LoginComponent = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const _onLogin = () => {

  }

  const _onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      _onLogin()
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <img src='/images/ottoMeissner.jpg' style={{ width: '100%', margin: '50px 0 0 0' }} />
      <form noValidate>
        <TextField
          margin='normal'
          required
          fullWidth
          id='login'
          label='Login'
          name='login'
          autoComplete='login'
          autoFocus
          value={login}
          onChange={(event) => setLogin(event.currentTarget.value)}
          onKeyPress={_onKeyPress}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onKeyPress={_onKeyPress}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={_onLogin}
        >
          LOGIN
        </Button>
      </form>
    </Container>
  )
}
export default LoginComponent
