export const state = () => ({
  data: []
})

export const getters ={
  getData(state) {
    return state.data
  }
}

export const actions = {
  addNewData({commit}, data) {
    let newData = {
      id: Math.floor(Math.random()*10),
      number: data.number,
      holder: data.holder,
      year: data.year,
      month: data.month,
      cvv: data.cvv
    }

    commit('addData', newData)
    return true
  }
}

export const mutations = {
  addData(state, data) {
    state.data.push(data)
  }
}
