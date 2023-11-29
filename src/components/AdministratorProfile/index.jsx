import "./index.scss";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";
const AdministratorProfile = function () {
  const date = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { dni, email, fullname } = date;
  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const info = {
      fullname: e.target.name.value,
      email: e.target.email.value,
    };
    axios
      .put("http://localhost:3001/api/users/edit/profile", info)
      .then((resp) => {
        const payload = {
          fullname: resp.data.fullname,
          email: resp.data.email,
          dni: resp.data.DNI,
          telephone: null,
        };
        dispatch(login(payload));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bodyContent">
      <form
        action=""
        className="contentPerfilAdm"
        onSubmit={handleUpdateProfile}
      >
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre" defaultValue={fullname} />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            readOnly
          />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="dni">DNI</label>
          <input type="text" name="Dni" id="dni" defaultValue={dni} readOnly />
        </div>
        <div style={{ width: "92%" }} className="inputs-div-container">
          <div className="single-input-container special-password">
            <p className="p-form-client">Contraseña</p>
            <input
              name="password"
              readOnly
              className="input"
              type="password"
              defaultValue={"Default123"}
            />
          </div>
          <h4 className="h4-form-edit" onClick={handleEditPasswordClick}>
            Editar contraseña
          </h4>
        </div>
        <div>
          <button className="perfilBtn">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default AdministratorProfile;
