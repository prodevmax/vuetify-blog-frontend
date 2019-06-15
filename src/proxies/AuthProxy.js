import Proxy from './Proxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api', parameters);
  }

  /**
   * Method used to login.
   *
   * @returns {Promise} The result in a promise.
   */
  login(user) {
    const data = {
      username: user.username,
      password: user.password,
      //client_id: process.env.VUE_APP_API_CLIENT_ID,
      //client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
      grant_type: 'password',
      scope: '',
    };

    return this.submit('post', `${this.endpoint}/auth_check`, data);
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }
}

export default AuthProxy;
