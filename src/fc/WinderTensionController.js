import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/TestPoint'
import Input from '../components/Input'
import Costant from '../components/Costant'
import Label from '../components/Label'
import InternalReference from '../components/InternalReference'
import Line from '../components/Line'
import Output from '../components/Output'
import Ramp from '../components/Ramp'
import SwitchNO from '../components/SwitchNO'
import SwitchNC from '../components/SwitchNC'
import Switch from '../components/Switch'
import Inversion from '../components/Inversion'
import Limitator from '../components/Limitator'
import Calculating from '../components/Calculating'
import Sum from '../components/Sum'
import Multiply from '../components/Multiply'
import Divide from '../components/Divide'
import IndexInput from '../components/IndexInput'
import Typography from '@material-ui/core/Typography'

export default class WinderTensionController extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      index: 1
    }
  }

  axiosFunc = () => {
    axios.get('data/ProbeData.html').then(results => {
      this.setState(results.data.ProbeData)
    })
  }

  componentDidMount() {
    this.axiosFunc()
    axios.get('data/ProbeData.html').then(results => {
      this.setState(results.data.ProbeData)
    })
    this.interval = setInterval(this.axiosFunc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    var bool = (bool) => { return bool === "1" ? true : false }

    return (
      <div>
        <Typography variant="title" color="inherit">
          Winder Tension Controller
        </Typography>

        <IndexInput index={Math.round(this.state.index)} />

        <svg viewBox="0 0 960 540" >


          <g>{/*  INIZIO PAGINA 1 / 3                                                                 */}

            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                                                   */}
              <Input
                x={0}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionSetIN"
                varValue={this.state.Real_0}
              />
              <Line x1={24} y1={62} x2={70} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionSetScalingIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={102} x2={76} y2={102} green={true} />
              <Line x1={76} y1={102} x2={76} y2={68} green={true} />
              <Multiply
                x={70}
                y={56}
                green={true}
              />
              <Line x1={82} y1={62} x2={102} y2={62} green={true} />

              <Input
                x={50}
                y={130}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionSetOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={74} y1={134} x2={108} y2={134} green={true} />
              <Line x1={108} y1={134} x2={108} y2={68} green={true} />
              <Sum
                x={102}
                y={56}
                green={true}
              />
              <Line x1={114} y1={62} x2={134} y2={62} green={true} />
              <TestPoint
                x={134}
                y={56}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionScaledTP"
                varValue={this.state.Real_19}
              />
              <Line x1={146} y1={62} x2={166} y2={62} green={true} />
              <Sum
                x={166}
                y={56}
                green={true}
              />
              <Input
                x={114}
                y={130}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={32}
                varName="reTensionIncrementIN"
                varValue={this.state.Real_1}
              />
              <Line x1={138} y1={134} x2={172} y2={134} green={true} />
              <Line x1={172} y1={134} x2={172} y2={110} green={true} />
              <SwitchNO
                x={166}
                y={98}
                green={true}
                textPosOffsetX={-32}
                textPosOffsetY={10}
                rotate={90}
                varName="boTensionIncrementIN"
                varValue={false}
              />
              <Line x1={172} y1={98} x2={172} y2={68} green={true} />
              <Line x1={178} y1={62} x2={228} y2={62} green={true} />
              <Ramp
                x={228}
                y={50}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionGradientIN"
                varValue={this.state.Real_1}
              />
              <Input
                x={190}
                y={130}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={32}
                varName="boTensionSetRampEnableIN"
                varValue={this.state.Real_1}
              />
              <Line x1={214} y1={134} x2={240} y2={134} green={true} />
              <Line x1={240} y1={134} x2={240} y2={74} green={true} />

              <Line x1={252} y1={62} x2={272} y2={62} green={true} />
              <TestPoint
                x={272}
                y={56}
                green={true}
                textPosOffsetX={-5}
                textPosOffsetY={0}
                varName="reTensionRampedTP"
                varValue={this.state.Real_19}
              />
              <Line x1={284} y1={62} x2={304} y2={62} green={true} />
              <Limitator 
                x={304}
                y={56}
                green={true}
              />

              <Input
                x={260}
                y={90}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={32}
                varName="reTensionMinIN"
                varValue={this.state.Real_1}
              />
              <Line x1={284} y1={94} x2={310} y2={94} green={true} />
              <Line x1={310} y1={94} x2={310} y2={68} green={true} />

              <Input
                x={260}
                y={20}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionMaxIN"
                varValue={this.state.Real_1}
              />
              <Line x1={284} y1={24} x2={310} y2={24} green={true} />
              <Line x1={310} y1={24} x2={310} y2={56} green={true} />

              <Line x1={316} y1={62} x2={336} y2={62} green={true} />
              <InternalReference
                x={336}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reTensionTP"
                varValue={this.state.Real_1}
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(400,0)">{/*  INIZIO BLOCCO 2                                                                   */}

              <Input
                x={0}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterIN"
                varValue={this.state.Real_19}
              />
              <Line x1={24} y1={62} x2={44} y2={62} green={true} />
              <Limitator 
                x={44}
                y={56}
                green={true}
              />

              <Input
                x={0}
                y={90}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={32}
                varName="reDiameterMinIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={94} x2={50} y2={94} green={true} />
              <Line x1={50} y1={94} x2={50} y2={68} green={true} />

              <Input
                x={0}
                y={20}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterMaxIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={24} x2={50} y2={24} green={true} />
              <Line x1={50} y1={24} x2={50} y2={56} green={true} />

              <Line x1={56} y1={62} x2={106} y2={62} green={true} />
              <Label x={82} y={52} varValue="[mm]" />
              <Divide 
                x={106}
                y={56}
                green={true}
              />
              <Costant
                x={62}
                y={89}
                green={true}
                varValue={1000}
              />
              <Line x1={86} y1={94} x2={112} y2={94} green={true} />
              <Line x1={112} y1={94} x2={112} y2={68} green={true} />

              <Line x1={118} y1={62} x2={138} y2={62} green={true} />
              <Label x={122} y={52} varValue="[m]" />
              <InternalReference
                x={138}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterTP"
                varValue={this.state.Real_1}
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(600,0)">{/*  INIZIO BLOCCO 3                                                                   */}

              <Input
                x={0}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterTP"
                varValu
                varValue={this.state.Real_19}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={true} />
              <Label x={32} y={52} varValue="[m]" />
              <Divide 
                x={56}
                y={56}
                green={true}
              />
              <Costant
                x={0}
                y={89}
                green={true}
                varValue={2}
              />
              <Line x1={24} y1={94} x2={62} y2={94} green={true} />
              <Line x1={62} y1={94} x2={62} y2={68} green={true} />

              <Line x1={68} y1={62} x2={88} y2={62} green={true} />
              <Label x={72} y={52} varValue="[m]" />
              <InternalReference
                x={88}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reRadiusTP"
                varValue={this.state.Real_1}
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}

            <g transform="translate(750,0)">{/*  INIZIO BLOCCO 4                                       */}

              <Input
                x={0}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterTP"
                varValu
                varValue={this.state.Real_19}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={true} />
              <Label x={32} y={52} varValue="[m]" />
              <Multiply 
                x={56}
                y={56}
                green={true}
              />
              <Costant
                x={0}
                y={89}
                green={true}
                varValue="pi"
              />
              <Line x1={24} y1={94} x2={62} y2={94} green={true} />
              <Line x1={62} y1={94} x2={62} y2={68} green={true} />

              <Line x1={68} y1={62} x2={88} y2={62} green={true} />
              <Label x={72} y={52} varValue="[m]" />
              <InternalReference
                x={88}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reCircumferenceTP"
                varValue={this.state.Real_1}
              />

            </g>{/*  FINE BLOCCO 4                                                                     */}

            <g>{/*  INIZIO BLOCCO 5                                                                    */}

            </g>{/*  FINE BLOCCO 5                                                                     */}

            <g>{/*  INIZIO BLOCCO 6                                                                    */}

            </g>{/*  FINE BLOCCO 6                                                                     */}

          </g>{/*  FINE PAGINA 1 / 3                                                                 */}

        </svg>
      </div>
    )
  }
}