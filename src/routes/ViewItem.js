import React, { Fragment, Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import { viewItem } from './../api/item-auth.js'
// import FutureFeature from './../components/FutureFeature/FutureFeature.js'
class ViewItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { match, msgAlert } = this.props
    viewItem(match.params.id)
      .then(res => this.setState({ item: res.data.item }))
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
    console.log(this.props)
    axios({
      url: `${apiUrl}/item/${match.params.id}`,
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
    let itemJsx
    const { item, deleted } = this.state
    if (!item) {
      itemJsx = 'Loading...'
      return itemJsx
    }
    if (item) {
      itemJsx = (
        <Fragment>
          <div className='item-main'>
            <h2 className='roboto-mono'>{item.title}</h2>
            <img className='item-image' src={item.thumbnail}/>
            <p className='art-text'>By {item.authorName} on {item.publishDate} -- {item.intro}</p>
          </div>

        </Fragment>
      )
    }

    const comments = (
      <Fragment>
        <div>
          <div className='divider comm-comm'>
            <h2 className='community-comments-text raleway'>Community Comments</h2>
          </div>
          <button className='a-button' onClick={this.deleteItem}>a1</button>
          <button className='a-button'><Link to={`/item/${item._id}/update`}>a2</Link></button>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        {deleted ? <Redirect to="/"/> : itemJsx}
        {comments}
      </Fragment>
    )
  }
}
export default withRouter(ViewItem)
