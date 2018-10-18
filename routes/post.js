'use-strict'

module.exports = {
  post: async (ctx, next) => {
    console.log('Incoming POST request:')
    console.log(ctx.request)

    if(!ctx.request.body.value) {
      console.log('.value required in the request body')
      ctx.throw(400, '.value required in the request body')
    }
    const value = ctx.request.body.value

    ctx.response.status = 200
    ctx.response.body = { message: `This is a POST response. body.value = ${value}` }
  },

  postParameters: async (ctx, next) => {
    console.log('Incoming POST request:')
    console.log(ctx.request)

    if(!ctx.params.value) {
      console.log('.value required in the request parameters')
      ctx.throw(400, '.value required in the request parameters')
    }
    const value = ctx.params.value

    ctx.response.status = 200
    ctx.response.body = { message: `This is a POST response. params.value = ${value}` }
  }
}
