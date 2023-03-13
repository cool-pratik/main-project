import React, { Component } from "react";

export default class FormMessage extends Component {
  constructor(props){
    super(props);
    console.log();
  }
  render() {
    return (
      // 
    
       <>
        {(() => {
          if (this.props.error === "true") {
            return (
              <h3 style={{color: "#E9573F" }}>{this.props.message}</h3>
            )
          } if (this.props.error === "false") {
            return (
              <h3 style={{color: "#45a82c" }}>{this.props.message}</h3>
            )
          }
        })()}
      </>
    
    );
  }
}
