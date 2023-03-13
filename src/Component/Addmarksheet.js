import React from "react";
import { Form, Button } from "react-bootstrap";
import withRouter from "./withRouter";
import axios from "axios";
import BaseCtrl from "./BaseCtrl";
import FormMessage from "./FormMessage";
class Addmarksheet extends BaseCtrl {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      rollNo: "",
      name: "",
      physics: "",
      chemistry: "",
      maths: "",
      studentId: "",
      message: "",
      error: "",
      inputError: {
        id: "",
        rollNo: "",
        name: "",
        physics: "",
        chemistry: "",
        maths: "",
        studentId: "",
        message: "",
        error: "",
      },
      list: [],
    };
    if (this.props.params.pid) {
      this.get();
    }
  }
  get() {
    let id = this.props.params.pid;
    axios
      .get("http://api.sunilos.com:9080/ORSP10/Marksheet/get/" + id)
      .then((res) => {
        this.setState({
          id: res.data.result.data.id,
          rollNo: res.data.result.data.rollNo,
          name: res.data.result.data.name,
          physics: res.data.result.data.physics,
          chemistry: res.data.result.data.chemistry,
          maths: res.data.result.data.maths,
          studentId: res.data.result.data.studentId,
        });
      });
  }
  componentDidMount(){
    axios.post('http://api.sunilos.com:9080/ORSP10/Marksheet/search', this.state).then((res) => {
      this.setState({ list: res.data.result.data });
  });
  }
  Add(event) {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/Marksheet/save", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
        this.get();
        if (res.data.result.inputerror) {
          this.setState({ inputError: res.data.result.inputerror });
          this.changeInputError("error", "true");
        } else {
          this.changeInputError("error", "false");
          this.changeInputError("message", "Data saved Successfully");
          this.changeInputError("id", "");
          this.changeInputError("rollNo", "");
          this.changeInputError("name", "");
          this.changeInputError("physics", "");
          this.changeInputError("chemistry", "");
          this.changeInputError("maths", "");
          this.changeInputError("studentId", "");
        }
        // event.preventDefault()
      });
  }
  resetForm = () => {
    this.setState({
        id: "",
        rollNo: "",
        name: "",
        physics: "",
        chemistry: "",
        maths: "",
        studentId: "",
        message: "",
        error: "",
        inputError: {
          id: "",
          rollNo: "",
          name: "",
          physics: "",
          chemistry: "",
          maths: "",
          studentId: "",
          message: "",
          error: "",
        },
      
    });
  };
  render() {
    return (
      <>
        <div align="center" className="Auth-form-container">
          <Form className="Auth-form-login">
              <h2 align="center">
                {this.props.params.pid ? "UPDATE MARKSHEET" : "ADD MARKSHEET"}
              </h2>
            <table className="Auth-form-content">
              <div>
                <FormMessage
                  error={this.getInputError("error")}
                  message={this.getInputError("message")}
                />
              </div>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  className="form-control mt-1"
                  value={this.state.name}
                  placeholder="Enter Name"
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.rollNo}</p>
              </div>
              <div className="form-group mt-3">
                <label>Roll No.</label>
                <input
                  className="form-control mt-1"
                  value={this.state.rollNo}
                  placeholder="Enter roll No."
                  onChange={(event) =>
                    this.setState({ rollNo: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.rollNo}</p>
              </div>
              <div className="form-group mt-3">
                <label>Physics</label>
                <input
                  className="form-control mt-1"
                  name="Role"
                  value={this.state.physics}
                  placeholder="Enter Marks"
                  onChange={(event) =>
                    this.setState({ physics: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.physics}</p>
              </div>
              <div className="form-group mt-3">
                <label>Chemistry</label>
                <input
                  className="form-control mt-1"
                  name="Role"
                  value={this.state.chemistry}
                  placeholder="Enter Marks"
                  onChange={(event) =>
                    this.setState({ chemistry: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>
                  {this.state.inputError.chemistry}
                </p>
              </div>
              <div className="form-group mt-3">
                <label>Maths</label>
                <input
                  className="form-control mt-1"
                  name="Role"
                  value={this.state.maths}
                  placeholder="Enter Marks"
                  onChange={(event) =>
                    this.setState({ maths: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.maths}</p>
                <div className="form-group mt-3">
                  <label>Student Id</label>
                  <input
                    className="form-control mt-1"
                    name="Role"
                    value={this.state.studentId}
                    placeholder="Enter StudentId"
                    onChange={(event) =>
                      this.setState({ studentId: event.target.value })
                    }
                    required
                  />
                  <p style={{ color: "red" }}>
                    {this.state.inputError.studentId}
                  </p>
                </div>
              </div>
              <div className="form-group mt-3">
                <Button
                  type="button"
                  onClick={(event) => this.Add(event)}
                  // disabled={!this.state.agree}
                >
                  {this.props.params.pid ? "Update Marksheet" : "Add Marksheet"}
                </Button>
                &nbsp; &nbsp;
                <Button
                  type="reset"
                  variant="danger"
                  onClick={() => this.resetForm()}
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
export default withRouter(Addmarksheet);
