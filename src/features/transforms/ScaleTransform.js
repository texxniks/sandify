import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
  Accordion,
  Card,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap'
import InputOption from '../../components/InputOption'
import {
  updateTransform,
  toggleGrow
} from './transformsSlice'
import { getCurrentTransformSelector } from '../shapes/selectors'
import Transform from '../../models/Transform'

const mapStateToProps = (state, ownProps) => {
  const transform = getCurrentTransformSelector(state)

  return {
    transform: transform,
    active: transform.growEnabled,
    options: (new Transform()).getOptions()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps

  return {
    onChange: (attrs) => {
      attrs.id = id
      dispatch(updateTransform(attrs))
    },
    onGrowMethodChange: (value) => {
      dispatch(updateTransform({ growMethod: value, id: id}))
    },
    onGrow: () => {
      dispatch(toggleGrow({id: id}))
    },
  }
}

class ScaleTransform extends Component {
  render() {
    const activeClassName = this.props.active ? 'active' : ''
    const activeKey = this.props.active ? 0 : null

    return (
      <Accordion defaultActiveKey={activeKey} activeKey={activeKey}>
        <Card className={`${activeClassName} overflow-auto`}>
          <Accordion.Toggle as={Card.Header} eventKey={0} onClick={this.props.onGrow}>
            <h3>Scale</h3>
            Grows or shrinks the shape
          </Accordion.Toggle>

          <Accordion.Collapse eventKey={0}>
            <Card.Body>

              <InputOption
                onChange={this.props.onChange}
                options={this.props.options}
                key="growValue"
                optionKey="growValue"
                index={2}
                model={this.props.transform} />

              <Row className="align-items-center pb-2">
                <Col sm={5}>
                  <Form.Label htmlFor="growMethod">
                    Scale by
                  </Form.Label>
                </Col>
                <Col sm={7}>
                  <ToggleButtonGroup id="growMethod" type="radio" name="growMethod" value={this.props.transform.growMethod} onChange={this.props.onGrowMethodChange}>
                    <ToggleButton variant="light" value="constant">constant</ToggleButton>
                    <ToggleButton variant="light" value="function">function</ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Row>

              <InputOption
                onChange={this.props.onChange}
                options={this.props.options}
                key="growMathInput"
                optionKey="growMathInput"
                delayKey="growMath"
                index={1}
                model={this.props.transform} />

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ScaleTransform)
