import { Component } from "react";
import axios from "axios";
import "./App.css";

class Buku extends Component {
 state = {
  data: [],
  judul: "",
  pengarang: "",
  penerbit: "",
  tahun_terbit: "",
  stok: "",
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
      "http://127.0.0.1:8000/api/buku",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    this.setState({ data: res.data.data.buku });
  };

  // 🔥 HANDLE INPUT
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // 🔥 CREATE & UPDATE
 handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const { judul, pengarang, penerbit, tahun_terbit, stok, editId } = this.state;

  try {
    if (editId) {
      await axios.put(
        `http://127.0.0.1:8000/api/buku/${editId}`,
        { judul, pengarang, penerbit, tahun_terbit, stok },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Update Buku Successful");

    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/buku",
        { judul, pengarang, penerbit, tahun_terbit, stok },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Create Buku Successful");
    }

    this.setState({
      judul: "",
      pengarang: "",
      penerbit: "",
      tahun_terbit: "",
      stok: "",
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
      judul: item.judul,
      pengarang: item.pengarang,
      penerbit: item.penerbit,
      tahun_terbit: item.tahun_terbit,
      stok: item.stok,
      editId: item.id,
       showForm: true,
    errors: {}, 
    });
  };

  handleDelete = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(
      `http://127.0.0.1:8000/api/buku/${id}`,
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
            name="judul"
            placeholder="Judul"
            value={this.state.judul}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.judul && (
            <p className="error">
              {this.state.errors.judul[0]}
            </p>
          )}

          <input
            name="pengarang"
            placeholder="Pengarang"
            value={this.state.pengarang}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.pengarang && (
            <p className="error">
              {this.state.errors.pengarang[0]}
            </p>
          )}

          <input
            name="penerbit"
            placeholder="Penerbit"
            value={this.state.penerbit}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.penerbit && (
            <p className="error">
              {this.state.errors.penerbit[0]}
            </p>
          )}

          <input
            name="tahun_terbit"
            placeholder="Tahun Terbit"
            value={this.state.tahun_terbit}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.tahun_terbit && (
            <p className="error">
              {this.state.errors.tahun_terbit[0]}
            </p>
          )}

          <input
            name="stok"
            placeholder="Stok"
            value={this.state.stok}
            onChange={this.handleChange}
            className="input"
          />

          {this.state.errors.stok && (
            <p className="error">
              {this.state.errors.stok[0]}
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
                  judul: "",
                  pengarang: "",
                  penerbit: "",
                  tahun_terbit: "",
                  stok: "",
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
              <th>Judul</th>
              <th>Pengarang</th>
              <th>Penerbit</th>
              <th>Tahun Terbit</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((item, index) => (
              <tr key={item.id}>

                <td>{index + 1}</td>
                <td>{item.judul}</td>
                <td>{item.pengarang}</td>
                <td>{item.penerbit}</td>
                <td>{item.tahun_terbit}</td>
                <td>{item.stok}</td>

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
export default Buku;