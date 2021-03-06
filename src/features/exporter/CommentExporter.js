import { getShape } from '../shapes/selectors'
import Machine from '../../models/Machine'
import Transform from '../../models/Transform'
import Exporter from './Exporter'

export default class CommentExporter extends Exporter {
  constructor(props) {
    super(props)
    this.indentLevel = 0
    this.startComments()
    this.commentChar = ''
  }

  export() {
    const state = this.props
    const machine = new Machine()
    const transform = new Transform()
    let instance = state.machine

    this.line('Created by Sandify')
    this.line('https://sandify.org')
    this.keyValueLine('Version', state.app.sandifyVersion)
    this.line()

    this.keyValueLine('Machine type', state.machine.rectangular ? 'Rectangular' : 'Polar')
    this.indent()
    this.optionLines(machine, instance, ['minX', 'maxX', 'minY', 'maxY'], state.machine.rectangular)
    this.optionLines(machine, instance,  ['maxRadius', 'polarStartPoint', 'polarEndPoint'], !state.machine.rectangular)
    this.dedent()

    this.keyValueLine('Content type', state.app.input)
    this.indent()

    switch (state.app.input) {
      case 'shape': // shapes
        instance = state.shapes.byId[state.shapes.currentId]
        const shape = getShape(instance)
        const options = shape.getOptions()

        this.keyValueLine('Selected Shape', shape.name)
        this.optionLines(shape, instance, Object.keys(options))
        this.optionLines(transform, state.transform, ['startingSize', 'offsetX', 'offsetY'])
        this.optionLines(transform, state.transform, ['numLoops', 'transformMethod', 'spinEnabled'], state.transform.repeatEnabled)
        this.indent()
        this.optionLines(transform, state.transform, ['spinValue', 'spinMethod'], state.transform.repeatEnabled && state.transform.spinEnabled)
        this.indent()
        this.optionLine(transform, state.transform, 'spinMath', state.transform.repeatEnabled && state.transform.spinEnabled && state.transform.spinMethod === 'function')
        this.optionLine(transform, state.transform, 'spinSwitchbacks', state.transform.repeatEnabled && state.transform.spinEnabled && state.transform.spinMethod === 'constant')
        this.dedent()
        this.dedent()
        this.optionLine(transform, state.transform, 'growEnabled', state.transform.repeatEnabled)
        this.indent()
        this.optionLine(transform, state.transform, 'growValue', state.transform.repeatEnabled && state.transform.growEnabled)
        this.optionLine(transform, state.transform, 'growMethod', state.transform.repeatEnabled && state.transform.growEnabled)
        this.indent()
        this.optionLine(transform, state.transform, 'growMath', state.transform.repeatEnabled && state.transform.growEnabled && state.transform.growMethod === 'function')
        this.dedent()
        this.dedent()
        this.optionLine(transform, state.transform, 'trackEnabled', state.transform.repeatEnabled)
        this.indent()
        this.optionLines(transform, state.transform, ['trackValue', 'trackLength', 'trackNumLoops'], state.transform.repeatEnabled && state.transform.trackEnabled)
        this.optionLine(transform, state.transform, 'trackGrowEnabled', state.transform.repeatEnabled && state.transform.trackEnabled)
        this.indent()
        this.optionLine(transform, state.transform, 'trackGrow', state.transform.repeatEnabled && state.transform.trackGrowEnabled)
        this.dedent()
        this.dedent()
        break

      case 'code':
        this.keyValueLine('Input file', state.importer.fileName)
        this.keyValueLine('Zoom', state.importer.zoom)
        this.keyValueLine('Aspect ratio', state.importer.aspectRatio)
        break

      default:
        break
    }

    this.dedent()
    this.keyValueLine('Path reversed', state.exporter.reverse)
    return this.lines
  }
}
