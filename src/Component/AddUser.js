import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
// import App from "../App.css";
import axios from "axios";
import withRouter from "./withRouter";
import FormMessage from "./FormMessage";
import BaseCtrl from "./BaseCtrl";
class AddUser extends BaseCtrl {
  constructor(props) {
    super(props);
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
      inputError: {
        id: "",
        firstName: "",
        lastName: "",
        loginId: "",
        password: "",
        roleId: "",
        message: "",
        error: "",
      },
    };
  }
  componentDidMount() {
    if (this.props.params.pid) {
      this.get();
    }
  }
  get() {
    let id = this.props.params.pid;
    axios
      .get("http://api.sunilos.com:9080/ORSP10/Auth/get/" + id)
      .then((res) => {
        this.setState({
          firstName: res.data.result.data.firstName,
          lastName: res.data.result.data.lastName,
          loginId: res.data.result.data.loginId,
          password: res.data.result.data.password,
          roleId: res.data.result.data.roleId,
          id: res.data.result.data.id,
        });
      });
  }
  // componentDidMount() {
  //   axios
  //     .post("http://api.sunilos.com:9080/ORSP10/User/search", this.state)
  //     .then((res) => {
  //       this.setState({ list: res.data.result.data });
  //       // console.log(res.data.result.data)
  //     });
  // }
  save(event) {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/User/save", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
        if (res.data.result.inputerror) {
          this.setState({ inputError: res.data.result.inputerror });
          this.changeInputError("error", "true");
        } else {
          this.changeInputError("error", "false");
          this.changeInputError("message", "Data saved Successfully");
          this.changeInputError("id", "");
          this.changeInputError("firstName", "");
          this.changeInputError("lastName", "");
          this.changeInputError("loginId", "");
          this.changeInputError("roleId", "");
        }
        // event.preventDefault()
        this.get();
      });
  }
  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phoneNo: "",
      loginId: "",
      password: "",
      error: "",
      inputError: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        phoneNo: "",
        loginId: "",
        password: "",
        error: "",
      },
    });
  };

  render() {
    return (
      <>
        <h2 align="center">
          {this.props.params.pid ? "Update User" : "Add User "}
        </h2>
        <div align="center" className="Auth-registration-container">
          <Form className="Auth-form-login">
            <div>
              <FormMessage
                error={this.getInputError("error")}
                message={this.getInputError("message")}
              />
            </div>
            <table className="Auth-form-content">
              <div>
                <input
                  className="form-control mt-1"
                  type="number"
                  name="id"
                  onChange={(event) =>
                    (this.State = { name: event.target.value })
                  }
                  value={this.state.id}
                  hidden
                />
              </div>
              <div className="form-group mt-3">
                <label>FirstName</label>
                <input
                  className="form-control mt-1"
                  name="firstName"
                  type="text"
                  onChange={(event) =>
                    this.setState({ firstName: event.target.value })
                  }
                  value={this.state.firstName}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <p style={{ color: "red" }}>{this.state.inputError.firstName}</p>
              <div>
                <label>LastName</label>
                <p> </p>
                <input
                  className="form-control mt-1"
                  name="lastName"
                  type={"text"}
                  value={this.state.lastName}
                  placeholder="Enter Last Name"
                  onChange={(event) =>
                    this.setState({ lastName: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.lastName}</p>
              </div>
              {/* <div className="form-group mt-3">
                <label>DOB</label>
                <input
                  className="form-control mt-1"
                  name="DOB"
                  type={"date"}
                  value={this.state.dob}
                  placeholder="Enter DOB"
                  onChange={(event) =>
                    this.setState({ dob: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.dob}</p>
              </div> */}
              <div className="form-group mt-3">
                <label>Email Id</label>
                <input
                  className="form-control mt-1"
                  name="loginId"
                  value={this.state.loginId}
                  placeholder="Enter Email Id"
                  onChange={(event) =>
                    this.setState({ loginId: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.loginId}</p>
              </div>
              <div></div>
              <div className="form-group mt-3">
                <label> Password </label>

                <input
                  className="form-control mt-1"
                  name="password"
                  type={"password"}
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  placeholder="Enter Password"
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.loginId}</p>
              </div>
              <div className="form-group mt-3">
                <label> Role Id </label>
                &nbsp;&nbsp;
                <select
                  name="roleId"
                  onChange={(event) =>
                    this.setState({ roleId: event.target.value })
                  }
                >
                  <option>--- Selected Role Id---</option>
                  {this.state.list &&
                    this.state.list.map((ele) => {
                      return <option value={ele.id}>{ele.roleId}</option>;
                    })
                  }
                </select>
                {/* <input
                  className="form-control mt-1"
                  name="roleId"
                  type={"text"}
                  value={this.state.roleId}
                  onChange={(event) =>
                    this.setState({ roleId: event.target.value })
                  }
                  placeholder="Enter RoleId"
                  required
                /> */}
                <p style={{ color: "red" }}>{this.state.inputError.roleId}</p>
              </div>
              <br></br>
              <div>
                <Button type="button" onClick={(event) => this.save(event)}>
                  {this.props.params.pid ? "Update" : "Save"}
                </Button>
                &nbsp; &nbsp;
                <Button
                  type="reset"
                  variant="danger"
                  onClick={(event) => this.resetForm(event)}
                >
                  Reset
                </Button>
              </div>
            </table>
            <br></br>
          </Form>
        </div>
      </>
    );
  }
}
export default withRouter(AddUser);
