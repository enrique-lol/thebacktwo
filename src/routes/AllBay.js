import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bayIndex } from '../api/bay-auth.js'
import Card from 'react-bootstrap/Card'
import apiUrl from '../apiConfig'
import axios from 'axios'
// import ItemsInBay from './../routes/ItemsInBay.js'

class BayIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bay: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    bayIndex(user)
      // .then(res => console.log(res.data.bay))
      .then(res => this.setState({ bay: res.data.bay }))
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  loadBatch = () => {
    axios({
      url: `${apiUrl}/second14`,
      method: 'GET'
    })
      .then(res => this.setState({ bay: [...this.state.bay, res.data.bay] }))
      .then(() => console.log(`STATE: ${this.state.bay}`))
      .catch(console.error)
  }

  render () {
    const { bay } = this.state

    if (!bay) {
      return (
        <p>!bays</p>
      )
    }
    if (bay.length === 0) {
      return (
        <p>0 Items to show</p>
      )
    }

    const baysJsx = bay.map(bay => (
      <Card key={bay._id}>
        <Link to={`/bay/${bay._id}`}>
          <h3>{bay.title}</h3>
        </Link>
        <p>Below, are items with BayID of {bay._id}</p>
      </Card>

    ))

    return (
      <Fragment>
        <div className='content'>
          {baysJsx}
        </div>
      </Fragment>
    )
  }
}
// < ItemsInBay id={bay._id} />

export default BayIndex
