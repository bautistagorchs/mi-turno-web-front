import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import Popup from "../../commons/Popup";

const CreateBranches = function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const nombre = useInput("");
  const [correoBlocked, setCorreoBlocked] = useState("");
  const correo = useInput("");
  const telefono = useInput(0);
  const maxCap = useInput(0);
  const opTime = useInput("");
  const clTime = useInput("");
  const [message, setMesagge] = useState("Created Successfully");
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    redirect: undefined,
  });
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/branches/info/${id}`)
        .then((res) => {
          nombre.setValue(res.data.name);
          setCorreoBlocked(res.data.email);
          telefono.setValue(res.data.telephone);
          maxCap.setValue(res.data.capacity);
          opTime.setValue(res.data.openingTime);
          clTime.setValue(res.data.closingTime);
          setMesagge("Updated Successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const createdSuccessfully = () => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const errorMessage = () => {
    toast.error("error creating branch!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleCreateBranch = function (e) {
    e.preventDefault();
    const info = {
      name: nombre.value,
      email: id ? correoBlocked : correo.value,
      telephone: telefono.value,
      openingTime: opTime.value,
      closingTime: clTime.value,
      capacity: maxCap.value,
    };
    axios
      .post("http://localhost:3001/api/branches/", info)
      .then(() => {
        // createdSuccessfully();
        setPopupInfo({
          title: id ? `Cambios guardados` : `Sucursal creada con exito`,
          text: id
            ? `Gracias por confiar en nuestro servicio`
            : `No olvide asignarle un operador`,
          img: true,
          redirect: `/admin/allBranches`,
        });
        logicPopUp(".bodyContent", "add", "external-div-container-inactive");
        logicPopUp(
          ".fake-container-popup",
          "remove",
          "fake-container-popup-inactive"
        );
        logicPopUp(
          ".fake-container-popup",
          "add",
          "fake-container-popup-active"
        );
      })
      .catch((error) => {
        errorMessage();
        return error;
      });
  };

  return (
    <>
      <div className="bodyContent">
        <form
          action=""
          className="contentCreateBranches"
          onSubmit={handleCreateBranch}
        >
          <div>
            <h1>{id ? "Editar Sucursal" : "Crear una nueva sucursal"}</h1>
          </div>

          <div className="bloqueUno">
            <label htmlFor="nombre">Nombre</label>
            <input
              className="inputLogin"
              {...nombre}
              type="text"
              name="name"
              id="nombre"
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="bloqueUno">
            <label htmlFor="email">Correo electrónico</label>
            {id ? (
              <input
                style={{
                  backgroundColor: "#E3E3E3",
                  caretColor: "transparent",
                }}
                value={correoBlocked}
                type="email"
                name="email"
                id="email"
                className="inputLogin"
                placeholder="Ingrese su Email"
                readOnly
              />
            ) : (
              <input
                {...correo}
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su Email"
                required
              />
            )}
          </div>

          <div className="fila">
            <div className="itemFila">
              <label htmlFor="telefono">Teléfono</label>
              <input
                className="inputLogin"
                {...telefono}
                type="text"
                name="number"
                id="telefono"
                placeholder="ingrese su numero de Teléfono"
                required
              />
            </div>

            <div className="itemFila itemcierre">
              <label htmlFor="capacidadMaxima">Capacidad máxima</label>
              <input
                {...maxCap}
                type="number"
                name="cupos"
                id="capacidadMaxima"
                className="inputLogin"
                required
              />
            </div>
          </div>

          <div className="horario">
            <div className="itemHorario">
              <label htmlFor="H-inicio">Horario de Inicio</label>
              <select
                //value={opTime.value}
                onChange={opTime.onChange}
                name="horarioDeInicio"
                id="inicio"
                className="select-style inputLogin"
                placeholder="6:00"
                required
              >
                <option disabled selected>
                  seleccione un horario de inicio
                </option>
                <option value="6:00AM" selected={opTime.value === "6:00AM"}>
                  6:00 am
                </option>
                <option value="7:00AM" selected={opTime.value === "7:00AM"}>
                  7:00 am
                </option>
                <option value="8:00AM" selected={opTime.value === "8:00AM"}>
                  8:00 am
                </option>
                <option value="9:00AM" selected={opTime.value === "9:00AM"}>
                  9:00 am
                </option>
              </select>
            </div>

            <div className="itemHorario  itemcierre">
              <label htmlFor="H-Cierre"> Horario de Cierre</label>
              <select
                //value={clTime.value}
                onChange={clTime.onChange}
                name="horarioDeCierre"
                id="H-Cierre"
                className="select-style inputLogin"
                placeholder="16:00"
                required
              >
                <option disabled selected>
                  seleccione un horario de cierre
                </option>
                <option value="4:00PM" selected={clTime.value === "4:00PM"}>
                  4:00 pm
                </option>
                <option value="5:00PM" selected={clTime.value === "5:00PM"}>
                  5:00 pm
                </option>
                <option value="6:00PM" selected={clTime.value === "6:00PM"}>
                  6:00 pm
                </option>
                <option value="7:00PM" selected={clTime.value === "7:00PM"}>
                  7:00 pm
                </option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="sumitBtn">
              {id ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
        {/* <ToastContainer /> */}
      </div>
      <Popup popupInfo={popupInfo} />
    </>
  );
};

export default CreateBranches;
