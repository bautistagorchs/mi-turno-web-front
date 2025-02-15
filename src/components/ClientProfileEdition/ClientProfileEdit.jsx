import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";
import "../ClientProfileEdition/ClientProfileEdit.scss";
import { deleteIcon } from "../../assets/icons";
import { logout } from "../../state/user";
import { useNavigate } from "react-router";
import { PopupConfirm } from "../../commons/PopupConfirm";

export default function ClientProfileEdit() {
  //=============popup confirm================
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [estadoSubmit, setEstadoSubmit] = useState("none");

  const manejarCambio = (nuevoEstado) => {
    setEstadoSubmit(nuevoEstado);
  };

  const handleConditionDelete = (e) => {
    e.preventDefault();
    setShowPopUpConfirm(true);
  };
  //==========================================
  const userRedux = useSelector((state) => state.user);
  const email = userRedux.email;
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPswd, setConfirmPswd] = useState("");
  const [focus, setFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
    validation: false,
  });

  const handleToggleFocus = () => {
    setFocus(!focus);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };
  useEffect(() => {
    if (email) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}:3001/api/users/edit/profile/${email}`
        )
        .then((res) => {
          setUser({
            fullname: res.data.fullname,
            email: res.data.email,
            DNI: res.data.DNI,
            userId: res.data.id,
            telephone: res.data.telephone,
            password: user.password,
          });
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    fullname: user.fullname,
    email: user.email,
    DNI: user.DNI,
    telephone: user.telephone,
    password: user.password,
    newPassword: "",
    newPasswordConfirm: "",
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  }
  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setData({ ...data, password: newValue });
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
      validation:
        /[A-ZÑ]/.test(newValue) &&
        /[a-zñ]/.test(newValue) &&
        /\d/.test(newValue) &&
        newValue.length >= 8,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (data.newPassword && !checklist.validation) {
      toast.error("PASSWORD ERROR", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (data.newPassword !== data.newPasswordConfirm) {
      toast.error("LAS CONTRASEÑAS NO COINCIDEN", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const info = {
      password: data.password,
    };
    const toPut = { email: user.email, ...info };
    for (const key in info) {
      if (info[key] && info[key] !== user[key]) {
        toPut[key] = info[key];
      } else {
        toPut[key] = user[key];
      }
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}:3001/api/users/edit/profile`, {
        ...toPut,
      })
      .then(() => {
        toast.success("TU PERFIL FUE ACTUALIZADO", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.error("ERROR EN PEDIDO AXIOS", err));
  }
  const handleDeleteUser = (e) => {
    if (e) e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}:3001/api/users/delete`, {
        email: email,
      })
      .then((resp) => {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(logout());
        navigate("/");
      });
  };

  //=====================
  useEffect(() => {
    if (estadoSubmit === "accepted") {
      setEstadoSubmit("none");
      setShowPopUpConfirm(false);
      handleDeleteUser();
    } else {
      setEstadoSubmit("none");
      setShowPopUpConfirm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estadoSubmit]);

  //=====================
  return (
    <>
      {showPopUpConfirm && (
        <PopupConfirm
          onChange={manejarCambio}
          message={
            "<h2>¿Está seguro que quiere eliminar su cuenta?</h2><br/>Toda su información y reservas creadas serán removidas permanentemente"
          }
        />
      )}
      <div className="client-page">
        <div className="client-container">
          <div className="client-form">
            <div className="client-form-title">
              <h1 className="h1-form-client">Mis datos </h1>{" "}
              <button
                onClick={handleConditionDelete}
                className="btn-deleteUser"
              >
                {deleteIcon}
              </button>
            </div>

            <div className="inputs-div-container">
              <div className="single-input-container">
                <p className="p-form-client">Nombre</p>
                <input
                  name="fullname"
                  defaultValue={user.fullname}
                  className="inputOperator"
                  type="text"
                  onChange={handleChanges}
                />
              </div>
              <div className="single-input-container">
                <p className="p-form-client">Correo electrónico</p>
                <input
                  name="email"
                  defaultValue={user.email}
                  className="inputOperator"
                  type="email"
                  readOnly
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  flex: 1,
                  marginRight: "10px",
                }}
              >
                <p className="p-form-client">DNI</p>

                <input
                  style={{ width: "100%" }}
                  name="DNI"
                  defaultValue={user.DNI}
                  className="inputLogin"
                  type="text"
                  maxLength="8"
                  pattern="[0-9]{7,8}"
                  onChange={handleChanges}
                />
              </div>
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <p className="p-form-client">Telefono</p>
                <input
                  style={{ width: "96.5%" }}
                  name="telephone"
                  defaultValue={user.telephone}
                  className="inputLogin"
                  type="text"
                  onChange={handleChanges}
                />
              </div>
            </div>

            {disabled ? (
              <div className="inputs-div-container-password">
                <div className="single-input-container special-password">
                  <p className="p-form-client">Contraseña</p>
                  <input
                    disabled={disabled}
                    name="password"
                    defaultValue="*******"
                    className="inputPassword"
                    type="text"
                    onChange={handleChanges}
                  />
                </div>
                <h4 className="h4-form-edit" onClick={handleEditPasswordClick}>
                  Editar contraseña
                </h4>
              </div>
            ) : (
              <PasswordAndValidations
                value={data.password}
                handleInputConfirmPswd={handleInputConfirmPswd}
                handleInputPassword={handleInputPassword}
                handleToggleFocus={handleToggleFocus}
                handleTogglePassword={handleTogglePassword}
                handleToggleConfirmPassword={handleToggleConfirmPassword}
                confirmPswd={confirmPswd}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                checklist={checklist}
                focus={focus}
              />
            )}
            <button className="login-button" onClick={handleSubmit}>
              Aceptar
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
