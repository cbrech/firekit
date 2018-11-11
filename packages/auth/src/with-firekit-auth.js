import React from 'react'
import { FirekitAuthConsumer } from './firekit-auth-context'

export default function withFirekitAuth(Component) {
  function FirekitComponent(props) {
    return (
      <FirekitAuthConsumer>
        {context => { return <Component {...props} {...context} /> }}
      </FirekitAuthConsumer>
    )
  }

  return FirekitComponent
}
