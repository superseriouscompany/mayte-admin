const baseUrl = process.env.NODE_ENV === 'production' ?
                'https://api.dateunicorn.com' :
                'http://mayte.ngrok.io'

function request(path, options = {}) {
  if( path[0] != '/' ) path = `/${path}`;

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  options.headers['Accept'] = 'application/json'
  if( options.accessToken ) {
    options.headers['X-Access-Token'] = options.accessToken
    delete options.accessToken
  }
  if( options.body && typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }

  var ok, statusCode;
  return fetch(
    `${baseUrl}${path}`,
    options,
  ).then((response) => {
    ok         = response.ok
    statusCode = response.status
    if( statusCode === 204 ) { return true }
    return response.json()
  }).then((json) => {
    if( !ok ) {
      var err = new Error(json.message || json.error || JSON.stringify(json))
      err.name = 'ApiError'
      err.statusCode = statusCode
      throw err
    }
    return json
  }).catch((err) => {
    if( err.name == 'ApiError' ) { throw err }

    err.statusCode = statusCode
    console.error(err)
    throw err
  })
}

export default request
