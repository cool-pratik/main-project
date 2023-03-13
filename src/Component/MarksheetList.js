import axios from 'axios'
import React, { Component } from 'react'
import { Table,Button,Form } from 'react-bootstrap'
import { Routes,Route,Link } from 'react-router-dom'
import AddmarkSheet from './Addmarksheet'
export default class MarksheetList extends Component {
  constructor(){
    super();
    this.state={
      id:'',
      rollNo:"",
      name:'',
      list:[]
    }
    this.search();
  }
  search(){
    axios.post('http://api.sunilos.com:9080/ORSP10/Marksheet/search', this.state).then((res) => {
            this.setState({ list: res.data.result.data });
        });
  }
  delete(id){
    let url ="http://api.sunilos.com:9080/ORSP10/Marksheet/delete/" +id;
    axios.get(url).then((res)=>{
      this.list = res.data.result.data;
      this.search( )
    })
    
  }
  render() {
    return (
      <>
      <h2 align="center">MarkSheet List</h2>
      <Form align="center">
          <input
            type="text"
            name="name"
            placeholder="search by RollNo."
            value={this.state.rollNo}
            className="rounded-4"
            onChange={(event) =>
              this.setState({ rollNo: event.target.value })
            }
          />
          &nbsp; &nbsp;
          <input
            type="text"
            name="address"
            placeholder="search by Name"
            value={this.state.name  }
            className="rounded-4"
            onChange={(event) =>
              this.setState({ name: event.target.value })
            }
          />
          &nbsp; &nbsp;
          <Button type="button" onClick={(event) => this.search(event)}>
            Search
          </Button>
        </Form>
      <Table className="table-list">
        <thead>
          <tr>
          <th>Id</th>
                <th>RollNo</th>
                <th>Name</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Maths</th>
                <th>Delete</th>
                <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.list.map((ele, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{ele.rollNo}</td>
              <td>{ele.name}</td>
              <td>{ele.physics}</td>
              <td>{ele.chemistry}</td>
              <td>{ele.maths}</td>
              <td>
                {" "}
                <Button
                  type="button"
                  variant="danger"
                  onClick={(event) => this.delete(ele.id)}
                >
                  Delete
                </Button>{" "}
              </td>
              <td>
                <Routes>
                  <Route path="/Addmarksheet/:pid" element={<AddmarkSheet />} />
                </Routes>
                <Link className="btn btn-info" to={"/Addmarksheet/" + ele.id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
    )
  }
}
