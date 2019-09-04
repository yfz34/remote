import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from './nav/nav'
import Songlist from './songlist/songlist'
import Orderlist from './orderlist/orderlist'
import Footer from './footer/footer'
import WS from './websocket/ws'

function Combination(props){
    console.log(props.match)
    return (
        <div>
            <Nav />
            { (props.selectValue===0) ? <Songlist /> : null }
            { (props.selectValue===1) ? <Orderlist /> : null }
            <div style={{ height:56 }}></div>
            <Footer />
            <WS />
        </div>
    );
} 


const mapStateToProps = (state) => {
    return {
        selectValue: state.botPanelReducer.selectitem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Combination)