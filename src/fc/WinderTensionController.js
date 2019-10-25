import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/TestPoint'
import Absolut from '../components/Absolut'
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
import WTCTorqueCalculating from '../components/WTCTorqueCalculating'
import WTCAxisSpeedCalculating from '../components/WTCAxisSpeedCalculating'
import WTCAxisSpeedRampGradientCalculating from '../components/WTCAxisSpeedRampGradientCalculating'
import PIDPlaceHolder from '../components/PIDPlaceHolder'
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

        <svg viewBox="0 0 960 2000" >

          <g transform="translate(0,0)">{/*  INIZIO PAGINA 1 / 3                                          */}

            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                         */}
              <Input
                x={0}
                y={58}
                green={true}
                varName="reTensionSetIN"
                varValue={this.state.Real_0}
              />
              <Line x1={24} y1={62} x2={70} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
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
                varName="reTensionGradientIN"
                varValue={this.state.Real_1}
              />
              <Input
                x={190}
                y={130}
                green={true}
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
                varName="reTensionTP"
                varValue={this.state.Real_1}
                color="rgba(124,240,10,1)"
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(400,0)">{/*  INIZIO BLOCCO 2                                       */}

              <Input
                x={0}
                y={58}
                green={true}
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
                varName="reDiameterTP"
                varValue={this.state.Real_1}
                color="rgba(252,215,3,1)"
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(600,0)">{/*  INIZIO BLOCCO 3                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reDiameterTP"
                varValue={this.state.Real_1}
                color="rgba(252,215,3,1)"
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
                varName="reRadiusTP"
                varValue={this.state.Real_1}
                color="rgba(3,177,252,1)"
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}

            <g transform="translate(750,0)">{/*  INIZIO BLOCCO 4                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reDiameterTP"
                varValue={this.state.Real_1}
                color="rgba(252,215,3,1)"
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
                varName="reCircumferenceTP"
                varValue={this.state.Real_1}
                color="rgba(15,92,11,1)"
              />

            </g>{/*  FINE BLOCCO 4                                                                     */}

            <g transform="translate(0,180)">{/*  INIZIO BLOCCO 5                                       */}
              
              <Input
                x={0}
                y={58}
                green={true}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterMaxIN"
                varValue={this.state.Real_19}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={true} />
              <Label x={30} y={52} varValue="[mm]" />
              <Divide 
                x={56}
                y={56}
                green={true}
              />
              <Costant
                x={0}
                y={89}
                w={30}
                green={true}
                varValue="2 * 1000"
              />
              <Line x1={30} y1={94} x2={62} y2={94} green={true} />
              <Line x1={62} y1={94} x2={62} y2={68} green={true} />

              <Line x1={68} y1={62} x2={98} y2={62} green={true} />
              <Label x={72} y={52} varValue="[m]" />

              <Costant
                x={56}
                y={20}
                green={true}
                varValue={1}
              />
              <Line x1={80} y1={25} x2={90} y2={25} green={true} />
              <Line x1={90} y1={25} x2={90} y2={56} green={true} />
              <Line x1={90} y1={56} x2={98} y2={56} green={true} />

              <Switch
                x={98}
                y={53}
                green={true}
                rotate={0}
                varValue={bool(this.state.Bool_19)}
                varName="boNormalizedValuesIN"
              />

              <Line x1={110} y1={59} x2={114} y2={59} green={true} />
              <Line x1={114} y1={59} x2={114} y2={62} green={true} />
              <Line x1={114} y1={62} x2={130} y2={62} green={true} />

              <InternalReference
                x={130}
                y={58}
                green={true}
                varName="reNormalizedRadiusMaxTP"
                varValue={this.state.Real_1}
                color="rgba(255,111,0,1)"
              />              
            
            </g>{/*  FINE BLOCCO 5                                                                     */}

            <g transform="translate(250,180)">{/*  INIZIO BLOCCO 6                                     */}
              
              <Input
                x={0}
                y={58}
                green={true}
                varName="reDiameterMinIN"
                varValue={this.state.Real_19}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={true} />
              <Label x={30} y={52} varValue="[mm]" />
              <Multiply 
                x={56}
                y={56}
                green={true}
              />
              <Costant
                x={0}
                y={89}
                w={34}
                green={true}
                varValue="pi * 0,001"
              />
              <Line x1={34} y1={94} x2={62} y2={94} green={true} />
              <Line x1={62} y1={94} x2={62} y2={68} green={true} />

              <Line x1={68} y1={62} x2={98} y2={62} green={true} />
              <Label x={72} y={52} varValue="[m]" />

              <Costant
                x={56}
                y={20}
                green={true}
                varValue={1}
              />
              <Line x1={80} y1={25} x2={90} y2={25} green={true} />
              <Line x1={90} y1={25} x2={90} y2={56} green={true} />
              <Line x1={90} y1={56} x2={98} y2={56} green={true} />

              <Switch
                x={98}
                y={53}
                green={true}
                rotate={0}
                varValue={bool(this.state.Bool_19)}
                varName="boNormalizedValuesIN"
              />

              <Line x1={110} y1={59} x2={114} y2={59} green={true} />
              <Line x1={114} y1={59} x2={114} y2={62} green={true} />
              <Line x1={114} y1={62} x2={130} y2={62} green={true} />

              <InternalReference
                x={130}
                y={58}
                green={true}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_1}
                color="rgba(0,255,255,1)"
              />  

            </g>{/*  FINE BLOCCO 6                                                                     */}

          </g>{/*  FINE PAGINA 1 / 3                                                                      */}

          <g transform="translate(0,320)">{/*  INIZIO PAGINA 2 / 3                                        */}

            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                         */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reTensionTP"
                varValue={this.state.Real_1}
                color="rgba(124,240,10,1)"
              />  
              <Label x={30} y={52} varValue="[N]" />
              <Line x1={24} y1={62} x2={44} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="reFrictionsIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={102} x2={64} y2={102} green={true} />
              <Line x1={64} y1={102} x2={64} y2={80} green={true} />
              <InternalReference
                x={0}
                y={138}
                green={true}
                varName="reRadiusTP"
                varValue={this.state.Real_1}
                color="rgba(3,177,252,1)"
              />
              <Line x1={24} y1={142} x2={84} y2={142} green={true} />
              <Line x1={84} y1={142} x2={84} y2={80} green={true} />
              <InternalReference
                x={0}
                y={178}
                green={true}
                varName="reNormalizedRadiusMaxTP"
                varValue={this.state.Real_1}
                color="rgba(255,111,0,1)"
              />
              <Line x1={24} y1={182} x2={104} y2={182} green={true} />
              <Line x1={104} y1={182} x2={104} y2={80} green={true} />
              <WTCTorqueCalculating
                x={44}
                y={44}
                green={true}
                varValue={this.state.Real_1}
                varName="reCalculatedTorqueTP"
              />
              <Label x={194} y={52} varValue="[Nm]" />
              <Line x1={188} y1={62} x2={218} y2={62} green={true} />
              <Sum
                x={218}
                y={56}
                green={true}
              />
              <Input
                x={188}
                y={134}
                green={true}
                varName="reTorqueCompensationIN"
                varValue={this.state.Real_1}
              />
              <Line x1={212} y1={138} x2={224} y2={138} green={true} />
              <Line x1={224} y1={138} x2={224} y2={68} green={true} />
              <Line x1={230} y1={62} x2={600} y2={62} green={true} />
              <InternalReference
                x={600}
                y={58}
                green={true}
                varName="reTorqueWithStaticFrictionsTP"
                varValue={this.state.Real_1}
                color="rgba(0,0,0,1)"
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(0,250)">{/*  INIZIO BLOCCO 2                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reTensionTP"
                varValue={this.state.Real_1}
                color="rgba(124,240,10,1)"
              />  
              <Label x={30} y={52} varValue="[N]" />
              <Line x1={24} y1={62} x2={44} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="rePIDSetScalingIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={102} x2={50} y2={102} green={true} />
              <Line x1={50} y1={102} x2={50} y2={68} green={true} />
              <Input
                x={0}
                y={138}
                green={true}
                varName="rePIDSetOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={142} x2={82} y2={142} green={true} />
              <Line x1={82} y1={142} x2={82} y2={68} green={true} />
              <Multiply
                x={44}
                y={56}
                green={true}
              />
              <Line x1={56} y1={62} x2={76} y2={62} green={true} />
              <Sum
                x={76}
                y={56}
                green={true}
              />
              <Line x1={88} y1={62} x2={108} y2={62} green={true} />
              <TestPoint
                x={108}
                y={56}
                textPosOffsetY={34}
                textPosOffsetX={-10}
                green={true}
                varName="rePIDSetTP"
                varValue={this.state.Real_1}
              />
              <Line x1={120} y1={62} x2={140} y2={62} green={true} />
              <SwitchNO
                x={140}
                y={56}
                green={true}
                varName={"boLoadCellControlIN"}
                varValue={bool(this.state.Bool_1)}
              />
              <Line x1={152} y1={62} x2={212} y2={62} green={true} />



              <Input
                x={0}
                y={178}
                green={true}
                varName="reFeedbackIN"
                varValue={this.state.Real_1}
              />  
              <Label x={30} y={172} varValue="[N]" />
              <Label x={22} y={186} varValue="[m/min]" />
              <Line x1={24} y1={182} x2={44} y2={182} green={true} />
              <Input
                x={0}
                y={218}
                green={true}
                varName="rePIDActScalingIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={222} x2={50} y2={222} green={true} />
              <Line x1={50} y1={222} x2={50} y2={188} green={true} />
              <Input
                x={0}
                y={258}
                green={true}
                varName="rePIDActOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={262} x2={82} y2={262} green={true} />
              <Line x1={82} y1={262} x2={82} y2={188} green={true} />
              <Multiply
                x={44}
                y={176}
                green={true}
              />
              <Line x1={56} y1={182} x2={76} y2={182} green={true} />
              <Sum
                x={76}
                y={176}
                green={true}
              />
              <Line x1={88} y1={182} x2={108} y2={182} green={true} />
              <TestPoint
                x={108}
                y={176}
                textPosOffsetY={34}
                textPosOffsetX={-10}
                green={true}
                varName="rePIDActTP"
                varValue={this.state.Real_1}
              />
              <Line x1={120} y1={182} x2={182} y2={182} green={true} />
              <Line x1={182} y1={182} x2={182} y2={78} green={true} />
              <Line x1={182} y1={78} x2={212} y2={78} green={true} />



              <PIDPlaceHolder
                x={212}
                y={52}
                green={true}
                referenceID={this.state.Real_1}
                reGpIN={this.state.Real_1}
                rekPIN={this.state.Real_1}
                reTiIN={this.state.Real_1}
                reTdIN={this.state.Real_1}
                reTimeBaseIN={this.state.Real_1}
                boPIDEnableIN={bool(this.state.Bool_1)}
                boIntegralEnableIN={bool(this.state.Bool_1)}
                boResetIntegratorIN={bool(this.state.Bool_1)}
                boAntiWindUpEnableIN={bool(this.state.Bool_1)}
                boDerivativeEnableIN={bool(this.state.Bool_1)}
                boPIDManualControlBumplessIN={bool(this.state.Bool_1)}
                rePIDManualControlBumplessTiIN={this.state.Real_1}
                rePIDOutMaxIN={this.state.Real_1}
                rePIDOutMinIN={this.state.Real_1}
                rePIDOutMaxScalingIN={this.state.Real_1}
                rePIDOutMinScalingIN={this.state.Real_1}
              />
              <Input
                x={368}
                y={-10}
                green={true}
                varName="rePIDOutMaxScalingIN"
                varValue={this.state.Real_1}
              />  
              <Label x={398} y={-16} varValue="[%]" />
              <Line x1={392} y1={-6} x2={418} y2={-6} green={true} />
              <Line x1={418} y1={28} x2={418} y2={-6} green={true} />
              <Input
                x={368}
                y={30}
                green={true}
                varName="rePIDOutMaxIN"
                varValue={this.state.Real_1}
              />
              <Line x1={392} y1={34} x2={412} y2={34} green={true} />
              <Multiply
                x={412}
                y={28}
                green={true}
              />
              <Line x1={418} y1={40} x2={418} y2={52} green={true} />


              <Line x1={418} y1={252} x2={418} y2={278} green={true} />
              <Multiply
                x={412}
                y={278}
                green={true}
              />
              <Input
                x={368}
                y={280}
                green={true}
                varName="rePIDOutMinIN"
                varValue={this.state.Real_1}
              />
              <Line x1={392} y1={284} x2={412} y2={284} green={true} />
              <Input
                x={368}
                y={320}
                green={true}
                varName="rePIDOutMinScalingIN"
                varValue={this.state.Real_1}
              />  
              <Label x={398} y={314} varValue="[%]" />
              <Line x1={392} y1={324} x2={418} y2={324} green={true} />
              <Line x1={418} y1={324} x2={418} y2={290} green={true} />



              <Line x1={472} y1={108} x2={490} y2={108} green={true} />
              <TestPoint
                x={490}
                y={102}
                green={true}
                varName="rePIDOutTP"
                varValue={this.state.Real_1}
              />
              <Line x1={490} y1={108} x2={528} y2={108} green={true} />

              <Input
                x={490}
                y={138}
                green={true}
                varName="rePIDOutScalingIN"
                varValue={this.state.Real_1}
              />
              <Line x1={514} y1={142} x2={534} y2={142} green={true} />
              <Line x1={534} y1={142} x2={534} y2={114} green={true} />
              <Input
                x={490}
                y={178}
                green={true}
                varName="rePIDOutOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={514} y1={182} x2={574} y2={182} green={true} />
              <Line x1={574} y1={182} x2={574} y2={114} green={true} />
              <Multiply
                x={528}
                y={102}
                green={true}
              />
              <Line x1={540} y1={108} x2={568} y2={108} green={true} />
              <Sum
                x={568}
                y={102}
                green={true}
              />
              <Line x1={580} y1={108} x2={600} y2={108} green={true} />
              <InternalReference
                x={600}
                y={104}
                green={true}
                varName="reCorrectionTP"
                varValue={this.state.Real_1}
                color="rgba(173,0,0,1)"
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(0,600)">{/*  INIZIO BLOCCO 3                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reCircumferenceTP"
                varValue={this.state.Real_1}
                color="rgba(15,92,11,1)"
              />  
              <Label x={30} y={52} varValue="[m]" />
              <Line x1={24} y1={62} x2={84} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="reMachineSpeedIN"
                varValue={this.state.Real_1}
              />
              <Label x={30} y={92} varValue="[m/min]" />
              <Line x1={24} y1={102} x2={104} y2={102} green={true} />
              <Line x1={104} y1={102} x2={104} y2={80} green={true} />
              <InternalReference
                x={0}
                y={138}
                green={true}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_1}
                color="rgba(0,255,255,1)"
              />
              <Label x={30} y={132} varValue="[m]" />
              <Line x1={24} y1={142} x2={124} y2={142} green={true} />
              <Line x1={124} y1={142} x2={124} y2={80} green={true} />
              <WTCAxisSpeedCalculating
                x={84}
                y={44}
                green={true}
                varValue={this.state.Real_1}
                varName="reAxisSpeedRawTP"
              />
              <Label x={284} y={52} varValue="[rpm]" />
              <Line x1={278} y1={62} x2={308} y2={62} green={true} />

              <Input
                x={256}
                y={138}
                green={true}
                varName="reAxisSpeedOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={280} y1={142} x2={314} y2={142} green={true} />
              <Line x1={314} y1={142} x2={314} y2={110} green={true} />
              <SwitchNO
                x={308}
                y={98}
                green={true}
                textPosOffsetX={-32}
                textPosOffsetY={10}
                rotate={90}
                varName="boTensionIncrementIN"
                varValue={false}
              />
              <Line x1={314} y1={98} x2={314} y2={68} green={true} />
              <Sum
                x={308}
                y={56}
                green={true}
              />

              <Line x1={320} y1={62} x2={340} y2={62} green={true} />
              <SwitchNC
                x={340}
                y={56}
                green={true}
                varName="boAxisStopIN"
                varValue={false}
              />
              <Line x1={352} y1={62} x2={392} y2={62} green={true} />
              <TestPoint
                x={392}
                y={56}
                green={true}
                varName="reAxisSpeedWithOffsetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={404} y1={62} x2={482} y2={62} green={true} />

              <Ramp
                x={482}
                y={50}
                green={true}
                varName="reAxisSpeedTP"
                varValue={this.state.Real_1}
              />
              <Line x1={486} y1={74} x2={486} y2={94} green={true} />
              <Line x1={486} y1={94} x2={442} y2={94} green={true} />
              <Input
                x={418}
                y={90}
                green={true}
                textPosOffsetX={-10}
                varName="boSpeedRampEnableIN"
                varValue={this.state.Real_1}
              />
              <Line x1={494} y1={74} x2={494} y2={134} green={true} />
              <Line x1={442} y1={134} x2={494} y2={134} green={true} />
              <Input
                x={418}
                y={130}
                green={true}
                textPosOffsetX={-10}
                varName="reRampTimeToReachMaxSpeedIN"
                varValue={this.state.Real_1}
              />
              <Line x1={502} y1={74} x2={502} y2={204} green={true} />
              <Line x1={442} y1={204} x2={502} y2={204} green={true} />

              <WTCAxisSpeedRampGradientCalculating
                x={248}
                y={186}
                green={true}
                varName="Ramp Gradient"
                varValue={this.state.Real_1}
              />
              <Line x1={204} y1={204} x2={248} y2={204} green={true} />
              <InternalReference
                x={180}
                y={200}
                green={true}
                varName="reCircumferenceTP"
                varValue={this.state.Real_1}
                color="rgba(15,92,11,1)"
              />
              <Line x1={316} y1={222} x2={316} y2={244} green={true} />
              <Line x1={204} y1={244} x2={316} y2={244} green={true} />
              <Input
                x={180}
                y={240}
                green={true}
                varName="reMachineSpeedMaxIN"
                varValue={this.state.Real_1}
              />
              <Line x1={356} y1={222} x2={356} y2={284} green={true} />
              <Line x1={204} y1={284} x2={356} y2={284} green={true} />
              <InternalReference
                x={180}
                y={280}
                green={true}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_1}
                color="rgba(0,255,255,1)"
              />
              <Line x1={506} y1={62} x2={600} y2={62} green={true} />
              <InternalReference
                x={600}
                y={58}
                green={true}
                varName="reAxisSpeedTP"
                varValue={this.state.Real_1}
                color="rgba(105,191,52,1)"
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}
          
          </g>{/*  FINE PAGINA 2 / 3                                                                      */}

          <g transform="translate(0,1250)">{/*  INIZIO PAGINA 3 / 3                                        */}
            
            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                         */}
              <g transform="translate(0,0)">
                <InternalReference
                  x={0}
                  y={58}
                  green={true}
                  varName="reTorqueWithStaticFrictionsTP"
                  varValue={this.state.Real_1}
                  color="rgba(0,0,0,1)"
                />  
                <Label x={40} y={52} varValue="[Nm]" />
                <Line x1={24} y1={62} x2={200} y2={62} green={true} />
                <Sum
                  x={200}
                  y={56}
                  green={true}
                />
                <Line x1={212} y1={62} x2={232} y2={62} green={true} />
                <TestPoint
                  x={232}
                  y={56}
                  green={true}
                  varName="reCorrectedTorqueTP"
                  varValue={this.state.Real_19}
                />
                <Line x1={244} y1={62} x2={304} y2={62} green={true} />
                <Limitator 
                  x={304}
                  y={56}
                  green={true}
                />

                <Input
                  x={260}
                  y={90}
                  green={true}
                  textPosOffsetY={32}
                  varName="reTorqueMinIN"
                  varValue={this.state.Real_1}
                />
                <Line x1={284} y1={94} x2={310} y2={94} green={true} />
                <Line x1={310} y1={94} x2={310} y2={68} green={true} />

                <Input
                  x={260}
                  y={20}
                  green={true}
                  varName="reTorqueMaxIN"
                  varValue={this.state.Real_1}
                />
                <Line x1={284} y1={24} x2={310} y2={24} green={true} />
                <Line x1={310} y1={24} x2={310} y2={56} green={true} />

                <Line x1={316} y1={62} x2={336} y2={62} green={true} />
                <TestPoint
                  x={336}
                  y={56}
                  green={true}
                  varName="reTorqueTP"
                  varValue={this.state.Real_19}
                />


                <Line x1={348} y1={62} x2={382} y2={62} green={true} />
                <Inversion
                  x={382}
                  y={56}
                  green={true}
                />
                <Line x1={394} y1={62} x2={428} y2={62} green={true} />


                <Line x1={368} y1={62} x2={368} y2={48} green={true} />
                <Line x1={368} y1={48} x2={408} y2={48} green={true} />
                <Line x1={408} y1={48} x2={408} y2={56} green={true} />
                <Line x1={408} y1={56} x2={428} y2={56} green={true} />
                <Switch
                  x={428}
                  y={53}
                  green={true}
                  rotate={0}
                  varValue={bool(this.state.Bool_1)}
                  varName="boTorqueInversionIN"
                />
                <Line x1={440} y1={59} x2={580} y2={59} green={true} />
                <Input
                  x={520}
                  y={29}
                  green={true}
                  varName="reTorqueLimitOverrideIN"
                  varValue={this.state.Real_1}
                />
                <Line x1={560} y1={53} x2={580} y2={53} green={true} />
                <Line x1={544} y1={33} x2={560} y2={33} green={true} />
                <Line x1={560} y1={33} x2={560} y2={53} green={true} />

                <Switch
                  x={580}
                  y={50}
                  green={true}
                  rotate={0}
                  varValue={bool(this.state.Bool_1)}
                  varName="boLoadCellControlIN"
                />
                <Line x1={592} y1={56} x2={636} y2={56} green={true} />
                <Absolut
                  x={636}
                  y={50}
                  green={true}
                />
                <Line x1={648} y1={56} x2={700} y2={56} green={true} />
                <Output
                  x={700}
                  y={52}
                  green={true}
                  varName="reTorqueLimitOUT"
                  varValue={this.state.Real_1}
                />



                <Line x1={520} y1={59} x2={520} y2={133} green={true} />
                <Line x1={520} y1={133} x2={580} y2={133} green={true} />

                <Costant
                  x={520}
                  y={154}
                  green={true}
                  varValue={0}
                />
                <Line x1={560} y1={139} x2={580} y2={139} green={true} />
                <Line x1={544} y1={159} x2={560} y2={159} green={true} />
                <Line x1={560} y1={159} x2={560} y2={139} green={true} />

                <Switch
                  x={580}
                  y={130}
                  green={true}
                  rotate={0}
                  varValue={bool(this.state.Bool_1)}
                  varName="boLoadCellControlIN"
                />
                <Line x1={592} y1={136} x2={700} y2={136} green={true} />
                <Output
                  x={700}
                  y={132}
                  green={true}
                  varName="reTorqueForwardOUT"
                  varValue={this.state.Real_1}
                />


              </g>





              <g transform="translate(0,300)">

                <InternalReference
                  x={0}
                  y={58}
                  green={true}
                  varName="reAxisSpeedTP"
                  varValue={this.state.Real_1}
                  color="rgba(105,191,52,1)"
                />  
                <Label x={40} y={52} varValue="[rpm]" />
                <Line x1={24} y1={62} x2={200} y2={62} green={true} />
                <Sum
                  x={200}
                  y={56}
                  green={true}
                />
                <Line x1={212} y1={62} x2={232} y2={62} green={true} />
                <TestPoint
                  x={232}
                  y={56}
                  green={true}
                  varName="reCorrectedSpeedTP"
                  varValue={this.state.Real_19}
                />
                <Line x1={244} y1={62} x2={304} y2={62} green={true} />
                <Limitator 
                  x={304}
                  y={56}
                  green={true}
                />

                <Input
                  x={260}
                  y={90}
                  green={true}
                  textPosOffsetY={32}
                  varName="reAxisSpeedMinIN"
                  varValue={this.state.Real_1}
                />
                <Line x1={284} y1={94} x2={310} y2={94} green={true} />
                <Line x1={310} y1={94} x2={310} y2={68} green={true} />

                <Input
                  x={260}
                  y={20}
                  green={true}
                  varName="reAxisSpeedMaxIN"
                  varValue={this.state.Real_1}
                />
                <Line x1={284} y1={24} x2={310} y2={24} green={true} />
                <Line x1={310} y1={24} x2={310} y2={56} green={true} />

                <Line x1={316} y1={62} x2={336} y2={62} green={true} />
                <TestPoint
                  x={336}
                  y={56}
                  green={true}
                  varName="reSpeedTP"
                  varValue={this.state.Real_19}
                />


                <Line x1={348} y1={62} x2={382} y2={62} green={true} />
                <Inversion
                  x={382}
                  y={56}
                  green={true}
                />
                <Line x1={394} y1={62} x2={428} y2={62} green={true} />


                <Line x1={368} y1={62} x2={368} y2={48} green={true} />
                <Line x1={368} y1={48} x2={408} y2={48} green={true} />
                <Line x1={408} y1={48} x2={408} y2={56} green={true} />
                <Line x1={408} y1={56} x2={428} y2={56} green={true} />
                <Switch
                  x={428}
                  y={53}
                  green={true}
                  rotate={0}
                  varValue={bool(this.state.Bool_1)}
                  varName="boSpeedInversionIN"
                />
                <Line x1={440} y1={59} x2={700} y2={59} green={true} />
                <Output
                  x={700}
                  y={55}
                  green={true}
                  varName="reSpeedOUT"
                  varValue={this.state.Real_1}
                />

              </g>

            </g>{/*  FINE BLOCCO 1                                                                     */}

          </g>{/*  FINE PAGINA 3 / 3                                                                      */}
        </svg>
      </div>
    )
  }
}