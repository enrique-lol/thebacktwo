/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateBay from './routes/CreateBay'
import NewItem from './routes/NewItem'
import HomeIndex from './routes/HomeIndex'
import ViewItem from './routes/ViewItem'
import UpdateItem from './routes/UpdateItem'
import AllBay from './routes/AllBay'
import ViewBay from './routes/ViewBay'
import UpdateBay from './routes/UpdateBay'
import ItemsInBayList from './routes/ItemsInBayList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
	      <Header user={user} />
	      {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
	      <main className='container'>
	        <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/new-item'
            render={() => (
              <NewItem msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/create-bay'
            render={() => (
              <CreateBay msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/all-items'
            render={() => (
              <HomeIndex msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact path='/'
            render={() => (
              <AllBay msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            exact path='/item/:id'
            render={() => (
              <ViewItem msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            exact path='/bay/:id'
            render={() => (
              <ViewBay msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            user={user}
            exact path='/bay/:id'
            render={() => (
              <ItemsInBayList msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute user={user} exact path='/item/:id/update' render={() => (
            <UpdateItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/bay/:id/update' render={() => (
            <UpdateBay msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
