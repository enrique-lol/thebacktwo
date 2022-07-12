import apiUrl from '../apiConfig'
import axios from 'axios'

export const bayIndex = () => {
  return axios({
    url: apiUrl + '/bay',
    method: 'GET'
  })
}

export const createBay = (bay, user) => {
  return axios({
    url: apiUrl + '/bay',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      bay
    }
  })
}
export const bayView = (id) => {
  return axios({
    url: apiUrl + '/bay/' + id,
    method: 'GET'
  })
}

export const bayUpdate = (id, bay, user) => {
  return axios({
    url: apiUrl + '/bay/' + id,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      bay: bay
    }
  })
}
