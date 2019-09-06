const responseBody = {
  code: 0,
  message: '',
  data: null
}

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (
    headers !== null &&
    typeof headers === 'object' &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers
  }
  return responseBody
}

export const pageBuilder = (options, dataFunc) => {
  const params = getQueryParameters(options)
  const number = parseInt(params.page)
  const size = parseInt(params.size)
  const arr = []
  for (let i = 0; i < size; ++i) {
    arr.push(dataFunc(i))
  }
  return builder({
    number,
    size,
    totalElements: 100,
    content: arr
  })
}

export const getQueryParameters = options => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getFormParameters = options => {
  let body = options.body
  if (!body) {
    return {}
  }
  if (body.charAt(body.length - 1) === '&') {
    body = body.substring(0, body.length - 1)
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(body)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = options => {
  return options.body && JSON.parse(options.body)
}
