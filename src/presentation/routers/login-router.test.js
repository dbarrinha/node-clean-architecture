const LoginRouter = require('./login-router.js')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth ({ email, password }) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = await sut.route(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httResponse = await sut.route(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.route()
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const { sut } = makeSut()
    const httResponse = await sut.route({})
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should call AuthUseCase white correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Should return 401 when invalid cretendials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      }
    }
    const httResponse = await sut.route(httpRequest)
    expect(httResponse.statusCode).toBe(401)
  })
})
