import { Component } from "react";
import axios from "axios";
import './App.css';
class Register extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      'name' : form.name.value,
      'email' : form.email.value,
      'password' : form.password.value,
    //   role: form.role.value,
    };
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register", data);
      alert("Register berhasil, silahkan login");
      window.location.href="/login";
    } catch(err) {
       console.log(err);
      alert("Register gagal");
    }
  };

  render() {
    return(
      <div className="auth-container">
        <div className="card">
          <h2 className="title">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Name" className="input"/>
            <input type="email" name="email" placeholder="Email" className="input"/>
            <input type="password" name="password" placeholder="Password" className="input"/>
         
            <button type="submit" className="btn">Register</button>
          </form>
          <p className="link">Sudah Punya Akun <a href="/login">Login</a></p>
          {/* <p className="link">Sudah Punya Akun <a href="/anggota">Anggota</a></p> */}
        </div>
      </div>
    );
  }
}
export default Register;