import apiUrl from '../apiConfig'
import axios from 'axios'

export const itemIndex = (user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'GET'
  })
}

export const homeIndex = () => {
  return axios({
    url: apiUrl + '/items',
    method: 'GET'
  })
}
export const itemsSelect = (bay) => {
  console.log(bay)
  return axios({
    url: apiUrl + '/items-select/',
    method: 'GET',
    data: {
      bay: bay
    }
  })
}
export const index14 = (user, loadCount) => {
  return axios({
    url: apiUrl + '/next14',
    method: 'GET',
    data: {
      loadCount
    }
  })
}

export const itemCreate = (item, user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      item
    }
  })
}
export const viewItem = (id) => {
  return axios({
    url: apiUrl + '/item/' + id,
    method: 'GET'
  })
}

export const itemsinColl = (id) => {
  return axios({
    url: apiUrl + '/itemsincoll/' + id,
    method: 'GET'
  })
}

export const itemUpdate = (id, item, user) => {
  return axios({
    url: apiUrl + '/item/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      item: item
    }
  })
}
