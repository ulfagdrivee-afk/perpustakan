import { Component } from "react";
import {Link, Outlet} from "react-router-dom";
import "./App.css";

class Home extends Component{
  componentDidMount() {
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href="/login";
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href="/login";
  }

  render() {
    return(
      <div>
        <div className="navbar">
          <h3 className="logo">Tabungan digital</h3>
          <div className="nav-links">
            <Link to="anggota">Anggota</Link>
            {/* <Link to="currencies">Mata Uang</Link>
            <Link to="categories">Categories</Link>
            <Link to="wallets">Dompet</Link>
            <Link to="transactions">Transaksi</Link> */}
          </div>
          <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="content">
          <Outlet/>
        </div>
      </div>
    )
  }
}
export default Home;