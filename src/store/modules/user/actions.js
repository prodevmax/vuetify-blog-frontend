import * as types from './mutation-types';

export const find = ({ commit }) => {
  /*
   * Normally you would use a proxy to fetch the user:
   *
   * new Proxy()
   *  .find()
   *  .then((response) => {
   *    commit(types.FIND, Transformer.fetch(response));
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  const user = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'jonh@doe.com',
  };

  commit(types.FIND, user);
};

export default {
  find,
};
