import * as types from './mutation_types'
export default {
    [types.FETCH_ALL] (state, data) {
      state.articles = data
    },
    [types.CREATE] (state, data) {
      state.articles.push(data)
    },
    [types.UPDATE] (state, id, data) {
      const article = state.articles.find(item => item.id === id)
      article.title = data.title
      article.author = data.author
      article.body = data.body
      article.imgSrc = data.imgSrc
      article.active = data.active
    }
}
