import Boom from 'boom'

exports.Boom = {
  Joi: options => {
    const defaults = {
      message: options.message || 'One or more fields are incorrect',
      key: options.key || null,
      source: options.source || 'payload',
      path: options.path || options.key,
      type: options.type || 'any.server',
      context: options.context
    }

    const error = Boom.badRequest(defaults.message)
    error.output.payload.validation = [defaults]

    return error
  }
}
