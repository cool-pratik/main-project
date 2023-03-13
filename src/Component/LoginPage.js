import React from "react";
import { Form, Button } from "react-bootstrap";
import BaseCtrl from "./BaseCtrl";
import axios from "axios";
import withRouter from "./withRouter";
import DashBoard from "./DashBoard"
import ReactDOM from "react-dom"
import FormMessage from "./FormMessage";
class LoginPage extends BaseCtrl {
  constructor(props) {
    super(props);
    this.state = {
      loginId: "",
      password: "",
      message: "",
      error: "",
      list: [],
      form: {
        loginId: "",
        password: "",
        message: "",
        error: "",
      },
      inputError: {
        loginId: "",
        password: "",
        message: "",
        error: "",
      },
      catch:{
        message: "",
      }
    };
  }
  signIn() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Auth/login", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
        if (res.data.result.inputerror) {
          this.setState({ inputError: res.data.result.inputerror });
          this.changeInputError("error", "true");
    
        }
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("Name", res.data.result.data.name);
          return ReactDOM.render(
            <React.StrictMode>
              <DashBoard />
            </React.StrictMode>,
            document.getElementById("root")
          );
          // window.location.pathname = "/Dashboard";
        }
        else {
          this.changeInputError("error","true")
          this.changeInputError("message", "Invalid user or Password");
        }
      }).catch((error) => {
        console.log(error.message);
        if(error) {
          this.setState({ error: error.message});
        }
        
      });
    
  }
  resetForm = () => {
    this.setState({
      loginId: "",
      password: "",
      error: "",
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

  render() {
    return (
      <>
        <div align="center" className="Auth-form-container">
          <h2 align="center">LogIn</h2>
          <Form className="Auth-form-login">
            <table className="Auth-form-content">
              <div>
                <FormMessage
                  error={this.getInputError("error")}
                  message={this.getInputError("message")}
                />
                {/* direct print error */}
               <h2 style={{color:"red"}}> {this.state.inputError.message}</h2>
               <h2 style={{color:"red"}}> {this.state.error}</h2>
              </div>
              <div className="form-group mt-3">
                <label>LoginId</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter Login Id"
                  onChange={(event) =>
                    this.setState({ loginId: event.target.value })
                  }
                  value={this.state.loginId}
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.loginId}</p>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter Password"
                  type={"password"}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.password}</p>
              </div>

              <div className="form-group mt-3">
                <Button
                  type="button"
                  onClick={() => this.signIn()}
                  // disabled={!this.state.agree}
                >
                  SignIn
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
export default withRouter(LoginPage);
