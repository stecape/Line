import React, { Component } from 'react'
import axios from 'axios'
import TestPoint from '../components/LOD/TestPoint'
import Input from '../components/LOD/Input'
import InternalReference from '../components/LOD/InternalReference'
import Line from '../components/LOD/Line'
import Output from '../components/LOD/Output'
import SwitchNO from '../components/SwitchNO'
import SwitchNC from '../components/SwitchNC'
import Switch from '../components/Switch'
import Inversion from '../components/Inversion'
import Limitator from '../components/LOD/Limitator'
import PIDCalculating from '../components/PIDCalculating'
import Sum from '../components/Sum'
import Difference from '../components/Difference'
import Multiply from '../components/Multiply'
import Divide from '../components/Divide'
import Integrative from '../components/LOD/Integrative'
import Derivative from '../components/LOD/Derivative'
import IndexInput from '../components/IndexInput'
import Typography from '@mui/material/Typography'

export default class PID extends Component {
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
          PID
        </Typography>

        <IndexInput index={Math.round(this.state.index)} />

        <svg viewBox="0 0 960 540" >


          {/*                                                                 Setpoint, Actual e Calcolo dell'errore */}
          <Input
            x={0}
            y={128}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_SetValue_IN"
            varValue={this.state.Real_0}
          />
          <Line x1={24} y1={132} x2={70} y2={132} green={true} />
          <Input
            x={0}
            y={168}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ActValue_IN"
            varValue={this.state.Real_1}
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
          <Line x1={102} y1={132} x2={102} y2={102} green={!bool(this.state.Bool_0)} /> 
          <Line x1={102} y1={102} x2={122} y2={102} green={!bool(this.state.Bool_0)} />
          <SwitchNC
            x={122}
            y={96}
            green={!bool(this.state.Bool_0)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_InvertError_IN"
            varValue={bool(this.state.Bool_0)}
          />
          <Line x1={134} y1={102} x2={154} y2={102} green={!bool(this.state.Bool_0)} />
          <Line x1={154} y1={132} x2={154} y2={102} green={!bool(this.state.Bool_0)} />
          <Line x1={102} y1={132} x2={122} y2={132} green={bool(this.state.Bool_0)} />
          <Inversion
            x={122}
            y={126}
            green={bool(this.state.Bool_0)}
          />
          <Line x1={134} y1={132} x2={154} y2={132} green={bool(this.state.Bool_0)} />
          <Line x1={154} y1={132} x2={174} y2={132} green={true} />
          <TestPoint
            x={174}
            y={126}
            green={true}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Error_TP"
            varValue={this.state.Real_19}
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
            varValue={this.state.Real_3}
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
            varValue={this.state.Real_20}
          />
          <Line x1={250} y1={132} x2={270} y2={132} green={true} />


          {/*                                                                                    Ramo Derivativa */}
          <Line x1={270} y1={132} x2={270} y2={62} green={bool(this.state.Bool_6)} />
          <Line x1={270} y1={62} x2={290} y2={62} green={bool(this.state.Bool_6)} />
          <Multiply
            x={290}
            y={56}
            green={bool(this.state.Bool_6)}
          />
          <Input
            x={256}
            y={32}
            green={bool(this.state.Bool_6)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Td_IN"
            varValue={this.state.re_Td_IN}
          />
          <Line x1={280} y1={36} x2={296} y2={36} green={bool(this.state.Bool_6)} />
          <Line x1={296} y1={36} x2={296} y2={56} green={bool(this.state.Bool_6)} />
          <Line x1={302} y1={62} x2={322} y2={62} green={bool(this.state.Bool_6)} />
          <Derivative
            x={322}
            y={56}
            green={bool(this.state.Bool_6)}
          />
          <Line x1={334} y1={62} x2={418} y2={62} green={bool(this.state.Bool_6)} />
          <SwitchNO
            x={418}
            y={56}
            green={bool(this.state.Bool_6)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_DerivativeEnable_IN"
            varValue={bool(this.state.Bool_6)}
          />
          <Line x1={430} y1={62} x2={450} y2={62} green={bool(this.state.Bool_6)} />
          <TestPoint
            x={450}
            y={56}
            green={bool(this.state.Bool_6)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_DerivativeCorrection_TP"
            varValue={this.state.Real_23}
          />
          <Line x1={462} y1={62} x2={482} y2={62} green={bool(this.state.Bool_6)} />
          <Line x1={482} y1={62} x2={482} y2={126} green={bool(this.state.Bool_6)} />


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
            varValue={this.state.Real_2}
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
            varValue={this.state.Real_21}
          />
          <Line x1={462} y1={132} x2={476} y2={132} green={true} />


          {/*                                                                                 Ramo Integrativa */}
          <Line x1={270} y1={132} x2={270} y2={202} green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)} />
          <Line x1={270} y1={202} x2={290} y2={202} green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)} />
          <Divide
            x={290}
            y={196}
            green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)}
          />
          <Input
            x={256}
            y={172}
            green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_Ti_IN"
            varValue={this.state.Real_4}
          />
          <Line x1={280} y1={176} x2={296} y2={176} green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)} />
          <Line x1={296} y1={176} x2={296} y2={196} green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)} />
          <Line x1={302} y1={202} x2={322} y2={202} green={bool(this.state.Bool_3) && !bool(this.state.Bool_8)} />
          <Switch
            x={322}
            y={199}
            green={bool(this.state.Bool_3) || bool(this.state.Bool_8)}
            textPosOffsetX={-10}
            textPosOffsetY={0}
            varName="bo_ManualControl_Bumpless_IN"
            varValue={bool(this.state.Bool_8)}
          />
          <Line x1={334} y1={205} x2={354} y2={205} green={bool(this.state.Bool_3)} />
          <Sum
            x={354}
            y={199}
            green={bool(this.state.Bool_3)}
          />

                  {/*                                                                       Inizio sezione - Ingresso Ramo Manuale */}
                  <Input
                    x={0}
                    y={278}
                    green={bool(this.state.Bool_8)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_ManualSetValue_IN"
                    varValue={this.state.Real_12}
                  />
                  <Line x1={24} y1={282} x2={70} y2={282} green={bool(this.state.Bool_8)} />
                  <InternalReference
                    x={0}
                    y={318}
                    green={bool(this.state.Bool_8)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_OutValue_TP"
                    varValue={this.state.Real_27}
                  />
                  <Line x1={24} y1={322} x2={76} y2={322} green={bool(this.state.Bool_8)} />
                  <Line x1={76} y1={322} x2={76} y2={288} green={bool(this.state.Bool_8)} />
                  <Difference
                    x={70}
                    y={276}
                    green={bool(this.state.Bool_8)}
                    signPosOffsetX={0}
                    signPosOffsetY={0}
                  />
                  <Line x1={82} y1={282} x2={290} y2={282} green={bool(this.state.Bool_8)} />
                  <Divide
                    x={290}
                    y={276}
                    green={bool(this.state.Bool_8)}
                  />
                  <Input
                    x={256}
                    y={252}
                    green={bool(this.state.Bool_8)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_ManualTi_IN"
                    varValue={this.state.Real_16}
                  />        
                  <Line x1={280} y1={256} x2={296} y2={256} green={bool(this.state.Bool_8)} />
                  <Line x1={296} y1={256} x2={296} y2={276} green={bool(this.state.Bool_8)} />
                  <Line x1={302} y1={282} x2={312} y2={282} green={bool(this.state.Bool_8)} />
                  <Line x1={312} y1={282} x2={312} y2={208} green={bool(this.state.Bool_8)} />
                  <Line x1={312} y1={208} x2={322} y2={208} green={bool(this.state.Bool_8)} />
                  {/*                                                                         Fine sezione - Ingresso Ramo Manuale */}

                  {/*                                                                                Inizio sezione - Anti Wind Up */}
                  <Line x1={572} y1={132} x2={572} y2={226} green={bool(this.state.Bool_5)} />
                  <Line x1={578} y1={232} x2={618} y2={232} green={bool(this.state.Bool_5)} />
                  <Difference
                    rotate={90}
                    x={566}
                    y={226}
                    green={bool(this.state.Bool_5)}
                    signPosOffsetX={-14}
                    signPosOffsetY={-20}
                  />
                  <Sum
                    rotate={180}
                    x={618}
                    y={226}
                    green={bool(this.state.Bool_5)}
                  />
                  <Line x1={624} y1={226} x2={624} y2={132} green={bool(this.state.Bool_5)} />
                  <Line x1={740} y1={132} x2={740} y2={226} green={bool(this.state.Bool_5)} />
                  <Difference
                    rotate={180}
                    x={734}
                    y={226}
                    green={bool(this.state.Bool_5)}
                    signPosOffsetX={-14}
                    signPosOffsetY={-20}
                  />
                  <Line x1={734} y1={232} x2={630} y2={232} green={bool(this.state.Bool_5)} />
                  <Line x1={792} y1={132} x2={792} y2={232} green={bool(this.state.Bool_5)} />
                  <Line x1={792} y1={232} x2={746} y2={232} green={bool(this.state.Bool_5)} />
                  <Line x1={572} y1={238} x2={572} y2={282} green={bool(this.state.Bool_5)} />
                  <Line x1={572} y1={282} x2={532} y2={282} green={bool(this.state.Bool_5)} />
                  <PIDCalculating 
                    x={460}
                    y={264}
                    green={bool(this.state.Bool_5)}
                    textPosOffsetX={0}
                    textPosOffsetY={0}
                    varName="re_AntiWindUpContribute"
                    varValue={this.state.Real_28}
                  />
                  <Line x1={496} y1={300} x2={496} y2={320} green={bool(this.state.Bool_5)} />
                  <Switch
                    x={490}
                    y={320}
                    rotate={-90}
                    green={bool(this.state.Bool_5)}
                    textPosOffsetX={20}
                    textPosOffsetY={18}
                    varName="bo_DerivativeEnable_IN"
                    varValue={bool(this.state.Real_6)}
                  />
                  <Line x1={493} y1={332} x2={493} y2={352} green={bool(this.state.Bool_5)} />
                  <Line x1={493} y1={352} x2={473} y2={352} green={bool(this.state.Bool_5)} />
                  <Input
                    x={449}
                    y={348}
                    green={bool(this.state.Bool_5)}
                    textPosOffsetX={-28}
                    textPosOffsetY={20}
                    varName="Tw = Ti"
                  />

                  <Line x1={499} y1={332} x2={499} y2={372} green={bool(this.state.Bool_5)} />
                  <Line x1={499} y1={372} x2={473} y2={372} green={bool(this.state.Bool_5)} />
                  <Input
                    x={449}
                    y={368}
                    green={bool(this.state.Bool_5)}
                    textPosOffsetX={-60}
                    textPosOffsetY={20}
                    varName="Tw = SQRT(Ti*Td)"
                  />


                  <Line x1={460} y1={282} x2={392} y2={282} green={bool(this.state.Bool_5)} />
                  <SwitchNO
                    x={380}
                    y={276}
                    green={bool(this.state.Bool_5)}
                    textPosOffsetX={-10}
                    textPosOffsetY={0}
                    varName="bo_AntiWindUpEnable_IN"
                    varValue={bool(this.state.Bool_5)}
                  />
                  <Line x1={380} y1={282} x2={360} y2={282} green={bool(this.state.Bool_5)} />
                  <Line x1={360} y1={282} x2={360} y2={211} green={bool(this.state.Bool_5)} />
                  {/*                                                                                  Fine sezione - Anti Wind Up */}

          <Line x1={366} y1={205} x2={386} y2={205} green={bool(this.state.Bool_3)} />
          <Integrative
            x={386}
            y={199}
            green={bool(this.state.Bool_3)}
          />
          <Input
            logic
            x={352}
            y={165}
            green={bool(this.state.Bool_4)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_ResetIntegrator_IN"
            varValue={bool(this.state.Bool_4)}
          />        
          <Line x1={376} y1={169} x2={392} y2={169} green={bool(this.state.Bool_4)} />
          <Line x1={392} y1={169} x2={392} y2={199} green={bool(this.state.Bool_4)} />
          <Line x1={398} y1={205} x2={418} y2={205} green={bool(this.state.Bool_3)} />
          <SwitchNO
            x={418}
            y={199}
            green={bool(this.state.Bool_3)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_IntegralEnable_IN"
            varValue={bool(this.state.Bool_3)}
          />
          <Line x1={430} y1={205} x2={450} y2={205} green={bool(this.state.Bool_3)} />
          <TestPoint
            x={450}
            y={199}
            green={bool(this.state.Bool_3)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_IntegralCorrection_TP"
            varValue={this.state.Real_22}
          />
          <Line x1={462} y1={205} x2={482} y2={205} green={bool(this.state.Bool_3)} />
          <Line x1={482} y1={205} x2={482} y2={138} green={bool(this.state.Bool_3)} />


          {/*                                                                                               Finale PID */}
          <Sum
            x={476}
            y={126}
            green={bool(this.state.Bool_1)}
          />
          <Line x1={488} y1={132} x2={508} y2={132} green={bool(this.state.Bool_1)} />
          <TestPoint
            x={508}
            y={126}
            green={bool(this.state.Bool_1)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_PIDCorrection_TP"
            varValue={this.state.Real_24}
          />
          <Line x1={520} y1={132} x2={540} y2={132} green={bool(this.state.Bool_1)} />
          <SwitchNO
            x={540}
            y={126}
            green={bool(this.state.Bool_1)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="bo_PIDEnable_IN"
            varValue={bool(this.state.Bool_1)}
          />
          <Line x1={552} y1={132} x2={592} y2={132} green={bool(this.state.Bool_1)} />
          <Limitator
            x={592}
            y={126}
            green={bool(this.state.Bool_1)}
          />
          <Input
            x={558}
            y={96}
            green={bool(this.state.Bool_1)}
            textPosOffsetX={-30}
            textPosOffsetY={0}
            varName="re_PIDOutMax_IN"
            varValue={this.state.Real_7}
          />
          <Output
            logic
            x={618}
            y={96}
            green={bool(this.state.Bool_1) && bool(this.state.Bool_9)}
            textPosOffsetX={-20}
            textPosOffsetY={0}
            varName="bo_PIDOutWindUp_OUT"
            varValue={bool(this.state.Bool_9)}
          />
          <Line x1={582} y1={100} x2={598} y2={100} green={bool(this.state.Bool_1)} />
          <Line x1={598} y1={100} x2={618} y2={100} green={bool(this.state.Bool_1) && bool(this.state.Bool_9)} />
          <Line x1={598} y1={100} x2={598} y2={126} green={bool(this.state.Bool_1)} />
          <Input
            x={558}
            y={164}
            green={bool(this.state.Bool_1)}
            textPosOffsetX={-30}
            textPosOffsetY={34}
            varName="re_PIDOutMin_IN"
            varValue={this.state.Real_8}
          />
          <Output
            logic
            x={618}
            y={164}
            green={bool(this.state.Bool_1) && bool(this.state.Bool_10)}
            textPosOffsetX={-20}
            textPosOffsetY={34}
            varName="bo_PIDOutWindDown_OUT"
            varValue={bool(this.state.Bool_10)}
          />
          <Line x1={582} y1={168} x2={598} y2={168} green={bool(this.state.Bool_1)} />
          <Line x1={598} y1={168} x2={618} y2={168} green={bool(this.state.Bool_1) && bool(this.state.Bool_10)} />
          <Line x1={598} y1={138} x2={598} y2={168} green={bool(this.state.Bool_1)} />
          <Line x1={604} y1={132} x2={644} y2={132} green={bool(this.state.Bool_1)} />
          <TestPoint
            x={644}
            y={126}
            green={bool(this.state.Bool_1)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_PIDOutValue_TP"
            varValue={this.state.Real_25}
          />
          <Line x1={656} y1={132} x2={676} y2={132} green={bool(this.state.Bool_1)} />
          <Sum
            x={676}
            y={126}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
          />
          <Line x1={682} y1={126} x2={682} y2={68} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <SwitchNO
            x={676}
            y={56}
            green={bool(this.state.Bool_7)}
            textPosOffsetX={14}
            textPosOffsetY={18}
            rotate={90}
            varName="bo_ReferenceEnable_IN"
            varValue={bool(this.state.Bool_7)}
          />
          <Input
            x={642}
            y={32}
            green={bool(this.state.Bool_7)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_ReferenceValue_IN"
            varValue={this.state.Real_9}
          />
          <Line x1={666} y1={36} x2={682} y2={36} green={bool(this.state.Bool_7)} />
          <Line x1={682} y1={36} x2={682} y2={56} green={bool(this.state.Bool_7)} />

          <Line x1={688} y1={132} x2={708} y2={132} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />   
          <TestPoint
            x={708}
            y={126}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_RawOut_TP"
            varValue={this.state.Real_26}
          />
          <Line x1={720} y1={132} x2={760} y2={132} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />          
          <Limitator
            x={760}
            y={126}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
          />
          <Input
            x={726}
            y={96}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
            textPosOffsetX={-10}
            textPosOffsetY={0}
            varName="re_OutMax_IN"
            varValue={this.state.Real_10}
          />
          <Output
            logic
            x={786}
            y={96}
            green={(bool(this.state.Bool_1) || bool(this.state.Bool_7)) && bool(this.state.Bool_11)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="bo_OutWindUp_OUT"
            varValue={bool(this.state.Bool_11)}
          />
          <Line x1={750} y1={100} x2={766} y2={100} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <Line x1={766} y1={100} x2={786} y2={100} green={(bool(this.state.Bool_1) || bool(this.state.Bool_7)) && bool(this.state.Bool_11)} />
          <Line x1={766} y1={100} x2={766} y2={126} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <Input
            x={726}
            y={164}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
            textPosOffsetX={-10}
            textPosOffsetY={34}
            varName="re_OutMin_IN"
            varValue={this.state.Real_11}
          />
          <Output
            logic
            x={786}
            y={164}
            green={(bool(this.state.Bool_1) || bool(this.state.Bool_7)) && bool(this.state.Bool_12)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="bo_OutWindDown_OUT"
            varValue={bool(this.state.Bool_12)}
          />
          <Line x1={750} y1={168} x2={766} y2={168} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <Line x1={766} y1={168} x2={786} y2={168} green={(bool(this.state.Bool_1) || bool(this.state.Bool_7)) && bool(this.state.Bool_12)} />
          <Line x1={766} y1={138} x2={766} y2={168} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <Line x1={772} y1={132} x2={812} y2={132} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <TestPoint
            x={812}
            y={126}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
            textPosOffsetX={0}
            textPosOffsetY={0}
            varName="re_OutValue_TP"
            varValue={this.state.Real_27}
          />
          <Line x1={824} y1={132} x2={844} y2={132} green={bool(this.state.Bool_1) || bool(this.state.Bool_7)} />
          <Output
            x={844}
            y={128}
            green={bool(this.state.Bool_1) || bool(this.state.Bool_7)}
            textPosOffsetX={0}
            textPosOffsetY={34}
            varName="re_OutValue_OUT"
            varValue={this.state.Real_17}
          />

        </svg>
      </div>
    )
  }
}