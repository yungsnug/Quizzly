"use strict";

import React from 'react'

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      sections: props.course.sections,
      
      section: {id: -1},
      
      allSections: {id: -1, title: "All"}
      

     
    }
  }

  componentDidMount() {
    this.populateDropdowns(this.props.course);
  }

  componentWillReceiveProps(newProps) {
    this.populateDropdowns(newProps.course);
  }

  populateDropdowns(course) {
    
    if(course.id == -1) return;
    var me = this;
    $.when(
      $.post('section/find', {course: course.id})
    )
    .then(function(sections) {
      console.log("sections", sections);
      
      me.setState({
        sections: sections
        
      });
    });
  }



  changeSection(event) {
    var section = this.state.section;
    section.id = event.target.value;
    this.setState({
      section: section
      
    });
  }


  

  downloadGrades() {
    //use node-csv-parse
    console.log("downloading grades...");
  }




  render() {
    return (
      <div id="download" className="quizzlyContent">
        <div className="flexHorizontal">
          <div>
            <div className="small ml10">Sections</div>
            <select value={this.state.section.id} className="dropdown mr10" onChange={this.changeSection.bind(this)}>
              <option value={this.state.allSections.id}>{this.state.allSections.title}</option>
              {this.state.sections.map(function(section, sectionIndex) {
                return <option key={sectionIndex} value={section.id}>{section.title}</option>
              })}
            </select>
          </div>
         
          <button onClick={this.downloadGrades.bind(this)}>DOWNLOAD GRADES</button>
        </div>
      </div>
    );
  }
}