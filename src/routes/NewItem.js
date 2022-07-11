import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { itemCreate } from '../api/item-auth.js'
import ItemForm from '../shared/ItemForm.js'

class NewItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        title: '',
        artist: '',
        thumbnail: '',
        priceEther: '',
        collectionId: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { item } = this.state
    itemCreate(item, user)
      .then(res => this.setState({ createdId: res.data.item._id }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your item has been created ',
        variant: 'primary'
      }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        item: { ...state.item, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { item, createdId } = this.state
    if (createdId) {
      return <Redirect to={'/'}/>
    }
    return (
      <Fragment>
        <h1>New Item</h1>
        <ItemForm
          item={item}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default NewItem
