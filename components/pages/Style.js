"use strict";

import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div id="" className="">
        <div className="pt20 p alignC">Style Page</div>
        <div className="p20 row flexCenter" style={{"flex-shrink":"0"}}>
          <div className="flexCenter colorSquare greenBlueGradient mr20 mb20">
            <div className="p" style={{"color":"white"}}>
              <div>color: #32F1A8</div>
              <div>color: #32D7EF</div>
            </div>
          </div>
          <div className="flexCenter colorSquare lightGreenBackground mr20 mb20">
            <div className="p">color: #D9FFF0</div>
          </div>
          <div className="flexCenter colorSquare lightBlueBackground mr20 mb20"><div className="p">color: #E1FBFF</div>
          </div>
          <div className="flexCenter colorSquare whiteBackground mr20 mb20">
            <div className="p">color: #FFFFFF</div>
          </div>
          <div className="flexCenter colorSquare lightestGrayBackground mr20 mb20">
            <div className="p">color: #F8F8F8</div>
          </div>
          <div className="flexCenter colorSquare lightGrayBackground mr20 mb20">
            <div className="p">color: #E1E1E1</div>
          </div>
          <div className="flexCenter colorSquare grayBackground mb20">
            <div className="p" style={{"color":"white"}}>color: #838383</div>
          </div>
        </div>
        <div className="row alignC pb20">
          <p>Paragraph</p>
          <button className="h1 round greenBlueGradient p10 mr20" style={{"color":"white"}}>HEADING 1</button>
          <br/>
          <br/>
          <button className="h3 round greenBlueGradient p10">HEADING 3</button>
        </div>
      </div>
    );
  }
}
