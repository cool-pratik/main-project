import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AddStudent from "./AddStudent";
import { Routes, Link, Route } from "react-router-dom";
import axios from "axios";

export default class StudentList extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      mobileNo: "",
      list: [],
    };
    this.search();
  }
  search() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Student/search", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
      });
  }
  delete(id) {
    let url = "http://api.sunilos.com:9080/ORSP10/Student/delete/" + id;
    axios.get(url).then((res) => {
      this.list = res.data.result.data;
      this.search();
    });
  }
  render() {
    return (
      <>
        <h2 align="center">Student List</h2>
        <Form align="center">
          <input
            type="text"
            name="name"
            placeholder="search by name"
            value={this.state.firstName}
            className="rounded-4"
            onChange={(event) =>
              this.setState({ firstName: event.target.value })
            }
          />
          &nbsp; &nbsp;
          <input
            type="text"
            name="address"
            placeholder="search by collegeId"
            value={this.state.collegeId}
            className="rounded-4"
            onChange={(event) =>
              this.setState({ collegeId: event.target.value })
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>College Id</th>
              <th>Mobile No.</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((ele, i) => (
              <tr key={i}>
                <td>{i + 1} </td>
                <td>{ele.firstName}</td>
                <td>{ele.lastName}</td>
                {/* <td>{ele.loginId}</td> */}
                <td>{ele.collegeId}</td>
                <td>{ele.mobileNo}</td>
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
                    <Route path="/AddStudent/:pid" element={<AddStudent />} />
                  </Routes>
                  <Link className="btn btn-info" to={"/AddStudent/" + ele.id}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
