import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { createBay } from '../api/bay-auth.js'
import BayForm from '../shared/BayForm.js'

class CreateBay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bay: {
        designation: '',
        shelfCount: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { bay } = this.state
    createBay(bay, user)
      .then(res => this.setState({ createdId: res.data.bay._id }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your bay has been created ',
        variant: 'primary'
      }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        bay: { ...state.bay, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { bay, createdId } = this.state
    if (createdId) {
      return <Redirect to={'/'}/>
    }
    return (
      <Fragment>
        <h1>New Bay</h1>
        <BayForm
          bay={bay}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default CreateBay
