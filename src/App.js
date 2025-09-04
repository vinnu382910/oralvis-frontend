// src/App.js
import React, { useContext } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TechnicianUpload from "./pages/TechnicianUpload";
import DentistViewer from "./pages/DentistViewer";

const App = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <h2 style={{ margin: 0 }}>OralVis Healthcare</h2>
          <Link to="/" style={{ color: "white", textDecoration: "none", marginLeft: 12 }}>
            Home
          </Link>
        </div>

        <div>
          {auth ? (
            <>
              <span style={{ marginRight: 12 }}>
                {auth.user?.name} ({auth.user?.role})
              </span>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link" style={{ marginRight: 8 }}>
                Login
              </Link>
              <Link to="/register" className="btn-link">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <main>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/upload" role="technician" component={TechnicianUpload} />
          <PrivateRoute exact path="/scans" role="dentist" component={DentistViewer} />
          <Route exact path="/">
            {auth ? (
              auth.user?.role === "technician" ? (
                <Redirect to="/upload" />
              ) : (
                <Redirect to="/scans" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="*">
            <div style={{ padding: 20, textAlign: "center" }}>
              <h3>404 - Not Found</h3>
              <Link to="/">Go Home</Link>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

function PrivateRoute({ component: Component, role, ...rest }) {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth && auth.user && (!role || auth.user.role === role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default App;
