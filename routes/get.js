'use-strict'

module.exports = {
  get: async (ctx, next) => {
    console.log('Incoming get request:')
    console.log(ctx.request)

    ctx.response.status = 200
    ctx.response.body = { message: 'This is a GET response' }
  }
}
