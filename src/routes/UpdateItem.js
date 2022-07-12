import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import ItemForm from '../shared/ItemForm.js'
import { viewItem, itemUpdate } from './../api/item-auth.js'

class UpdateItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: null,
      updated: false
    }
  }

  async componentDidMount () {
    const { user, match, msgAlert } = this.props
    viewItem(match.params.id, user)
      .then(res => this.setState({ item: res.data.item }))
      .catch(error => {
        msgAlert({
          heading: 'Try Again',
          message: 'ERROR: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { item } = this.state
    itemUpdate(match.params.id, item, user)
      .then(() => this.setState({ updated: true }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your item has been updated ',
        variant: 'primary'
      }))
      .catch(console.error)
  }

  handleChange = (event) => {
    event.persist()
    this.setState(currState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const newItem = { ...currState.item, ...updatedField }
      return { item: newItem }
    })
  }

  render () {
    const { item, updated } = this.state
    if (!item) {
      return <h2>Make an Item!</h2>
    } if (updated) {
      return <Fragment><Redirect to={'/'}/></Fragment>
    }
    return (
      <Fragment>
        <ItemForm
          item={item}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(UpdateItem)
