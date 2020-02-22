class LoginRouter {
  async route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: {}
    }
  }
}

class MissingParamError extends Error {
  constructor (paramError) {
    super(`Missing Param ${paramError}`)
    this.name = 'MissingParamError'
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
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
    const sut = new LoginRouter()
    const httResponse = await sut.route()
    expect(httResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', async () => {
    const sut = new LoginRouter()
    const httResponse = await sut.route({})
    expect(httResponse.statusCode).toBe(500)
  })
})
