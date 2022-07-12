import React, { Fragment, Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import { bayView } from './../api/bay-auth.js'
// import FutureFeature from './../components/FutureFeature/FutureFeature.js'

class ViewBay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bay: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { match, msgAlert } = this.props
    bayView(match.params.id)
      .then(res => this.setState({ bay: res.data.bay }))
      .catch(error => {
        msgAlert({
          heading: 'Try Again',
          message: 'ERROR: ' + error.message,
          variant: 'danger'
        })
      })
  }

  deleteItem = () => {
    const { user, match, msgAlert } = this.props
    axios({
      url: `${apiUrl}/bay/${match.params.id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'been deleted',
        variant: 'primary'
      }))
      .catch(console.error)
  }

  render () {
    let bayJsx
    const { bay, deleted } = this.state
    if (!bay) {
      bayJsx = 'Loading...'
      return bayJsx
    }
    if (bay) {
      bayJsx = (
        <Fragment>
          <div className='bay-main'>
            <h2 className='roboto-mono'>{`Now Viewing Bay: ${bay.designation}`}</h2>
            <p className='roboto-mono'>{`Bay ID: ${bay._id}`}</p>
          </div>

        </Fragment>
      )
    }

    return (
      <Fragment>
        {deleted ? <Redirect to="/"/> : bayJsx}
        <button className='a-button' onClick={this.deleteItem}>a1</button>
        <button className='a-button'><Link to={`/bay/${bay._id}/update/`}>a2</Link></button>
      </Fragment>
    )
  }
}
export default withRouter(ViewBay)
