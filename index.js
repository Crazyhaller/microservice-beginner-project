import UserService from './services/user.service.js'
import EmailService from './services/email.service.js'
import AuthService from './services/auth.service.js'

async function startApp() {
  await UserService.start()
  await EmailService.start()
  await AuthService.start()

  try {
    // Simulate User creation
    const newUser = await UserService.call('user.createUser', {
      username: 'Suvigya',
      email: 'suvigya@gmail.com',
    })
    console.log('New user created:', newUser)
    const users = await UserService.call('user.getUsers')
    console.log('All Users:', users)

    // Simulate Email sending
    const emailResult = await EmailService.call('email.sendEmail', {
      recepient: newUser.email,
      subject: 'Welcome to our platform',
      content: 'We are glad to have you on board',
    })
    console.log('Email result:', emailResult)

    // Simulate User authentication
    const authResult = await AuthService.call('auth.authUser', {
      username: newUser.username,
      password: 'password',
    })
    console.log('Auth result:', authResult)
  } catch (error) {
    console.error('Error occured:', error.message)
  } finally {
    await UserService.stop()
    await EmailService.stop()
    await AuthService.stop()
  }
}

startApp()
