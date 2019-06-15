import { FIND } from './mutation-types';

export default {
  [FIND](state, user) {
    state.email = user.email;
    state.firstName = user.firstName;
    state.lastName = user.lastName;
  },
};
