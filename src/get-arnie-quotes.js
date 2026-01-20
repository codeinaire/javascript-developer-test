const { httpGet } = require('./mock-http-interface')

const getArnieQuotes = async (urls) => {
  const arnieQuotesPromises = urls.map((url) => httpGet(url))
  const arnieQuotes = await Promise.all(arnieQuotesPromises)
  return processArnieQuotes(arnieQuotes)
}

const SUCCESS_CODE = 200

const processArnieQuotes = (arnieQuotes) => {
  return arnieQuotes.map((arnieQuote) => {
    const { status, body } = arnieQuote
    const { message } = JSON.parse(body)

    if (status === SUCCESS_CODE) {
      return {
        'Arnie Quote': message,
      }
    } else {
      return {
        FAILURE: message,
      }
    }
  })
}

module.exports = {
  getArnieQuotes,
}
