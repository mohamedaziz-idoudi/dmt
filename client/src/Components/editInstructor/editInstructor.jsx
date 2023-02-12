import React, {Component,useState,useEffect} from 'react'
import Axios from 'axios';

class editInstructor extends React.Component {
  
  state = {
  };

  handleRowClick = (index) => {
    this.setState({ selectedIndex: index });
  };
    edit_instructor = async (e,index) => {
    await e.preventDefault();
    await e.stopPropagation();
    this.setState({edit: true});
    console.log(this.state.selectedIndex)
    Axios.get("http://localhost:3001/api/get_instructor", { id: this.state.selectedIndex+1 }).then((data) => {
      this.setState({person : data.data[0]});
    })
  }
  render () {return (
    <div>
      
    </div>
  )
  }
}

export default editInstructor