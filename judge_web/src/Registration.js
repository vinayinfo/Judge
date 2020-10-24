// export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserSession, getUserSession } from './Utils/Common';

// export default Login;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      setLoading: false,
      user_types: {},
      errors: {
        username: '',
        password: '',
        non_field_errors: ''
      }
    }
    this.LoadUserType();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  LoadUserType() {
    let user_types = getUserSession('user_type')
    if(!user_types){
      axios.get('http://localhost:8000/profile/get_user_type/').then(response => {
        setUserSession({'user_type': response.data});
        this.state.user_types = response.data;
      });
    } else {
        this.state.user_types = user_types;
    }
  }

  handleChange(event) {
    const target = event.target;
    console.log(target.name)
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let errors = this.state.errors
    Object.keys(errors).forEach((item, i) => {
      errors[item] = '';
    });
    this.setState({setError:null});
    this.setState({setLoading:true});
    axios.post('http://localhost:8000/api-token-auth/',
          { username: this.state.username, password: this.state.password },
          {headers: {'Content-Type': 'application/json'}}
      ).then(response => {
      this.setState({setLoading:false});
      setUserSession(response.data.token, response.data.user);
      this.props.history.push('/dashboard');
    }).catch(error => {
      this.setState({setLoading:false});
      if (error.response.status !== 200){
        let obj = this.state
        Object.keys(error.response.data).forEach((item, i) => {
          obj.errors[item] = error.response.data[item];
        });
        this.setState(obj);
      }
    });
  }

  render() {
    return (
      <div className="form">
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col mb-4">
          <div className="card">
            <div className="card-body">
              <div className="welcome">
                <h1>welcome</h1>
                <p>expect <b>more</b></p>
                <p>expect <b>performance.</b></p>
                <p>expect <b>results.</b></p>
              </div>
              <div className="content">
                <p>on-demand cources and bite-siezed videos to fit your schedule.</p>
              </div>
              <div className="button">
                <a className="btn btn-warning" href="#">schedule a Demo</a>
                <a className="btn btn-outline-warning" href="#">Lean more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-4">
          <div className="card Reg_form">
            <div className="card-body">
            <h2>Create Account</h2>
            <hr/>
              <form onSubmit={this.handleSubmit} method="post">
                  <div className="form-group">
                    <select className="custom-select">
                    <option value="">Registring as</option>
                      {
                        this.state.user_types.map((option) => (
                          <option value={option.id}>{option.type}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" name="first_name" placeholder="First Name" required="required" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" name="organisation" placeholder="Organisation" required="required" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="tel" className="form-control" name="phone" placeholder="Phone" required="required" />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-warning">Next</button>
                  </div>
                </form>
                <div className="text-center">Already have an account?
                    <Link to="/login">Login</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
  }
}
export default RegistrationForm;
