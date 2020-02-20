module.exports = class LoginRouter {
  async route (httpRequest) {
    /* const { email, password, repeatPassword } = httpRequest.body
        const user = new SignUseCase().signUp(email, password, repeatPassword)
        */
    return {
      statusCode: 400,
      body: {}
    }
  }
}
