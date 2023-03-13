import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import withRouter from "./withRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseCtrl from "./BaseCtrl";
import FormMessage from "./FormMessage";
// import { event } from "jquery";
// import App from "../App.css";
class AddStudent extends BaseCtrl {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      collageId: "",
      mobileNo: "",
      email: "",
      list: [],
      inputError: {
        firstName: "",
      lastName: "",
      collageId: "",
      mobileNo: "",
      email: "",
      },
      // this.resetForm();
    };
    if (this.props.params.pid) {
      this.get();
    }
    this.resetForm();
  }
  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      collegeId: "",
      mobileNo: "",
      email: "",
      inputError: {
        firstName: "",
      lastName: "",
      collageId: "",
      mobileNo: "",
      email: "",
      },
    });
  };
  get() {
    axios
      .get("http://api.sunilos.com:9080/ORSP10/Student/get/" + this.props.params.pid)
      .then((res) => {
        this.setState({
          firstName: res.data.result.data.firstName,
          lastName: res.data.result.data.lastName,
          collegeId: res.data.result.data.collegeId,
          mobileNo: res.data.result.data.mobileNo,
          email: res.data.result.data.email,
        });
      });
  }
  componentDidMount(){
    axios
    .post("http://api.sunilos.com:9080/ORSP10/Student/search", this.state)
    .then((res) => {
      this.setState({ list: res.data.result.data });
    });
  }
  save() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Student/save", this.state)
      .then((res) => {
       this.setState({list: res.data.result.data});
       if(res.data.result.inputerror) {
         this.setState({inputError: res.data.result.inputerror});
         this.changeInputError("error", "true");
        }
    else{
        this.changeInputError("error", "false")
        this.changeInputError("message", "Data Saved Successfully")
        this.changeInputError("id", "")
        this.changeInputError("firstName", "")
        this.changeInputError("lastName", "")
        this.changeInputError("collegeId", "")
        this.changeInputError("mobileNo", "")
        this.changeInputError("email", "")
      }
      this.get()
      });
  }
  render() {
    return (
      <>
        <>
          <div align="center" className="Auth-form-container">
            <Form className="Auth-form-login">
              <table className="Auth-form-content">
                <h2 align="center">
                  {this.props.params.pid ? "UPDATE STUDENT" : "ADD STUDENT"}
                </h2>
                <div>
                <FormMessage
                  error={this.getInputError("error")}
                  message={this.getInputError("message")}
                />
              </div>
                <div style={{ color: "red" }}>{this.state.data}</div>
                <div>
                  <input
                    className="form-control mt-1"
                    type="number"
                    name="id"
                    onChange={(event) =>
                      this.setState({ id: event.target.value })
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
                  <p style={{color:"red"}}>{this.state.inputError.firstName}</p>
                  <label>LastName</label>
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
                    <p style={{color:"red"}}>{this.state.inputError.lastName}</p>
                </div>
                <div className="form-group mt-3">
                  <label>Collage Id</label>
                  <input
                    className="form-control mt-1"
                    name="DOB"
                    type={"text"}
                    value={this.state.collegeId}
                    placeholder="Enter Collage"
                    onChange={(event) =>
                      this.setState({ collegeId: event.target.value })
                    }
                    required
                  />
                    <p style={{color:"red"}}>{this.state.inputError.collageId}</p>
                </div>
                <div className="form-group mt-3">
                  <label>Email Id</label>
                  <input
                    className="form-control mt-1"
                    name="email"
                    value={this.state.email}
                    placeholder="Enter Email Id"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    required
                  />
                    <p style={{color:"red"}}>{this.state.inputError.email}</p>

                </div>
                <div></div>
                <div className="form-group mt-3">
                  <label> Mobile No </label>

                  <input
                    className="form-control mt-1"
                    name="password"
                    type={"text"}
                    value={this.state.mobileNo}
                    onChange={(event) =>
                      this.setState({ mobileNo: event.target.value })
                    }
                    placeholder="Enter Mobile No."
                    required
                  />
                    <p style={{color:"red"}}>{this.state.inputError.mobileNo}</p>

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
      </>
    );
  }
}
export default withRouter(AddStudent);
