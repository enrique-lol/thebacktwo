import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { homeIndex } from '../api/item-auth.js'
// import apiUrl from '../apiConfig'
// import axios from 'axios'

class ItemsInBayList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: []
    }
  }

  componentDidMount () {
    const { msgAlert, bay } = this.props
    // const selectArray = []
    homeIndex()
      .then(res => {
        const filteredArray = (res.data.item).filter(item => item.bayId === bay)
        console.log(filteredArray)
        return filteredArray
      })
      .then(filteredArray => this.setState({ item: filteredArray }))
      // .then(this.setState(this.setState({ item: filteredArray })))
      // .then(res => console.log(res.data.item))

      // .then(res => this.setState({ item: res.data.item }))
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { item } = this.state

    if (!item) {
      return (
        <p>this.state.item doesnt exist uhhh</p>
      )
    }
    if (item.length === 0) {
      return (
        <p>0 Items to show</p>
      )
    }

    const itemsJsx = item.map(item => (
      <Link to={`/item/${item._id}/update`} key={item._id}>
        <h3 className='roboto-mono thicc-letters'>{item.name}</h3>
        <p>{item.count}</p>
        <p>{item.notes}</p>
        <p>{item.clearTargetDate}</p>
      </Link>
    ))

    return (
      <Fragment>
        <div className='content'>
          {itemsJsx}
        </div>
      </Fragment>
    )
  }
}

export default ItemsInBayList
