import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Start from "./components/Start/App";
import Notes from "./components/Notes/App";
import ProtectedRoute from "./components/ProtectedRoute";


ReactDOM.render(
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Start />} />
                <Route path="/notes" element={
                    <ProtectedRoute>
                        <Notes  />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    </>
    ,
    document.getElementById("root")
);

