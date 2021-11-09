import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/TestPoint'
import Absolut from '../components/Absolut'
import Input from '../components/Input'
import Costant from '../components/Constant'
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
import WTCTorqueCorrectionCalculating from '../components/WTCTorqueCorrectionCalculating'
import WTCSpeedCorrectionCalculating from '../components/WTCSpeedCorrectionCalculating'
import Interpolator from '../components/Interpolator'
import PIDPlaceHolder from '../components/PIDPlaceHolder'
import Sum from '../components/Sum'
import Multiply from '../components/Multiply'
import Divide from '../components/Divide'
import IndexInput from '../components/IndexInput'
import Typography from '@mui/material/Typography'

export default class WinderTensionController extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      index: 1
    }
  }
  axiosFunc = () => {
    const url = 'http://172.17.5.31/awp/React/ProbeData.html'
    axios.get(
      url, 
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        crossdomain: true
      }
    ).then(results => {
      this.setState(results.data.ProbeData)
    })
  }

  componentDidMount() {
    this.axiosFunc()
    const url = 'http://172.17.5.31/awp/React/ProbeData.html'
    axios.get(
      url, 
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
        },
        crossdomain: true
      }
    ).then(results => {
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

        <svg viewBox="0 0 960 2200" >

          <g transform="translate(0,0)">{/*  INIZIO PAGINA 1 / 3                                          */}

            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                         */}
              <Input
                x={0}
                y={58}
                green={true}
                varName="reTensionSetIN"
                varValue={this.state.Real_1}
              />
              <Line x1={24} y1={62} x2={70} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="reTensionSetScalingIN"
                varValue={this.state.Real_23}
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
                varValue={this.state.Real_24}
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
                varValue={this.state.Real_61}
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
                green={bool(this.state.Bool_12)}
                textPosOffsetY={32}
                varName="reTensionIncrementIN"
                varValue={this.state.Real_25}
              />
              <Line x1={138} y1={134} x2={172} y2={134} green={bool(this.state.Bool_12)} />
              <Line x1={172} y1={134} x2={172} y2={110} green={bool(this.state.Bool_12)} />
              <SwitchNO
                x={166}
                y={98}
                green={bool(this.state.Bool_12)}
                textPosOffsetX={-32}
                textPosOffsetY={10}
                rotate={90}
                varName="boTensionIncrementIN"
                varValue={bool(this.state.Bool_12)}
              />
              <Line x1={172} y1={98} x2={172} y2={68} green={bool(this.state.Bool_12)} />
              <Line x1={178} y1={62} x2={228} y2={62} green={true} />
              <Ramp
                x={228}
                y={50}
                green={bool(this.state.Bool_13)}
                varName="reTensionGradientIN"
                varValue={this.state.Real_14}
              />
              <Input
                logic
                x={190}
                y={130}
                green={bool(this.state.Bool_13)}
                textPosOffsetX={0}
                textPosOffsetY={32}
                varName="boTensionSetRampEnableIN"
                varValue={bool(this.state.Bool_13)}
              />
              <Line x1={214} y1={134} x2={240} y2={134} green={bool(this.state.Bool_13)} />
              <Line x1={240} y1={134} x2={240} y2={74} green={bool(this.state.Bool_13)} />

              <Line x1={252} y1={62} x2={272} y2={62} green={true} />
              <TestPoint
                x={272}
                y={56}
                green={true}
                textPosOffsetX={-5}
                varName="reTensionRampedTP"
                varValue={this.state.Real_60}
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
                varValue={this.state.Real_3}
              />
              <Line x1={284} y1={94} x2={310} y2={94} green={true} />
              <Line x1={310} y1={94} x2={310} y2={68} green={true} />

              <Input
                x={260}
                y={20}
                green={true}
                varName="reTensionMaxIN"
                varValue={this.state.Real_4}
              />
              <Line x1={284} y1={24} x2={310} y2={24} green={true} />
              <Line x1={310} y1={24} x2={310} y2={56} green={true} />

              <Line x1={316} y1={62} x2={336} y2={62} green={true} />
              <InternalReference
                x={336}
                y={58}
                green={true}
                varName="reTensionTP"
                varValue={this.state.Real_62}
                color="rgba(124,240,10,1)"
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(400,0)">{/*  INIZIO BLOCCO 2                                       */}

              <Input
                x={0}
                y={58}
                green={true}
                varName="reDiameterIN"
                varValue={this.state.Real_5}
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
                varValue={this.state.Real_6}
              />
              <Line x1={24} y1={94} x2={50} y2={94} green={true} />
              <Line x1={50} y1={94} x2={50} y2={68} green={true} />

              <Input
                x={0}
                y={20}
                green={true}
                varName="reDiameterMaxIN"
                varValue={this.state.Real_7}
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
                varValue={this.state.Real_66}
                color="rgba(252,215,3,1)"
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(600,0)">{/*  INIZIO BLOCCO 3                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reDiameterTP"
                varValue={this.state.Real_66}
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
                varValue={this.state.Real_57}
                color="rgba(3,177,252,1)"
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}

            <g transform="translate(750,0)">{/*  INIZIO BLOCCO 4                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reDiameterTP"
                varValue={this.state.Real_66}
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
                varValue={this.state.Real_48}
                color="rgba(15,92,11,1)"
              />

            </g>{/*  FINE BLOCCO 4                                                                     */}

            <g transform="translate(0,180)">{/*  INIZIO BLOCCO 5                                       */}
              
              <Input
                x={0}
                y={58}
                green={bool(this.state.Bool_5)}
                textPosOffsetX={0}
                textPosOffsetY={0}
                varName="reDiameterMaxIN"
                varValue={this.state.Real_7}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={bool(this.state.Bool_5)} />
              <Label x={30} y={52} varValue="[mm]" />
              <Divide 
                x={56}
                y={56}
                green={bool(this.state.Bool_5)}
              />
              <Costant
                x={0}
                y={89}
                w={30}
                green={bool(this.state.Bool_5)}
                varValue="2 * 1000"
              />
              <Line x1={30} y1={94} x2={62} y2={94} green={bool(this.state.Bool_5)} />
              <Line x1={62} y1={94} x2={62} y2={68} green={bool(this.state.Bool_5)} />

              <Line x1={68} y1={62} x2={98} y2={62} green={bool(this.state.Bool_5)} />
              <Label x={72} y={52} varValue="[m]" />

              <Costant
                x={56}
                y={20}
                green={!bool(this.state.Bool_5)}
                varValue={1}
              />
              <Line x1={80} y1={25} x2={90} y2={25} green={!bool(this.state.Bool_5)} />
              <Line x1={90} y1={25} x2={90} y2={56} green={!bool(this.state.Bool_5)} />
              <Line x1={90} y1={56} x2={98} y2={56} green={!bool(this.state.Bool_5)} />

              <Switch
                x={98}
                y={53}
                green={true}
                rotate={0}
                varName="boNormalizedValuesIN"
                varValue={bool(this.state.Bool_5)}
              />

              <Line x1={110} y1={59} x2={114} y2={59} green={true} />
              <Line x1={114} y1={59} x2={114} y2={62} green={true} />
              <Line x1={114} y1={62} x2={130} y2={62} green={true} />

              <InternalReference
                x={130}
                y={58}
                green={true}
                varName="reNormalizedRadiusMaxTP"
                varValue={this.state.Real_53}
                color="rgba(255,111,0,1)"
              />              
            
            </g>{/*  FINE BLOCCO 5                                                                     */}

            <g transform="translate(250,180)">{/*  INIZIO BLOCCO 6                                     */}
              
              <Input
                x={0}
                y={58}
                green={bool(this.state.Bool_5)}
                varName="reDiameterMinIN"
                varValue={this.state.Real_6}
              />
              <Line x1={24} y1={62} x2={56} y2={62} green={bool(this.state.Bool_5)} />
              <Label x={30} y={52} varValue="[mm]" />
              <Multiply 
                x={56}
                y={56}
                green={bool(this.state.Bool_5)}
              />
              <Costant
                x={0}
                y={89}
                w={34}
                green={bool(this.state.Bool_5)}
                varValue="pi * 0,001"
              />
              <Line x1={34} y1={94} x2={62} y2={94} green={bool(this.state.Bool_5)} />
              <Line x1={62} y1={94} x2={62} y2={68} green={bool(this.state.Bool_5)} />

              <Line x1={68} y1={62} x2={98} y2={62} green={bool(this.state.Bool_5)} />
              <Label x={72} y={52} varValue="[m]" />

              <Costant
                x={56}
                y={20}
                green={!bool(this.state.Bool_5)}
                varValue={1}
              />
              <Line x1={80} y1={25} x2={90} y2={25} green={!bool(this.state.Bool_5)} />
              <Line x1={90} y1={25} x2={90} y2={56} green={!bool(this.state.Bool_5)} />
              <Line x1={90} y1={56} x2={98} y2={56} green={!bool(this.state.Bool_5)} />

              <Switch
                x={98}
                y={53}
                green={true}
                rotate={0}
                varName="boNormalizedValuesIN"
                varValue={bool(this.state.Bool_5)}
              />

              <Line x1={110} y1={59} x2={114} y2={59} green={true} />
              <Line x1={114} y1={59} x2={114} y2={62} green={true} />
              <Line x1={114} y1={62} x2={130} y2={62} green={true} />

              <InternalReference
                x={130}
                y={58}
                green={true}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_52}
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
                varValue={this.state.Real_62}
                color="rgba(124,240,10,1)"
              />  
              <Label x={30} y={52} varValue="[N]" />
              <Line x1={24} y1={62} x2={44} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="reFrictionsIN"
                varValue={this.state.Real_26}
              />
              <Line x1={24} y1={102} x2={64} y2={102} green={true} />
              <Line x1={64} y1={102} x2={64} y2={80} green={true} />
              <InternalReference
                x={0}
                y={138}
                green={true}
                varName="reRadiusTP"
                varValue={this.state.Real_57}
                color="rgba(3,177,252,1)"
              />
              <Line x1={24} y1={142} x2={84} y2={142} green={true} />
              <Line x1={84} y1={142} x2={84} y2={80} green={true} />
              <InternalReference
                x={0}
                y={178}
                green={true}
                varName="reNormalizedRadiusMaxTP"
                varValue={this.state.Real_53}
                color="rgba(255,111,0,1)"
              />
              <Line x1={24} y1={182} x2={104} y2={182} green={true} />
              <Line x1={104} y1={182} x2={104} y2={80} green={true} />
              <WTCTorqueCalculating
                x={44}
                y={44}
                green={true}
                varName="reCalculatedTorqueTP"
                varValue={this.state.Real_47}
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
                varValue={this.state.Real_15}
              />
              <Line x1={212} y1={138} x2={224} y2={138} green={true} />
              <Line x1={224} y1={138} x2={224} y2={68} green={true} />
              <Line x1={230} y1={62} x2={600} y2={62} green={true} />
              <InternalReference
                x={600}
                y={58}
                green={true}
                varName="reTorqueWithStaticFrictionsTP"
                varValue={this.state.Real_65}
                color="rgba(0,0,0,1)"
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(0,250)">{/*  INIZIO BLOCCO 2                                       */}

              <InternalReference
                x={0}
                y={58}
                green={bool(this.state.Bool_4)}
                varName="reTensionTP"
                varValue={this.state.Real_62}
                color="rgba(124,240,10,1)"
              />  
              <Label x={30} y={52} varValue="[N]" />
              <Line x1={24} y1={62} x2={44} y2={62} green={bool(this.state.Bool_4)} />
              <Input
                x={0}
                y={98}
                green={bool(this.state.Bool_4)}
                varName="rePIDSetScalingIN"
                varValue={this.state.Real_27}
              />
              <Line x1={24} y1={102} x2={50} y2={102} green={bool(this.state.Bool_4)} />
              <Line x1={50} y1={102} x2={50} y2={68} green={bool(this.state.Bool_4)} />
              <Input
                x={0}
                y={138}
                green={bool(this.state.Bool_4)}
                varName="rePIDSetOffsetIN"
                varValue={this.state.Real_28}
              />
              <Line x1={24} y1={142} x2={82} y2={142} green={bool(this.state.Bool_4)} />
              <Line x1={82} y1={142} x2={82} y2={68} green={bool(this.state.Bool_4)} />
              <Multiply
                x={44}
                y={56}
                green={bool(this.state.Bool_4)}
              />
              <Line x1={56} y1={62} x2={76} y2={62} green={bool(this.state.Bool_4)} />
              <Sum
                x={76}
                y={56}
                green={bool(this.state.Bool_4)}
              />
              <Line x1={88} y1={62} x2={108} y2={62} green={bool(this.state.Bool_4)} />
              <SwitchNO
                x={108}
                y={56}
                textPosOffsetY={34}
                textPosOffsetX={-10}
                green={bool(this.state.Bool_4)}
                varName={"boLoadCellControlIN"}
                varValue={bool(this.state.Bool_4)}
              />
              <Line x1={120} y1={62} x2={140} y2={62} green={bool(this.state.Bool_4)} />
              <TestPoint
                x={140}
                y={56}
                green={bool(this.state.Bool_4)}
                varName="rePIDSetTP"
                varValue={this.state.Real_56}
              />
              <Line x1={152} y1={62} x2={212} y2={62} green={bool(this.state.Bool_4)} />



              <Input
                x={0}
                y={178}
                green={true}
                varName="reFeedbackIN"
                varValue={this.state.Real_2}
              />  
              <Label x={30} y={172} varValue="[N]" />
              <Label x={22} y={186} varValue="[m/min]" />
              <Line x1={24} y1={182} x2={44} y2={182} green={true} />
              <Input
                x={0}
                y={218}
                green={true}
                varName="rePIDActScalingIN"
                varValue={this.state.Real_29}
              />
              <Line x1={24} y1={222} x2={50} y2={222} green={true} />
              <Line x1={50} y1={222} x2={50} y2={188} green={true} />
              <Input
                x={0}
                y={258}
                green={true}
                varName="rePIDActOffsetIN"
                varValue={this.state.Real_30}
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
                varValue={this.state.Real_54}
              />
              <Line x1={120} y1={182} x2={182} y2={182} green={true} />
              <Line x1={182} y1={182} x2={182} y2={78} green={true} />
              <Line x1={182} y1={78} x2={212} y2={78} green={true} />



              <PIDPlaceHolder
                x={212}
                y={52}
                green={bool(this.state.Bool_7)}
                referenceID={this.state.Int_9}
                reGpIN={this.state.Real_17}
                rekPIN={this.state.Real_18}
                reTiIN={this.state.Real_19}
                reTdIN={this.state.Real_20}
                reTimeBaseIN={this.state.Real_0}
                boPIDEnableIN={bool(this.state.Bool_7)}
                boIntegralEnableIN={bool(this.state.Bool_3)}
                boResetIntegratorIN={bool(this.state.Bool_9)}
                boPIDAntiWindUpEnableIN={bool(this.state.Bool_6)}
                boDerivativeEnableIN={bool(this.state.Bool_2)}
                boPIDHoldIN={bool(this.state.Bool_8)}
                boPIDManualControlBumplessIN={bool(this.state.Bool_15)}
                rePIDManualControlBumplessTiIN={this.state.Real_67}
                rePIDOutMaxIN={this.state.Real_22}
                rePIDOutMinIN={this.state.Real_21}
                rePIDOutMaxScalingIN={this.state.Real_36}
                rePIDOutMinScalingIN={this.state.Real_35}
              />
              <Input
                x={368}
                y={-10}
                green={bool(this.state.Bool_7)}
                varName="rePIDOutMaxScalingIN"
                varValue={this.state.Real_36}
              />  
              <Label x={398} y={-16} varValue="[%]" />
              <Line x1={392} y1={-6} x2={418} y2={-6} green={bool(this.state.Bool_7)} />
              <Line x1={418} y1={28} x2={418} y2={-6} green={bool(this.state.Bool_7)} />
              <Input
                x={368}
                y={30}
                green={bool(this.state.Bool_7)}
                varName="rePIDOutMaxIN"
                varValue={this.state.Real_22}
              />
              <Line x1={392} y1={34} x2={412} y2={34} green={bool(this.state.Bool_7)} />
              <Multiply
                x={412}
                y={28}
                green={bool(this.state.Bool_7)}
              />
              <Line x1={418} y1={40} x2={418} y2={52} green={bool(this.state.Bool_7)} />


              <Line x1={418} y1={252} x2={418} y2={278} green={bool(this.state.Bool_7)} />
              <Multiply
                x={412}
                y={278}
                green={bool(this.state.Bool_7)}
              />
              <Input
                x={368}
                y={280}
                green={bool(this.state.Bool_7)}
                varName="rePIDOutMinIN"
                varValue={this.state.Real_21}
              />
              <Line x1={392} y1={284} x2={412} y2={284} green={bool(this.state.Bool_7)} />
              <Input
                x={368}
                y={320}
                green={bool(this.state.Bool_7)}
                varName="rePIDOutMinScalingIN"
                varValue={this.state.Real_35}
              />  
              <Label x={398} y={314} varValue="[%]" />
              <Line x1={392} y1={324} x2={418} y2={324} green={bool(this.state.Bool_7)} />
              <Line x1={418} y1={324} x2={418} y2={290} green={bool(this.state.Bool_7)} />



              <Line x1={472} y1={108} x2={490} y2={108} green={bool(this.state.Bool_7)} />
              <TestPoint
                x={490}
                y={102}
                green={true}
                varName="rePIDOutTP"
                varValue={this.state.Real_55}
              />
              <Line x1={502} y1={108} x2={528} y2={108} green={true} />

              <Input
                x={490}
                y={138}
                green={true}
                varName="rePIDOutScalingIN"
                varValue={this.state.Real_31}
              />
              <Line x1={514} y1={142} x2={534} y2={142} green={true} />
              <Line x1={534} y1={142} x2={534} y2={114} green={true} />
              <Input
                x={490}
                y={178}
                green={true}
                varName="rePIDOutOffsetIN"
                varValue={this.state.Real_32}
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
                varValue={this.state.Real_51}
                color="rgba(173,0,0,1)"
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(0,600)">{/*  INIZIO BLOCCO 3                                       */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reCircumferenceTP"
                varValue={this.state.Real_48}
                color="rgba(15,92,11,1)"
              />  
              <Label x={30} y={52} varValue="[m]" />
              <Line x1={24} y1={62} x2={84} y2={62} green={true} />
              <Input
                x={0}
                y={98}
                green={true}
                varName="reMachineSpeedIN"
                varValue={this.state.Real_8}
              />
              <Label x={30} y={92} varValue="[m/min]" />
              <Line x1={24} y1={102} x2={104} y2={102} green={true} />
              <Line x1={104} y1={102} x2={104} y2={80} green={true} />
              <InternalReference
                x={0}
                y={138}
                green={true}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_52}
                color="rgba(0,255,255,1)"
              />
              <Label x={30} y={132} varValue="[m]" />
              <Line x1={24} y1={142} x2={124} y2={142} green={true} />
              <Line x1={124} y1={142} x2={124} y2={80} green={true} />
              <WTCAxisSpeedCalculating
                x={84}
                y={44}
                green={true}
                varValue={this.state.Real_44}
                varName="reAxisSpeedRawTP"
              />
              <Label x={284} y={52} varValue="[rpm]" />
              <Line x1={278} y1={62} x2={308} y2={62} green={true} />

              <Input
                x={256}
                y={138}
                green={bool(this.state.Bool_0)}
                varName="reAxisSpeedOffsetIN"
                varValue={this.state.Real_37}
              />
              <Line x1={280} y1={142} x2={314} y2={142} green={bool(this.state.Bool_0)} />
              <Line x1={314} y1={142} x2={314} y2={110} green={bool(this.state.Bool_0)} />
              <SwitchNO
                x={308}
                y={98}
                green={bool(this.state.Bool_0)}
                textPosOffsetX={-32}
                textPosOffsetY={10}
                rotate={90}
                varName="boAxisSpeedOffsetIN"
                varValue={bool(this.state.Bool_0)}
              />
              <Line x1={314} y1={98} x2={314} y2={68} green={bool(this.state.Bool_0)} />
              <Sum
                x={308}
                y={56}
                green={true}
              />

              <Line x1={320} y1={62} x2={340} y2={62} green={true} />
              <SwitchNC
                x={340}
                y={56}
                green={!bool(this.state.Bool_1)}
                varName="boAxisStopIN"
                varValue={bool(this.state.Bool_1)}
              />
              <Line x1={352} y1={62} x2={392} y2={62} green={!bool(this.state.Bool_1)} />
              <TestPoint
                x={392}
                y={56}
                green={!bool(this.state.Bool_1)}
                varName="reAxisSpeedWithOffsetTP"
                varValue={this.state.Real_46}
              />
              <Line x1={404} y1={62} x2={482} y2={62} green={!bool(this.state.Bool_1)} />

              <Ramp
                x={482}
                y={50}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                varName="reAxisSpeedTP"
                varValue={this.state.Real_45}
              />
              <Line x1={486} y1={74} x2={486} y2={94} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Line x1={486} y1={94} x2={442} y2={94} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Input
                logic
                x={418}
                y={90}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                textPosOffsetX={-10}
                varName="boSpeedRampEnableIN"
                varValue={bool(this.state.Bool_11)}
              />
              <Line x1={494} y1={74} x2={494} y2={134} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Line x1={442} y1={134} x2={494} y2={134} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Input
                x={418}
                y={130}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                textPosOffsetX={-10}
                varName="reRampTimeToReachMaxSpeedIN"
                varValue={this.state.Real_38}
              />
              <Line x1={502} y1={74} x2={502} y2={204} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Line x1={442} y1={204} x2={502} y2={204} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />

              <WTCAxisSpeedRampGradientCalculating
                x={248}
                y={186}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                varName="Ramp Gradient"
                varValue={this.state.Real_9 * this.state.Real_52 / this.state.Real_48}
              />
              <Line x1={204} y1={204} x2={248} y2={204} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <InternalReference
                x={180}
                y={200}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                varName="reCircumferenceTP"
                varValue={this.state.Real_48}
                color="rgba(15,92,11,1)"
              />
              <Line x1={316} y1={222} x2={316} y2={244} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Line x1={204} y1={244} x2={316} y2={244} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Input
                x={180}
                y={240}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                varName="reMachineSpeedMaxIN"
                varValue={this.state.Real_9}
              />
              <Line x1={356} y1={222} x2={356} y2={284} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <Line x1={204} y1={284} x2={356} y2={284} green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)} />
              <InternalReference
                x={180}
                y={280}
                green={!bool(this.state.Bool_1) && bool(this.state.Bool_11)}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_52}
                color="rgba(0,255,255,1)"
              />
              <Line x1={506} y1={62} x2={600} y2={62} green={!bool(this.state.Bool_1)} />
              <InternalReference
                x={600}
                y={58}
                green={!bool(this.state.Bool_1)}
                varName="reAxisSpeedTP"
                varValue={this.state.Real_45}
                color="rgba(105,191,52,1)"
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}
          
          </g>{/*  FINE PAGINA 2 / 3                                                                      */}

          <g transform="translate(0,1250)">{/*  INIZIO PAGINA 3 / 3                                       */}

            <g transform="translate(0,0)">{/*  INIZIO BLOCCO 1                                         */}

              <InternalReference
                x={0}
                y={58}
                green={true}
                varName="reTorqueWithStaticFrictionsTP"
                varValue={this.state.Real_65}
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
                varValue={this.state.Real_50}
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
                varValue={this.state.Real_12}
              />
              <Line x1={284} y1={94} x2={310} y2={94} green={true} />
              <Line x1={310} y1={94} x2={310} y2={68} green={true} />

              <Input
                x={260}
                y={20}
                green={true}
                varName="reTorqueMaxIN"
                varValue={this.state.Real_13}
              />
              <Line x1={284} y1={24} x2={310} y2={24} green={true} />
              <Line x1={310} y1={24} x2={310} y2={56} green={true} />

              <Line x1={316} y1={62} x2={336} y2={62} green={true} />
              <TestPoint
                x={336}
                y={56}
                green={true}
                varName="reTorqueTP"
                varValue={this.state.Real_64}
              />


              <Line x1={348} y1={62} x2={368} y2={62} green={true} />
              <Line x1={368} y1={62} x2={382} y2={62} green={bool(this.state.Bool_14)} />
              <Inversion
                x={382}
                y={56}
                green={bool(this.state.Bool_14)}
              />
              <Line x1={394} y1={62} x2={428} y2={62} green={bool(this.state.Bool_14)} />


              <Line x1={368} y1={62} x2={368} y2={48} green={!bool(this.state.Bool_14)} />
              <Line x1={368} y1={48} x2={408} y2={48} green={!bool(this.state.Bool_14)} />
              <Line x1={408} y1={48} x2={408} y2={56} green={!bool(this.state.Bool_14)} />
              <Line x1={408} y1={56} x2={428} y2={56} green={!bool(this.state.Bool_14)} />
              <Switch
                x={428}
                y={53}
                green={true}
                rotate={0}
                varName="boTorqueInversionIN"
                varValue={bool(this.state.Bool_14)}
              />
              <Line x1={440} y1={59} x2={520} y2={59} green={true} />
              <Line x1={520} y1={59} x2={580} y2={59} green={bool(this.state.Bool_4)} />
              <Input
                x={520}
                y={29}
                green={!bool(this.state.Bool_4)}
                varName="reTorqueLimitOverrideIN"
                varValue={this.state.Real_16}
              />
              <Line x1={560} y1={53} x2={580} y2={53} green={!bool(this.state.Bool_4)} />
              <Line x1={544} y1={33} x2={560} y2={33} green={!bool(this.state.Bool_4)} />
              <Line x1={560} y1={33} x2={560} y2={53} green={!bool(this.state.Bool_4)} />

              <Switch
                x={580}
                y={50}
                green={true}
                rotate={0}
                varName="boLoadCellControlIN"
                varValue={bool(this.state.Bool_4)}
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
                varValue={this.state.Real_40}
              />



              <Line x1={520} y1={59} x2={520} y2={133} green={!bool(this.state.Bool_4)} />
              <Line x1={520} y1={133} x2={580} y2={133} green={!bool(this.state.Bool_4)} />

              <Costant
                x={520}
                y={154}
                green={bool(this.state.Bool_4)}
                varValue={0}
              />
              <Line x1={560} y1={139} x2={580} y2={139} green={bool(this.state.Bool_4)} />
              <Line x1={544} y1={159} x2={560} y2={159} green={bool(this.state.Bool_4)} />
              <Line x1={560} y1={159} x2={560} y2={139} green={bool(this.state.Bool_4)} />

              <Switch
                x={580}
                y={130}
                green={true}
                rotate={0}
                varName="boLoadCellControlIN"
                varValue={bool(this.state.Bool_4)}
              />
              <Line x1={592} y1={136} x2={700} y2={136} green={true} />
              <Output
                x={700}
                y={132}
                green={true}
                varName="reTorqueForwardOUT"
                varValue={this.state.Real_39}
              />

            </g>{/*  FINE BLOCCO 1                                                                     */}

            <g transform="translate(0,68)">{/*  INIZIO BLOCCO 2                                        */}

              <Label x={210} y={70} varValue="[Nm]" />
              <Line x1={206} y1={0} x2={206} y2={80} green={bool(this.state.Bool_4)} />
              <WTCTorqueCorrectionCalculating
                x={134}
                y={80}
                green={bool(this.state.Bool_4)}
                varName="reTorqueCorrectionTP"
                varValue={this.state.Real_63}
              />

              <InternalReference
                x={20}
                y={94}
                green={bool(this.state.Bool_4)}
                varName="reRadiusTP"
                varValue={this.state.Real_57}
                color="rgba(3,177,252,1)"
              />  
              <Label x={48} y={88} varValue="[m]" />
              <Line x1={44} y1={98} x2={134} y2={98} green={bool(this.state.Bool_4)} />

              <InternalReference
                x={20}
                y={134}
                green={bool(this.state.Bool_4)}
                varName="reNormalizedRadiusMaxTP"
                varValue={this.state.Real_53}
                color="rgba(255,111,0,1)"
              /> 
              <Line x1={44} y1={138} x2={154} y2={138} green={bool(this.state.Bool_4)} />
              <Line x1={154} y1={138} x2={154} y2={116} green={bool(this.state.Bool_4)} />

              <Line x1={74} y1={178} x2={206} y2={178} green={bool(this.state.Bool_4)} />
              <Line x1={206} y1={178} x2={206} y2={116} green={bool(this.state.Bool_4)} />


              <InternalReference
                x={0}
                y={177}
                green={true}
                varName="reCorrectionTP"
                varValue={this.state.Real_51}
                color="rgba(173,0,0,1)"
              />  
              <Line x1={24} y1={181} x2={62} y2={181} green={true} />
              <Switch
                x={62}
                y={175}
                green={true}
                rotate={180}
                varName="boLoadCellControlIN"
                varValue={bool(this.state.Bool_4)}
              />
              <Label x={102} y={168} varValue="[N]" />
              <Label x={102} y={186} varValue="[m/min]" />
              



              <Line x1={74} y1={184} x2={206} y2={184} green={!bool(this.state.Bool_4)} />
              <Line x1={206} y1={184} x2={206} y2={246} green={!bool(this.state.Bool_4)} />

              <InternalReference
                x={20}
                y={260}
                green={!bool(this.state.Bool_4)}
                varName="reCircumferenceTP"
                varValue={this.state.Real_48}
                color="rgba(15,92,11,1)"
              /> 
              <Label x={48} y={255} varValue="[m]" />
              <Line x1={44} y1={264} x2={109} y2={264} green={!bool(this.state.Bool_4)} />


              <InternalReference
                x={20}
                y={300}
                green={!bool(this.state.Bool_4)}
                varName="reNormalizedCircumferenceMinTP"
                varValue={this.state.Real_52}
                color="rgba(0,255,255,1)"
              /> 
              <Line x1={44} y1={304} x2={149} y2={304} green={!bool(this.state.Bool_4)} />
              <Line x1={149} y1={282} x2={149} y2={304} green={!bool(this.state.Bool_4)} />


              <WTCSpeedCorrectionCalculating
                x={109}
                y={246}
                green={!bool(this.state.Bool_4)}
                varName="reSpeedCorrectionTP"
                varValue={this.state.Real_58}
              />
              <Line x1={206} y1={282} x2={206} y2={362} green={!bool(this.state.Bool_4)} />

              <Label x={210} y={284} varValue="[rpm]" />
              <Line x1={206} y1={294} x2={400} y2={294} green={!bool(this.state.Bool_4)} />
              <Output
                x={400}
                y={290}
                green={!bool(this.state.Bool_4)}
                varName="reSpeedCorrectionOUT"
                varValue={this.state.Real_43}
              />

            </g>{/*  FINE BLOCCO 2                                                                     */}

            <g transform="translate(0,374)">{/*  INIZIO BLOCCO 3                                       */}

              <InternalReference
                x={0}
                y={58}
                green={!bool(this.state.Bool_1)}
                varName="reAxisSpeedTP"
                varValue={this.state.Real_45}
                color="rgba(105,191,52,1)"
              />  
              <Label x={40} y={52} varValue="[rpm]" />
              <Line x1={24} y1={62} x2={200} y2={62} green={!bool(this.state.Bool_1)} />
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
                varValue={this.state.Real_49}
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
                varValue={this.state.Real_10}
              />
              <Line x1={284} y1={94} x2={310} y2={94} green={true} />
              <Line x1={310} y1={94} x2={310} y2={68} green={true} />

              <Input
                x={260}
                y={20}
                green={true}
                varName="reAxisSpeedMaxIN"
                varValue={this.state.Real_11}
              />
              <Line x1={284} y1={24} x2={310} y2={24} green={true} />
              <Line x1={310} y1={24} x2={310} y2={56} green={true} />

              <Line x1={316} y1={62} x2={336} y2={62} green={true} />
              <TestPoint
                x={336}
                y={56}
                green={true}
                varName="reSpeedTP"
                varValue={this.state.Real_59}
              />


              <Line x1={348} y1={62} x2={368} y2={62} green={true} />
              <Line x1={368} y1={62} x2={382} y2={62} green={bool(this.state.Bool_10)} />
              <Inversion
                x={382}
                y={56}
                green={bool(this.state.Bool_10)}
              />
              <Line x1={394} y1={62} x2={428} y2={62} green={bool(this.state.Bool_10)} />


              <Line x1={368} y1={62} x2={368} y2={48} green={!bool(this.state.Bool_10)} />
              <Line x1={368} y1={48} x2={408} y2={48} green={!bool(this.state.Bool_10)} />
              <Line x1={408} y1={48} x2={408} y2={56} green={!bool(this.state.Bool_10)} />
              <Line x1={408} y1={56} x2={428} y2={56} green={!bool(this.state.Bool_10)} />
              <Switch
                x={428}
                y={53}
                green={true}
                rotate={0}
                varName="boSpeedInversionIN"
                varValue={bool(this.state.Bool_10)}
              />
              <Line x1={440} y1={59} x2={700} y2={59} green={true} />
              <Output
                x={700}
                y={55}
                green={true}
                varName="reSpeedOUT"
                varValue={this.state.Real_41}
              />

            </g>{/*  FINE BLOCCO 3                                                                     */}

            <g transform="translate(0,500)">{/*  INIZIO BLOCCO 4                                       */}

              <Input
                x={0}
                y={42}
                green={true}
                varName="rekPMaxIN"
                varValue={this.state.Real_34}
              /> 
              <Line x1={24} y1={46} x2={100} y2={46} green={true} />
              <Line x1={100} y1={46} x2={100} y2={60} green={true} />
              <Line x1={100} y1={60} x2={136} y2={60} green={true} />

              <Input
                x={0}
                y={82}
                green={true}
                varName="rekPMinIN"
                varValue={this.state.Real_33}
              /> 
              <Line x1={100} y1={72} x2={136} y2={72} green={true} />
              <Line x1={100} y1={72} x2={100} y2={86} green={true} />
              <Line x1={24} y1={86} x2={100} y2={86} green={true} />

              <Input
                x={0}
                y={122}
                green={true}
                varName="reDiameterMinIN"
                varValue={this.state.Real_6}
              /> 

              <Line x1={24} y1={126} x2={80} y2={126} green={true} />
              <Label x={50} y={116} varValue="[mm]" />
              <Divide 
                x={80}
                y={120}
                green={true}
              />

              <Costant
                x={0}
                y={161}
                green={true}
                varValue={1000}
              />
              <Line x1={24} y1={166} x2={86} y2={166} green={true} />
              <Line x1={86} y1={166} x2={86} y2={132} green={true} />

              <Label x={110} y={116} varValue="[m]" />
              <Line x1={92} y1={126} x2={142} y2={126} green={true} />

              <Line x1={142} y1={126} x2={142} y2={78} green={true} />

              <InternalReference
                x={0}
                y={202}
                green={true}
                varName="reDiameterTP"
                varValue={this.state.Real_66}
                color="rgba(252,215,3,1)"
              /> 
              <Label x={50} y={196} varValue="[m]" />
              <Line x1={24} y1={206} x2={148} y2={206} green={true} />
              <Line x1={148} y1={206} x2={148} y2={78} green={true} />

              <Input
                x={0}
                y={242}
                green={true}
                varName="reDiameterMaxIN"
                varValue={this.state.Real_7}
              /> 
              <Line x1={24} y1={246} x2={80} y2={246} green={true} />
              <Label x={50} y={236} varValue="[mm]" />
              <Divide 
                x={80}
                y={240}
                green={true}
              />

              <Costant
                x={0}
                y={281}
                green={true}
                varValue={1000}
              />
              <Line x1={24} y1={286} x2={86} y2={286} green={true} />
              <Line x1={86} y1={286} x2={86} y2={252} green={true} />

              <Label x={110} y={236} varValue="[m]" />
              <Line x1={92} y1={246} x2={154} y2={246} green={true} />
              <Line x1={154} y1={246} x2={154} y2={78} green={true} />

              <Interpolator
                x={136}
                y={54}
                green={true}
                varName="rekPOUT"
                varValue={this.state.Real_42}
              />
              <Line x1={160} y1={66} x2={700} y2={66} green={true} />
              <Output
                x={700}
                y={62}
                green={true}
                varName="rekPOUT"
                varValue={this.state.Real_42}
              />

            </g>{/*  FINE BLOCCO 4                                                                     */}

          </g>{/*  FINE PAGINA 3 / 3                                                                      */}
        </svg>
      </div>
    )
  }
}