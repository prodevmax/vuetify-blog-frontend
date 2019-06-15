export default {
    getAll: state => state.articles,
    getActive: state => state.articles.filter(article => (article.active === true)),
    getOne: state => id => {
      return state.articles.find(item => item.id === Number(id))
    }
}
