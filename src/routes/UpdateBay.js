import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import BayForm from '../shared/BayForm.js'
import { bayView, bayUpdate } from './../api/bay-auth.js'

class UpdateBay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bay: null,
      updated: false
    }
  }

  async componentDidMount () {
    const { user, match, msgAlert } = this.props
    bayView(match.params.id, user)
      .then(res => this.setState({ bay: res.data.bay }))
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
    const { bay } = this.state
    bayUpdate(match.params.id, bay, user)
      .then(() => this.setState({ updated: true }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your bay has been updated ',
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
      const newBay = { ...currState.bay, ...updatedField }
      return { bay: newBay }
    })
  }

  render () {
    const { bay, updated } = this.state
    if (!bay) {
      return <h2>Make an Bay!</h2>
    } if (updated) {
      return <Fragment><Redirect to={`/bay/${this.props.match.params.id}`}/></Fragment>
    }
    return (
      <Fragment>
        <BayForm
          bay={bay}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(UpdateBay)
