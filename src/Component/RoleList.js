import React from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import { Table,Button,Form } from 'react-bootstrap'
import AddRole from "./AddRole"
import axios from "axios"
// import BaseCtl from './BaseCtrl'
export default class RoleList extends React.Component {
  constructor(){
    super();
    this.state ={
      name:"",
      discription:"",
      id:"",
      list:[]
    }
    this.search();
  }
  search(){
    axios.post("http://api.sunilos.com:9080/ORSP10/Role/search",this.state).then((res)=>{
      this.setState({list:res.data.result.data});
    })
  }
  delete(id){
    let url ="http://api.sunilos.com:9080/ORSP10/Role/delete/" +id;
    axios.get(url).then((res)=>{
      this.list = res.data.result.data;
      this.search( )
    })
    
  }
  render() {
    return (
      <>
      <h2 align="center">RolesList</h2>
       <Form align="center">
          <input
            type="text"
            name="name"
            placeholder="search by name"
            value={this.state.name}
            className="rounded-4"
            onChange={(event) =>
              this.setState({ name: event.target.value })
            }
          />
                &nbsp; &nbsp;
          <Button type="button" onClick={(event) => this.search  (event)}>
            Search
          </Button>
        </Form>
        &nbsp; &nbsp;
        <Table className="table-list">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Discription</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((ele, i) => (
              <tr key={i}>
                <td>{ele.id }</td>
                <td>{ele.name}</td>
                <td>{ele.discription}</td>
                <td>
                  {" "}
                  <Button
                    type="button"
                    variant="danger"
                    onClick={(id) => this.delete(ele.id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
                <td>
                  <Routes>
                    <Route
                      path="/AddRole/:pid"
                      element={<AddRole/>}
                    />
                  </Routes>
                  <Link className="btn btn-info" to={"/AddRole/"+ ele.id}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
}
