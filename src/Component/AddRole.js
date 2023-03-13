import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import withRouter from "./withRouter";
import FormMessage from "./FormMessage";
import BaseCtrl from "./BaseCtrl";
class AddRole extends BaseCtrl {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      discription: "",
      errormessage:'',
      list: [],
      inputError: {
        id: "",
        name: "",
        discription: "",
      }
    };
    if (this.props.params.pid) {
      this.get();
    }
  }
  get() {
    let id = this.props.params.pid;
    axios
      .get("http://api.sunilos.com:9080/ORSP10/Role/get/" + id)
      .then((res) => {
        this.setState({
          name: res.data.result.data.name,
          discription: res.data.result.data.discription,
        });
      });
  }
  componentDidMount(){
    axios.post("http://api.sunilos.com:9080/ORSP10/Role/search",this.state).then((res)=>{
      this.setState({list:res.data.result.data});
    })
  }
  Save(event) {
     axios
      .post("http://api.sunilos.com:9080/ORSP10/Role/save", this.state)
      .then((res) => {
        console.log(res.data.result.message);
        this.setState({message : res.data.result.message})
        this.setState({ list: res.data.result.data});
        this.get();
        if (res.data.result.inputerror) {
          this.setState({ inputError: res.data.result.inputerror });
          this.changeInputError("error", "true");
        } else {
          this.changeInputError("error", "false");
          this.changeInputError("message", "Data Saved Successfully");
          this.changeInputError("id", "");
          this.changeInputError("name", "");
          this.changeInputError("discription", "");
        }
        event.preventDefault();
        // this.get()
      });
  }
  resetForm = () => {
    this.setState({
      form: {
        id: "",
        name: "",
        discription: "",
      },
      inputerror: {
        id: "",
        name: "",
        discription: "",
      },
      inputError: "",
    });
  };
  render() {

    return (
      <>
        <div align="center" className="Auth-form-container">
          <Form className="Auth-form-login">
            <table className="Auth-form-content">
              <h2 align="center">
                {this.props.params.pid ? "UPDATE ROLE" : "ADD ROLE"}
              </h2>
              <div>
                <FormMessage
                  error={this.getInputError("error")}
                  message={this.getInputError("message")}
                />
                {/* {this.state.errormessage} */}
              </div>
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter Name"
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  value={this.state.name}
                  required
                />
                <p style={{ color: "red" }}>{this.state.inputError.name}</p>
              </div>
              <div className="form-group mt-3">
                <label>Role</label>
                <input
                  className="form-control mt-1"
                  name="Role"
                  placeholder="Enter discription"
                  onChange={(event) =>
                    this.setState({ discription: event.target.value })
                  }
                  value={this.state.discription}
                  required
                />
                <p style={{ color: "red" }}>
                  {this.state.inputError.discription}
                </p>
              </div>

              <div className="form-group mt-3">
                <Button type="button" onClick={(event) => this.Save(event)}>
                  {this.props.params.pid ? "Update Role" : "Add Role"}
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
export default withRouter(AddRole);
