import React, { Component } from 'react'
import './LoadingIndicator.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

class LoadingIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { redius: 64 };
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  updateDimensions() {
    let w = window.innerWidth >= 992 ? 85 : 64
    this.setState({ redius: w })
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <div className={"loadingOuter" + (this.props.isopen ? "" : " loadingOuterHide")}>
        <div className="loadingInner">
          <ReactLoading type={"spinningBubbles"} color={"#ffe200e6"} className="loading" height={this.state.redius} width={this.state.redius} />
          <div className="loadingContent">
            <span className="loadingText">{this.props.loadingAlert}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isopen: state.loadingReducer.isopen,
    loadingAlert: state.loadingReducer.loadingAlert,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingIndicator)