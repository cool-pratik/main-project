import React from "react";
import { Form, Button } from "react-bootstrap";
import BaseCtrl from "./BaseCtrl";
import axios from "axios";
import withRouter from "./withRouter";
import FormMessage from "./FormMessage";
class AddCollege extends BaseCtrl {
  constructor(porps) {
    super(porps);
    this.state = {
      id: "",
      name: "",
      address: "",
      phoneNo: "",
      city: "",
      state: "",
      message: "",
      error:"",
      list:[],
      inputError: {
        id:'',
        name:'',
        address:'',
        phoneNo:'',
        city:'',
        state:'',
        message: '',
        error: ''
      },
    };
    if (this.props.params.pid) {
      this.get();
    }
  }
  resetForm() {
    this.setState({
      id: "",
      name: "",
      address: "",
      phoneNo: "",
      city: "",
      state: "",
      message: "",
      inputError: {
        address: "",
        city: "",
        name: "",
        state: "",
        phoneNo: "",
      },
    });
  }
  get() {
    let id = this.props.params.pid;
    axios
      .get("http://api.sunilos.com:9080/ORSP10/College/get/" + id)
      .then((res) => {
        this.setState({
          id: res.data.result.data.id,
          name: res.data.result.data.name,
          address: res.data.result.data.address,
          phoneNo: res.data.result.data.phoneNo,
          city: res.data.result.data.city,
          state: res.data.result.data.state,
        });
      });
  }
  componentDidMount(){
    axios
      .post("http://api.sunilos.com:9080/ORSP10/College/search", this.state)
      .then((res) => {
        this.setState({ list: res.data.result.data });
        // console.log(res.data.result.data.address);
      });
  }
  save() {
    axios
      .post("http://api.sunilos.com:9080/ORSP10/College/save", this.state)
      .then((res) => {
        console.log(res.data);
        this.setState({list:res.data.result.data});
        if (res.data.result.inputerror) {
          this.setState({ inputError: res.data.result.inputerror });
          this.changeInputError("error","true")
        }
        else {
          this.changeInputError("error","false")
          this.changeInputError("message","Data Saved Succesfully")
          this.changeInputError("id","")
          this.changeInputError("name","")
          this.changeInputError("address","")
          this.changeInputError("phoneNo","")
          this.changeInputError("city","")
          this.changeInputError("state","")
        }
        this.get()
      });
  }
  render() {
    return (
      <>
        <div align="center" className="Auth-registration-container">
          <Form className="Auth-form-login">
            <h2 align="center">
              {this.props.params.pid ? "Update College" : "Add College "}
            </h2>
                <div> <FormMessage error={this.getInputError("error")} message={this.getInputError("message")}/> </div>
            <table className="Auth-form-content">
              <div className="form-group mt-3">
                <label>CollegeName</label>
                <input
                  className="form-control mt-1"
                  name="Name"
                  type="text"
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  value={this.state.name}
                  placeholder="Enter Name"
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.name}</p>
              </div>

              <div>
                <label>Address</label>
                <input
                  className="form-control mt-1"
                  name=""
                  type={"text"}
                  value={this.state.address}
                  placeholder="Enter Address"
                  onChange={(event) =>
                    this.setState({ address: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.address}</p>
              </div>
              <div className="form-group mt-3">
                <label>Phone No.</label>
                <input
                  className="form-control mt-1"
                  name=""
                  type={"text"}
                  value={this.state.phoneNo}
                  placeholder="Enter Phone No."
                  onChange={(event) =>
                    this.setState({ phoneNo: event.target.value })
                  }
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.phoneNo}</p>
              </div>
              <div></div>
              <div className="form-group mt-3">
                <label> City</label>

                <input
                  className="form-control mt-1"
                  name="password"
                  type={"text"}
                  value={this.state.city}
                  onChange={(event) =>
                    this.setState({ city: event.target.value })
                  }
                  placeholder="Enter City"
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.city}</p>
              </div>
              <div className="form-group mt-3">
                <label> State</label>
                <input
                  className="form-control mt-1"
                  name="state"
                  type={"text"}
                  value={this.state.state}
                  onChange={(event) =>
                    this.setState({ state: event.target.value })
                  }
                  placeholder="Enter state"
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.state}</p>
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
export default withRouter(AddCollege);
