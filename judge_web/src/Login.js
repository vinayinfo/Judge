// export default Login;
import React from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

// export default Login;
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
        non_field_errors: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    axios.post('http://localhost:8000/api-token-auth/',
          { username: this.state.username, password: this.state.password },
          {headers: {'Content-Type': 'application/json'}}
      ).then(response => {
      setUserSession({'token' :response.data.token});
      this.props.history.push('/dashboard');
    }).catch(error => {
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
      <div className="login-form">
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-4">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit} method="post">
                  <h5 className="card-title">Login</h5>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={this.handleChange} />
                      <br/>
                      {this.state.errors.username.length > 0 && <span className='error'>{this.state.errors.username}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="password" className="form-control" name="password" placeholder="Password" required="required" onChange={this.handleChange} />
                      {this.state.errors.password.length > 0 && <span className='error'>{this.state.errors.password}</span>}
                    </div>
                  </div>
                  {this.state.errors.non_field_errors.length > 0 && <span className='error'>{this.state.errors.non_field_errors}</span>}
                  <button type="submit" className="btn btn-warning">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default LoginForm;
