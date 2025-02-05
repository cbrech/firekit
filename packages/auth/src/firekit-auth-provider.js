import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import User from './user'
import Organization from './organization'

const DEFAULT_STATE = {
  isSignedIn: undefined,
  user: null,
  firebaseApp: null,
  userProfile: null,
  organization: null,
  signinOpen: false,
}

const FirekitAuthContext = React.createContext(DEFAULT_STATE)

export const FirekitAuthConsumer = FirekitAuthContext.Consumer

export default class FirekitAuthProvider extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, DEFAULT_STATE, { firebaseApp: props.firebaseApp || firebase.app() })
    firebase.firestore().settings({ timestampsInSnapshots: true })
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    const { organizationId } = this.props
    const { firebaseApp } = this.state
    try {
      this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged(async (user) => {
        let userProfile
        let organization
        if (user) {
          userProfile = await User.load(user.uid)
          organization = await Organization.load(organizationId)
          if (!userProfile) {
            userProfile = new User({ organizationId }, user.uid)
            await userProfile.save()
          }
        }
        this.setState({
          isSignedIn: !!user, user, userProfile, organization,
        })
      })
    } catch (error) {
      this.setState({ isSignedIn: false, user: null })
    }
  }

  componentWillUnmount() {
    if (typeof this.unregisterAuthObserver === 'function') this.unregisterAuthObserver()
  }

  handleClose() {
    this.setState({ signinOpen: false })
  }

  handleOpen() {
    this.setState({ signinOpen: true })
  }

  render() {
    const { children, SignInComponent } = this.props
    const {
      isSignedIn,
      user,
      firebaseApp,
      userProfile,
      organization,
      signinOpen,
    } = this.state

    return (
      <FirekitAuthContext.Provider
        value={{
          isSignedIn,
          user,
          firebaseApp,
          userProfile,
          organization,
          openSignin: this.handleOpen,
        }}
      >
        <React.Fragment>
          {children}
          { SignInComponent && <SignInComponent open={signinOpen} firebaseApp={firebaseApp} handleClose={this.handleClose} /> }
        </React.Fragment>
      </FirekitAuthContext.Provider>
    )
  }
}

FirekitAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
