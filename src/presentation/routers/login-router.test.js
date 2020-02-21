class LoginRouter {
  async route (httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return {
        statusCode: 400,
        body: {}
      }
    }
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
  })
})
