import React, { useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../Header/Header.js";
// import Login from "../Login/Login.js";
// import Register from "../Register/Register.js";
// import GenericNotFound from "../GenericNotFound/GenericNotFound.js";
// import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
// import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./App.css";

function App() {
  const [currentUser, setСurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <main className="content">
            <Main />
          </main>
          <Footer />
        </div>

        <section className="popup-forms">
          {/* <PopupWithForm /> */}

          {/* <InfoTooltip /> */}
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
