import React, { Component } from 'react'
import {
    Tab,
    Tabs,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import ShapeList from '../shapes/ShapeList'
import Uploader from '../importer/Uploader'
import MachineSettings from '../machine/MachineSettings'
import Footer from './Footer'
import { chooseInput } from '../app/appSlice'
import ReactGA from 'react-ga'

class InputTabs extends Component {
  handleSelect(key) {
    ReactGA.event({
      category: 'InputTabs',
      action: 'handleSelect: ' + key,
    })
    this.props.dispatch(chooseInput(key))
  }

  render() {
    return (
       <Tabs defaultActiveKey="shape" onSelect={this.handleSelect.bind(this)} id="input-tabs">
         <Tab eventKey="shape" title="Shapes" className="full-page-tab">
           <ShapeList />
         </Tab>

         <Tab eventKey="machine" title="Machine" className="full-page-tab">
           <MachineSettings />
         </Tab>

         <Tab eventKey="code" title="Import" className="full-page-tab">
           <Uploader />
         </Tab>

         <Tab eventKey="about" title="About" className="full-page-tab">
           <Footer />
         </Tab>
       </Tabs>
    )
  }
}

export default connect()(InputTabs)
