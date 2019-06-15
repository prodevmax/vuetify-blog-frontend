import * as types from './mutation_types'
import store from '@/store'
import Vue from 'vue'
import ArticleProxy from '@/proxies/ArticleProxy'
import Transformer from '@/transformers/ArticleTransformer'
const proxy = new ArticleProxy()
export default {
    fetchAll ({ commit }) {
      proxy
        .all()
        .then((response) => {
          commit(types.FETCH_ALL, Transformer.fetchCollection(response))
        })
        .catch((e) => {
          store.dispatch('setError', 'Fetch articles failed' + e.message)
        });
    },
    create ({ commit }, data) {
      proxy
        .uploadFile(data.file)
        .then((response) => {
            data.fileName = response.file_name
            proxy.create(Transformer.send(data))
                .then((response) => {
                  Vue.router.push({
                    name: 'article.view',
                    params: {
                      id: response.id
                    }
                  })
                })
                .catch((e) => {
                  store.dispatch('setError', 'Upload file failed' + e.message)
                });
            })
        .catch((e) => {
          store.dispatch('setError','Create article failed: ' + e.message)
        })
    },
    update ({ commit }, data) {
      proxy
        .uploadFile(data.file)
        .then((response) => {
          data.fileName = response.file_name
          proxy.update(data.id, Transformer.send(data))
            .then((response) => {
              Vue.router.push({
                name: 'article.view',
                params: {
                  id: data.id
                }
              })
            })
            .catch((e) => {
              store.dispatch('setError', 'Upload file failed' + e.message)
            });
        })
        .catch((e) => {
          store.dispatch('setError','Update article failed: ' + e.message)
        })
    },
    destroy ({ commit, dispatch }, id) {
        proxy.destroy(id)
            .then(() => {
                Vue.router.push({
                    name: 'article.list',
                  })
                dispatch('fetchAll')
            })
            .catch((e) => {
                store.dispatch('setError','Delete article failed: ' + e.message)
            });
    }
}
