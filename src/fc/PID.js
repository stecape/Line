import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/TestPoint'
import Input from '../components/Input'
import InternalReference from '../components/InternalReference'
import Line from '../components/Line'
import Output from '../components/Output'
import SwitchNO from '../components/SwitchNO'
import SwitchNC from '../components/SwitchNC'
import Switch from '../components/Switch'
import Inversion from '../components/Inversion'
import Limitator from '../components/Limitator'
import Calculating from '../components/Calculating'
import Sum from '../components/Sum'
import Difference from '../components/Difference'
import Multiply from '../components/Multiply'
import Divide from '../components/Divide'
import Integrative from '../components/Integrative'
import Derivative from '../components/Derivative'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default class PID extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selection: "PID 1"
    }
  }

  axiosFunc = () => {
    axios.get('data/PID.html').then(results => {
      this.setState(results.data[this.state.selection])
    })
  }

  componentDidMount() {
    this.axiosFunc()
    axios.get('data/PID.html').then(results => {
      var options = Object.keys(results.data).map( reg => {
        return <MenuItem key={reg} value={reg}>{reg}</MenuItem>
      })
      this.setState({options: options})
    })
    this.interval = setInterval(this.axiosFunc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    var bool = (bool) => { return bool === "1" ? true : false }
    
    var change = (event) => this.setState({selection: event.target.value})

    return (
      <div>
        <Typography variant="title" color="inherit">
          PID
        </Typography>
        <Select onChange={change} value={this.state.selection}>
          {this.state.options}
  			</Select>
        <svg viewBox="0 0 960 540" >


          {/*                                                                 Setpoint, Actual e Calcolo dell'errore */}
          <Input
            x={0}
            y={128}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_SetValue_IN"
            varValue={this.state.re_SetValue_IN}
          />
          <Line x1={24} y1={132} x2={70} y2={132} green={true} />
          <Input
            x={0}
            y={168}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ActValue_IN"
            varValue={this.state.re_ActValue_IN}
          />
          <Line x1={24} y1={172} x2={76} y2={172} green={true} />
          <Line x1={76} y1={172} x2={76} y2={138} green={true} />
          <Difference
            x={70}
            y={126}
            green={true}
            signPosOffsetX={0}
            signPosOffsetY={0}
          />
          <Line x1={82} y1={132} x2={102} y2={132} green={true} />


          {/*                                                                                 Inversione dell'errore */}
          <Line x1={102} y1={132} x2={102} y2={102} green={!bool(this.state.bo_InvertError_IN)} /> 
          <Line x1={102} y1={102} x2={122} y2={102} green={!bool(this.state.bo_InvertError_IN)} />
          <SwitchNC
            x={122}
            y={96}
            green={!bool(this.state.bo_InvertError_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_InvertError_IN"
            varValue={bool(this.state.bo_InvertError_IN)}
          />
          <Line x1={134} y1={102} x2={154} y2={102} green={!bool(this.state.bo_InvertError_IN)} />
          <Line x1={154} y1={132} x2={154} y2={102} green={!bool(this.state.bo_InvertError_IN)} />
          <Line x1={102} y1={132} x2={122} y2={132} green={bool(this.state.bo_InvertError_IN)} />
          <Inversion
            x={122}
            y={126}
            green={bool(this.state.bo_InvertError_IN)}
          />
          <Line x1={134} y1={132} x2={154} y2={132} green={bool(this.state.bo_InvertError_IN)} />
          <Line x1={154} y1={132} x2={174} y2={132} green={true} />
          <TestPoint
            x={174}
            y={126}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Error_TP"
            varValue={this.state.re_Error_TP}
          />
          <Line x1={186} y1={132} x2={206} y2={132} green={true} />


          {/*                                                                                         Errore * Kp */}
          <Multiply
            x={206}
            y={126}
            green={true}
          />
          <Input
            x={162}
            y={168}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_kP_IN"
            varValue={this.state.re_kP_IN}
          />
          <Line x1={186} y1={172} x2={212} y2={172} green={true} />
          <Line x1={212} y1={138} x2={212} y2={172} green={true} />
          <Line x1={218} y1={132} x2={238} y2={132} green={true} />
          <TestPoint
            x={238}
            y={126}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_KpError_TP"
            varValue={this.state.re_KpError_TP}
          />
          <Line x1={250} y1={132} x2={270} y2={132} green={true} />


          {/*                                                                                    Ramo Derivativa */}
          <Line x1={270} y1={132} x2={270} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Line x1={270} y1={62} x2={290} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Multiply
            x={290}
            y={56}
            green={bool(this.state.bo_DerivativeEnable_IN)}
          />
          <Input
            x={256}
            y={32}
            green={bool(this.state.bo_DerivativeEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Td_IN"
            varValue={this.state.re_Td_IN}
          />
          <Line x1={280} y1={36} x2={296} y2={36} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Line x1={296} y1={36} x2={296} y2={56} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Line x1={302} y1={62} x2={322} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Derivative
            x={322}
            y={56}
            green={bool(this.state.bo_DerivativeEnable_IN)}
          />
          <Line x1={334} y1={62} x2={418} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <SwitchNO
            x={418}
            y={56}
            green={bool(this.state.bo_DerivativeEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_DerivativeEnable_IN"
            varValue={bool(this.state.bo_DerivativeEnable_IN)}
          />
          <Line x1={430} y1={62} x2={450} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <TestPoint
            x={450}
            y={56}
            green={bool(this.state.bo_DerivativeEnable_IN)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_DerivativeCorrection_TP"
            varValue={this.state.re_DerivativeCorrection_TP}
          />
          <Line x1={462} y1={62} x2={482} y2={62} green={bool(this.state.bo_DerivativeEnable_IN)} />
          <Line x1={482} y1={62} x2={482} y2={126} green={bool(this.state.bo_DerivativeEnable_IN)} />


          {/*                                                                                Ramo Proporzionale */}
          <Line x1={270} y1={132} x2={290} y2={132} green={true} />
          <Multiply
            x={290}
            y={126}
            green={true}
          />
          <Input
            x={256}
            y={92}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Gp_IN"
            varValue={this.state.re_Gp_IN}
          />
          <Line x1={280} y1={96} x2={296} y2={96} green={true} />
          <Line x1={296} y1={96} x2={296} y2={126} green={true} />
          <Line x1={302} y1={132} x2={450} y2={132} green={true} />
          <TestPoint
            x={450}
            y={126}
            green={true}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_ProportionalCorrection_TP"
            varValue={this.state.re_ProportionalCorrection_TP}
          />
          <Line x1={462} y1={132} x2={476} y2={132} green={true} />


          {/*                                                                                 Ramo Integrativa */}
          <Line x1={270} y1={132} x2={270} y2={202} green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)} />
          <Line x1={270} y1={202} x2={290} y2={202} green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)} />
          <Divide
            x={290}
            y={196}
            green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)}
          />
          <Input
            x={256}
            y={172}
            green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Ti_IN"
            varValue={this.state.re_Ti_IN}
          />
          <Line x1={280} y1={176} x2={296} y2={176} green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)} />
          <Line x1={296} y1={176} x2={296} y2={196} green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)} />
          <Line x1={302} y1={202} x2={322} y2={202} green={bool(this.state.bo_IntegralEnable_IN) && !bool(this.state.bo_ManualControl_Bumpless_IN)} />
          <Switch
            x={322}
            y={199}
            green={bool(this.state.bo_IntegralEnable_IN) || bool(this.state.bo_ManualControl_Bumpless_IN)}
            textPosOffsetX={-10}
            textPosOffsetY={0}
            varName="bo_ManualControl_Bumpless_IN"
            varValue={bool(this.state.bo_ManualControl_Bumpless_IN)}
          />
          <Line x1={334} y1={205} x2={354} y2={205} green={bool(this.state.bo_IntegralEnable_IN)} />
          <Sum
            x={354}
            y={199}
            green={bool(this.state.bo_IntegralEnable_IN)}
          />

                  {/*                                                                       Inizio sezione - Ingresso Ramo Manuale */}
                  <Input
                    x={0}
                    y={278}
                    green={bool(this.state.bo_ManualControl_Bumpless_IN)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_ManualSetValue_IN"
                    varValue={this.state.re_ManualSetValue_IN}
                  />
                  <Line x1={24} y1={282} x2={70} y2={282} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <InternalReference
                    x={0}
                    y={318}
                    green={bool(this.state.bo_ManualControl_Bumpless_IN)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_OutValue_TP"
                    varValue={this.state.re_OutValue_TP}
                  />
                  <Line x1={24} y1={322} x2={76} y2={322} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Line x1={76} y1={322} x2={76} y2={288} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Difference
                    x={70}
                    y={276}
                    green={bool(this.state.bo_ManualControl_Bumpless_IN)}
                    signPosOffsetX={0}
                    signPosOffsetY={0}
                  />
                  <Line x1={82} y1={282} x2={290} y2={282} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Divide
                    x={290}
                    y={276}
                    green={bool(this.state.bo_ManualControl_Bumpless_IN)}
                  />
                  <Input
                    x={256}
                    y={252}
                    green={bool(this.state.bo_ManualControl_Bumpless_IN)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_ManualTi_IN"
                    varValue={this.state.re_ManualTi_IN}
                  />        
                  <Line x1={280} y1={256} x2={296} y2={256} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Line x1={296} y1={256} x2={296} y2={276} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Line x1={302} y1={282} x2={312} y2={282} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Line x1={312} y1={282} x2={312} y2={208} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  <Line x1={312} y1={208} x2={322} y2={208} green={bool(this.state.bo_ManualControl_Bumpless_IN)} />
                  {/*                                                                         Fine sezione - Ingresso Ramo Manuale */}

                  {/*                                                                                Inizio sezione - Anti Wind Up */}
                  <Line x1={572} y1={132} x2={572} y2={226} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={578} y1={232} x2={618} y2={232} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Difference
                    rotate={90}
                    x={566}
                    y={226}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    signPosOffsetX={-14}
                    signPosOffsetY={-20}
                  />
                  <Sum
                    rotate={180}
                    x={618}
                    y={226}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                  />
                  <Line x1={624} y1={226} x2={624} y2={132} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={740} y1={132} x2={740} y2={226} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Difference
                    rotate={180}
                    x={734}
                    y={226}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    signPosOffsetX={-14}
                    signPosOffsetY={-20}
                  />
                  <Line x1={734} y1={232} x2={630} y2={232} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={792} y1={132} x2={792} y2={232} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={792} y1={232} x2={746} y2={232} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={572} y1={238} x2={572} y2={282} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={572} y1={282} x2={532} y2={282} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Calculating 
                    x={460}
                    y={264}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_AntiWindUpContribute"
                    varValue={this.state.re_AntiWindUpContribute}
                  />
                  <Line x1={496} y1={300} x2={496} y2={320} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Switch
                    x={490}
                    y={320}
                    rotate={-90}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    textPosOffsetX={20}
                    textPosOffsetY={18}
                    varName="bo_DerivativeEnable_IN"
                    varValue={bool(this.state.bo_DerivativeEnable_IN)}
                  />
                  <Line x1={493} y1={332} x2={493} y2={352} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={493} y1={352} x2={473} y2={352} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Input
                    x={449}
                    y={348}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    textPosOffsetX={-28}
                    textPosOffsetY={20}
                    varName="Tw = Ti"
                  />

                  <Line x1={499} y1={332} x2={499} y2={372} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={499} y1={372} x2={473} y2={372} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Input
                    x={449}
                    y={368}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    textPosOffsetX={-60}
                    textPosOffsetY={20}
                    varName="Tw = SQRT(Ti*Td)"
                  />


                  <Line x1={460} y1={282} x2={392} y2={282} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <SwitchNO
                    x={380}
                    y={276}
                    green={bool(this.state.bo_AntiWindUpEnable_IN)}
                    textPosOffsetX={-10}
                    textPosOffsetY={0}
                    varName="bo_AntiWindUpEnable_IN"
                    varValue={bool(this.state.bo_AntiWindUpEnable_IN)}
                  />
                  <Line x1={380} y1={282} x2={360} y2={282} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  <Line x1={360} y1={282} x2={360} y2={211} green={bool(this.state.bo_AntiWindUpEnable_IN)} />
                  {/*                                                                                  Fine sezione - Anti Wind Up */}

          <Line x1={366} y1={205} x2={386} y2={205} green={bool(this.state.bo_IntegralEnable_IN)} />
          <Integrative
            x={386}
            y={199}
            green={bool(this.state.bo_IntegralEnable_IN)}
          />
          <Input
            logic
            x={352}
            y={165}
            green={bool(this.state.bo_ResetIntegrator_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_ResetIntegrator_IN"
            varValue={bool(this.state.bo_ResetIntegrator_IN)}
          />        
          <Line x1={376} y1={169} x2={392} y2={169} green={bool(this.state.bo_ResetIntegrator_IN)} />
          <Line x1={392} y1={169} x2={392} y2={199} green={bool(this.state.bo_ResetIntegrator_IN)} />
          <Line x1={398} y1={205} x2={418} y2={205} green={bool(this.state.bo_IntegralEnable_IN)} />
          <SwitchNO
            x={418}
            y={199}
            green={bool(this.state.bo_IntegralEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_IntegralEnable_IN"
            varValue={bool(this.state.bo_IntegralEnable_IN)}
          />
          <Line x1={430} y1={205} x2={450} y2={205} green={bool(this.state.bo_IntegralEnable_IN)} />
          <TestPoint
            x={450}
            y={199}
            green={bool(this.state.bo_IntegralEnable_IN)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_IntegralCorrection_TP"
            varValue={this.state.re_IntegralCorrection_TP}
          />
          <Line x1={462} y1={205} x2={482} y2={205} green={bool(this.state.bo_IntegralEnable_IN)} />
          <Line x1={482} y1={205} x2={482} y2={138} green={bool(this.state.bo_IntegralEnable_IN)} />


          {/*                                                                                               Finale PID */}
          <Sum
            x={476}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN)}
          />
          <Line x1={488} y1={132} x2={508} y2={132} green={bool(this.state.bo_PIDEnable_IN)} />
          <TestPoint
            x={508}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_PIDCorrection_TP"
            varValue={this.state.re_PIDCorrection_TP}
          />
          <Line x1={520} y1={132} x2={540} y2={132} green={bool(this.state.bo_PIDEnable_IN)} />
          <SwitchNO
            x={540}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="bo_PIDEnable_IN"
            varValue={bool(this.state.bo_PIDEnable_IN)}
          />
          <Line x1={552} y1={132} x2={592} y2={132} green={bool(this.state.bo_PIDEnable_IN)} />
          <Limitator
            x={592}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN)}
          />
          <Input
            x={558}
            y={96}
            green={bool(this.state.bo_PIDEnable_IN)}
            textPosOffsetX={-30}
            textPosOffsetY={0}
            varName="re_PIDOutMax_PAR"
            varValue={this.state.re_PIDOutMax_PAR}
          />
          <Output
            logic
            x={618}
            y={96}
            green={bool(this.state.bo_PIDEnable_IN) && bool(this.state.bo_PIDOutWindUp_OUT)}
            textPosOffsetX={-20}
            textPosOffsetY={0}
            varName="bo_PIDOutWindDown_OUT"
            varValue={bool(this.state.bo_PIDOutWindUp_OUT)}
          />
          <Line x1={582} y1={100} x2={598} y2={100} green={bool(this.state.bo_PIDEnable_IN)} />
          <Line x1={598} y1={100} x2={618} y2={100} green={bool(this.state.bo_PIDEnable_IN) && bool(this.state.bo_PIDOutWindUp_OUT)} />
          <Line x1={598} y1={100} x2={598} y2={126} green={bool(this.state.bo_PIDEnable_IN)} />
          <Input
            x={558}
            y={164}
            green={bool(this.state.bo_PIDEnable_IN)}
            textPosOffsetX={-30}
            textPosOffsetY={34}
            varName="re_PIDOutMin_PAR"
            varValue={this.state.re_PIDOutMin_PAR}
          />
          <Output
            logic
            x={618}
            y={164}
            green={bool(this.state.bo_PIDEnable_IN) && bool(this.state.bo_PIDOutWindDown_OUT)}
            textPosOffsetX={-20}
            textPosOffsetY={34}
            varName="bo_PIDOutWindDown_OUT"
            varValue={bool(this.state.bo_PIDOutWindDown_OUT)}
          />
          <Line x1={582} y1={168} x2={598} y2={168} green={bool(this.state.bo_PIDEnable_IN)} />
          <Line x1={598} y1={168} x2={618} y2={168} green={bool(this.state.bo_PIDEnable_IN) && bool(this.state.bo_PIDOutWindDown_OUT)} />
          <Line x1={598} y1={138} x2={598} y2={168} green={bool(this.state.bo_PIDEnable_IN)} />
          <Line x1={604} y1={132} x2={644} y2={132} green={bool(this.state.bo_PIDEnable_IN)} />
          <TestPoint
            x={644}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_PIDOutValue_TP"
            varValue={this.state.re_PIDOutValue_TP}
          />
          <Line x1={656} y1={132} x2={676} y2={132} green={bool(this.state.bo_PIDEnable_IN)} />
          <Sum
            x={676}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
          />
          <Line x1={682} y1={126} x2={682} y2={68} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <SwitchNO
            x={676}
            y={56}
            green={bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={14}
            textPosOffsetY={18}
            rotate={90}
            varName="bo_ReferenceEnable_IN"
            varValue={bool(this.state.bo_ReferenceEnable_IN)}
          />
          <Input
            x={642}
            y={32}
            green={bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ReferenceValue_IN"
            varValue={this.state.re_ReferenceValue_IN}
          />
          <Line x1={666} y1={36} x2={682} y2={36} green={bool(this.state.bo_ReferenceEnable_IN)} />
          <Line x1={682} y1={36} x2={682} y2={56} green={bool(this.state.bo_ReferenceEnable_IN)} />

          <Line x1={688} y1={132} x2={708} y2={132} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />   
          <TestPoint
            x={708}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_RawOut_TP"
            varValue={this.state.re_RawOut_TP}
          />
          <Line x1={720} y1={132} x2={760} y2={132} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />          
          <Limitator
            x={760}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
          />
          <Input
            x={726}
            y={96}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={-10}
            textPosOffsetY={0}
            varName="re_OutMax_PAR"
            varValue={this.state.re_OutMax_PAR}
          />
          <Output
            logic
            x={786}
            y={96}
            green={(bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)) && bool(this.state.bo_OutWindUp_OUT)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_OutWindDown_OUT"
            varValue={bool(this.state.bo_OutWindUp_OUT)}
          />
          <Line x1={750} y1={100} x2={766} y2={100} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <Line x1={766} y1={100} x2={786} y2={100} green={(bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)) && bool(this.state.bo_OutWindUp_OUT)} />
          <Line x1={766} y1={100} x2={766} y2={126} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <Input
            x={726}
            y={164}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_OutMin_PAR"
            varValue={this.state.re_OutMin_PAR}
          />
          <Output
            logic
            x={786}
            y={164}
            green={(bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)) && bool(this.state.bo_OutWindDown_OUT)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="bo_OutWindDown_OUT"
            varValue={bool(this.state.bo_OutWindDown_OUT)}
          />
          <Line x1={750} y1={168} x2={766} y2={168} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <Line x1={766} y1={168} x2={786} y2={168} green={(bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)) && bool(this.state.bo_OutWindDown_OUT)} />
          <Line x1={766} y1={138} x2={766} y2={168} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <Line x1={772} y1={132} x2={812} y2={132} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <TestPoint
            x={812}
            y={126}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_OutValue_TP"
            varValue={this.state.re_OutValue_TP}
          />
          <Line x1={824} y1={132} x2={844} y2={132} green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)} />
          <Output
            x={844}
            y={128}
            green={bool(this.state.bo_PIDEnable_IN) || bool(this.state.bo_ReferenceEnable_IN)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="re_OutValue_OUT"
            varValue={this.state.re_OutValue_OUT}
          />

        </svg>
      </div>
    )
  }
}