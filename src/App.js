import { Route, Routes } from "react-router";
import PromotionalMessage from "./commons/promotional-message";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import ReservationPanel from "./components/ReservationPanel/ReservationPanel";
import ReservationConfirmed from "./components/reservationconfirmed/index";
import UserReservationHistory from "./components/UserReservationHistory/index";
import ClientProfileEdit from "./components/ClientProfileEdition/ClientProfileEdit";
import { AdministratorSucursalesList } from "./components/AdministratorSucursalesList";
import { AdministratorOperatorsList } from "./components/AdministratorOperatorsList";
import RecoverPassword from "./components/RecoverPassword";
import CreateOperator from "./components/CreateOperator";
import { CancelReservation } from "./components/CancelReservation";
import { OperatorReservationsList } from "./components/OperatorReservationsList";
import CreateBranches from "./components/CreateBranches";

function App() {
  return (
    <div className="App">
      <PromotionalMessage />
      <Routes>
        <Route path="/client/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/client/register" element={<Register />} />
        <Route path="/client/newReservation" element={<ReservationPanel />} />
        <Route
          path="/client/reservationConfirmed"
          element={<ReservationConfirmed />}
        />
        <Route
          path="/client/reservations"
          element={<UserReservationHistory />}
        />
        <Route path="/client/myAccount" element={<ClientProfileEdit />} />
        <Route
          path="/client/cancelReservation/:reservationId"
          element={<CancelReservation />}
        />
        <Route
          path="/client/editReservation/:reservationId"
          element={<ReservationPanel />}
        />
        <Route
          path="/operator/reservationsList"
          element={<OperatorReservationsList />}
        />

        <Route
          path="/admin/allBranches"
          element={<AdministratorSucursalesList />}
        />
        <Route
          path="/admin/operators"
          element={<AdministratorOperatorsList />}
        />

        <Route
          path="/admin/create-operator"
          element={<CreateOperator />}
        ></Route>
        <Route
          path="/admin/edit-operator/:dni"
          element={<CreateOperator />}
        ></Route>
        <Route
          path="/admin/edit-sucursal/:id"
          element={<CreateBranches />}
        ></Route>

        <Route path="/client/recoverPassword" element={<RecoverPassword />} />
        

      </Routes>
    </div>
  );
}

export default App;
