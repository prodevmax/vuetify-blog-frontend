/* ============
 * Account Transformer
 * ============
 *
 * The transformer for the article.
 */

import Transformer from './Transformer';

export default class AccountTransformer extends Transformer {
  /**
   * Method used to transform a fetched article.
   *
   * @param article The fetched article.
   *
   * @returns {Object} The transformed article.
   */
  static fetch(article) {
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      body: article.body,
      active: article.active,
      fileUrl: article.file ? article.file.url : ''
    };
  }

  /**
   * Method used to transform a send article.
   *
   * @param article The article to be send.
   *
   * @returns {Object} The transformed article.
   */
  static send(article) {
    return {
      id: article.id,
      title: article.title,
      author: article.author,
      body: article.body,
      active: article.active,
      file_name: article.fileName
    };
  }
}
