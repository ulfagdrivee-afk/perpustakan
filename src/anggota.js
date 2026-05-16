import { Component } from "react";
import axios from "axios";
import "./App.css";

class Anggota extends Component {
 state = {
  data: [],
  nama: "",
  alamat: "",
  telepon: "",
  editId: null,
  showForm: false, 
  errors: {},
};

  componentDidMount() {
    this.getData();
  }

  // 🔥 READ
  getData = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:8000/api/anggota",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data.anggota });
  };

  // 🔥 HANDLE INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 CREATE & UPDATE
 handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const { nama, alamat, telepon, editId } = this.state;

  try {
    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/anggota/${editId}`,
        { nama, alamat, telepon },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Update Anggota Successful");

    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/anggota",
        { nama, alamat, telepon },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Create Anggota Successful");
    }

    this.setState({
      nama: "",
      alamat: "",
      telepon: "",
      editId: null,
      showForm: false,
      errors: {},
    });

    this.getData();

  } catch (err) {
    console.log(err.response.data);

    this.setState({
      errors: err.response?.data?.errors || {},
    });
  }
};

  // 🔥 EDIT (ISI FORM)
  handleEdit = (item) => {
    this.setState({
      nama: item.nama,
      alamat: item.alamat,
      telepon: item.telepon,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
  };

  handleDelete = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/anggota/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ⚡ langsung hapus dari state (tanpa reload API)
    this.setState({
      data: this.state.data.filter((item) => item.id !== id),
    });

  } catch (err) {
    console.log(err);
  }
};

 render() {

  return (
    <div className="content">

      {/* BUTTON TAMBAH */}
      <button
        className="add-btn"
        onClick={() => this.setState({ showForm: true })}
      >
        + Tambah Data
      </button>

      {/* FORM */}
      {this.state.showForm && (
        <form onSubmit={this.handleSubmit}>

          <input
            name="nama"
            placeholder="Nama"
            value={this.state.nama}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.nama && (
            <p className="error">
              {this.state.errors.nama[0]}
            </p>
          )}

          <input
            name="alamat"
            placeholder="Alamat"
            value={this.state.alamat}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.alamat && (
            <p className="error">
              {this.state.errors.alamat[0]}
            </p>
          )}

          <input
            name="telepon"
            placeholder="Telepon"
            value={this.state.telepon}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.telepon && (
            <p className="error">
              {this.state.errors.telepon[0]}
            </p>
          )}

          <div className="button-group">

            <button className="submit-btn">
              {this.state.editId ? "Update" : "Simpan"}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() =>
                this.setState({
                  showForm: false,
                  nama: "",
                  alamat: "",
                  telepon: "",
                  editId: null,
                })
              }
            >
              Batal
            </button>

          </div>

        </form>
      )}

      {/* TABLE */}
      <div className="table-container">
        <table>

          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.alamat}</td>
                <td>{item.telepon}</td>

                <td>

                  <button
                    className="action-btn edit"
                    onClick={() => this.handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    Hapus
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
}
export default Anggota;