import React, { Component } from "react";
import { Table,Form } from "react-bootstrap";
import {  Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import AddUser from "./AddUser";
import axios from "axios";
export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      loginId: "",
      password: "",
      roleId: "",
      message: "",
      error: "",
      list: [],
    };
    this.search();
  }
  search() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Auth/search", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
      });
  }
  delete(id) {
    // console.log(this.state.message);
    let url = "http://api.sunilos.com:9080/ORSP10/Auth/delete/" + id;
    axios.get(url).then((res) => {
      this.list = res.data.result.data;
      // console.log(res.data.result);
      this.search();
    });
  }
  render() {
    return (
      <>
        <h2 align="center">User List</h2>
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
          <input
            type="text"
            name="address"
            placeholder="search by RoleId"
            value={this.state.roleId}
            className="rounded-4"
            onChange={(event) =>
              this.setState({ roleId: event.target.value })
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
              <th>Sr.No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Login Id</th>
              <th>Role Id</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((ele, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                <td>{ele.loginId}</td>
                <td>{ele.roleId}</td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={(event) => this.delete(ele.id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
                <td>
                  <Link className="btn btn-info" to={"/registration/" + ele.id}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
