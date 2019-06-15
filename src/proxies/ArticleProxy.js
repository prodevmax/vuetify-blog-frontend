import Proxy from './Proxy';
import Vue from 'vue';

class ArticleProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/articles', parameters);
  }

  /**
   * Method for upload file.
   *
   * @returns {Promise} The result in a promise.
   */
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return new Promise((resolve, reject) => {
      Vue.$http['post']('api/files/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          resolve(response.data)
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data)
          } else {
            reject()
          }
        })
    })
  }
}

export default ArticleProxy;
