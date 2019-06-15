import Proxy from './Proxy';

class UserProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/user', parameters);
  }
}

export default UserProxy;
