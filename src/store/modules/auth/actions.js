import Vue from 'vue';
import store from '@/store';
import * as types from './mutation-types';
import AuthProxy from '@/proxies/AuthProxy';
const proxy = new AuthProxy();

export const check = ({commit}) => {
  commit(types.CHECK);
};

export const register = ({commit}, user) => {
  proxy
    .register(user)
    .then((response) => {
      commit(types.REGISTER, response)
      store.dispatch('user/find')
      Vue.router.push({
        name: 'home.index',
      })
    })
    .catch((error) => {
        store.dispatch('setError', error.message)
    })
}

export const login = ({commit}, user) => {
  proxy
    .login(user)
    .then((response) => {
        commit(types.LOGIN, response.token);
        store.dispatch('user/find')
        Vue.router.push({
            name: 'home.index',
        })
    })
    .catch((error) => {
        store.dispatch('setError', error.message)
    })
};

export const logout = ({commit}) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login',
  });
};

export const find = ({commit}) => {
  /*
   * Normally you would use a proxy to fetch the account:
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
  const account = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'jonh@doe.com',
  };

  commit(types.FIND, account);
};
export default {
  check,
  register,
  login,
  logout,
  find
};
