import React, { Component } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import AddCollege from "./AddCollege";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
export default class CollegeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: " ",
      phoneNo: "",
      city: "",
      state: "",
      message: "",
      error: "",
      list: [],
    };
    this.search();
  }
  search() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/College/search", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
        // console.log(res.data.result.data.address);
      });
  }
  delete(id) {
    axios
      .get("http://api.sunilos.com:9080/ORSP10/College/delete/" + id)
      .then((res) => {
        // this.setState({ list: res.data.result.data });
        this.search();
      });
  }
  render() {
    return (
      <>
        <Form align="center">
          <input
            type="text"
            name="name"
            placeholder="search by name"
            value={this.state.name}
            className="rounded-4"
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          &nbsp; &nbsp;
          {/* <input
            type="text"
            name="phoneNo"
            placeholder="search by address"
            value={this.state.address}}
            className="rounded-4"
            onChange={(event) => this.setState({ address: event.target.value })}
          /> */}
          &nbsp; &nbsp;
          <Button type="button" onClick={() => this.search()}>
            Search
          </Button>
        </Form>
        <h2 align="center">CollegeList</h2>
        <Table className="table-list">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Addres</th>
              <th>Phone NO.</th>
              <th>City</th>
              <th>State</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list &&
              this.state.list.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.address}</td>
                    <td>{ele.phoneNo}</td>
                    <td>{ele.city}</td>
                    <td>{ele.state}</td>
                    <td>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => this.delete(ele.id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Link className="btn btn-info" to={"/AddCollege/" + ele.id}>Edit</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
}
