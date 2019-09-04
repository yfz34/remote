import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getRoom } from '../../actions/axios'

class PlayerWebSocket extends Component {
  componentWillMount(){
    let patharr=window.location.pathname.split("/")
    let token=patharr[patharr.length-1]
    console.log("token:", token)
    this.props.getRoom(token)
  }

  render() {
    return (
      <></>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // value: state.addReducer.value,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getRoom,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerWebSocket)