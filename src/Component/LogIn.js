import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import { event } from "jquery";
// import App from "../App.css";
// import ReactDOM from "react-dom";
// import DashBoard from "./DashBoard";
import axios from "axios";
// import { post } from "jquery";
// import AddUsers from "./AddUsers";
// import BaseCtrl from "./BaseCtrl";
// import FormMessage from "./FormMessage";
import withRouter from "./withRouter";
 class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputError: {
        loginId: "",
        password: "",
        message: "",
        error: "",
      },
      form: {
        loginId: "",
        password: "",
      },
    };
  }
  resetForm = () => {
    this.setState({
      inputError: {
        loginId: "",
        password: "",
        message: "",
        error: "",
      },
      form: {
        loginId: "",
        password: "",
      },
    });
  };
  changeInputError = (name, value) => {
    var data = this.state["inputError"];
    data[name] = value;
    this.setState(data);
  };
  changeFormState(event) {
    let data = this.state["form"];
    data[event.target.name] = event.target.value;
    // let name = event.target.name;
    // let value = event.target.value;
    this.setState(data);
  }
  signIn() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Auth/login", this.state.form)
      .then((res) => {
        this.setState({inputError: res.data.result.inputerror})
        console.log(res.data);
        if(res.data.success){
          localStorage.setItem("Name", res.data.result.data.name);
          // window.location.pathname="/DashBoard"
        }     
      });
  }
  render() {
    return (
      <>
        <div align="center" className="Auth-form-container">
          <Form className="Auth-form-loginpage">
            <table className="Auth-form-content">
              <h2 align="center">Login</h2>
              {/* <div>
                {" "}
                <FormMessage
                  error={this.getInputError("error")}
                  message={this.getInputError("message")}
                />{" "}
              </div> */}
              <div className="form-group mt-3">
                <label>LoginId</label>
                <input
                  className="form-control mt-1"
                  name="loginId"
                  value={this.state.form.loginId}
                  placeholder="Enter User ID"
                  onChange={(event) => this.changeFormState(event)}
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.loginId}</p>
              </div>

              <div>
                <h6 class="errormessage">{this.state.inputError.loginId}</h6>
              </div>
              <div className="form-group mt-3">
                <label> Password </label>
                <input
                  className="form-control mt-1"
                  name="password"
                  type={"password"}
                  value={this.state.form.password}
                  onChange={(event) => this.changeFormState(event)}
                  placeholder="Enter Password"
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.password}</p>
              </div>
              {/* <h6 class="errormessage">{this.state.inputError.password}</h6> */}
              <br></br>
              <div>
                <Button type="button" onClick={() => this.signIn()}>
                  Signin
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
export default withRouter(LogIn)