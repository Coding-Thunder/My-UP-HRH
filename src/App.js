import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { createContext, useEffect, useRef, useState } from "react";
import MedicalAssessor from "./pages/MedicalAssessor";
import MedicalAssessments from "./pages/MedicalAssessments";
import UpcomingMedicalAssessments from "./pages/UpcomingMedicalAssessments";
import CaptureLocation from "./pages/CaptureLocation";
import ForgotPassword from "./pages/ForgotPassword";
import GenericOdkForm from "./pages/forms/GenericOdkForm";
import ROUTE_MAP from "./services/routing/routeMap";
import Login from "./pages/Login/Login";
import PrivateRoute from "./services/routing/PrivateRoute/PrivateRoute";
import { getCookie } from "./services/utils";
import AssessmentType from "./pages/AssessmentType";
import OfflineOdkForm from "./pages/OfflineOdkForm";

export const StateContext = createContext();

function App() {
  const [state, setState] = useState();
  useEffect(() => {
    const user = getCookie("userData");
  }, []);

  return (
    <div className="App">
      <StateContext.Provider value={{ state, setState }}>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTE_MAP.root}
              element={
                <PrivateRoute>
                  <MedicalAssessor />
                </PrivateRoute>
              }
            />
            <Route path={ROUTE_MAP.login} element={<Login />} />
            {/*to cache start */}
            <Route
              path={ROUTE_MAP.medical_assessments}
              element={
                <PrivateRoute>
                  <MedicalAssessments />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTE_MAP.upcoming_medical_assessments}
              element={
                <PrivateRoute>
                  <UpcomingMedicalAssessments />
                </PrivateRoute>
              }
            />
            {/*to cache  end */}

            <Route
              path={ROUTE_MAP.capture_location}
              element={
                <PrivateRoute>
                  <CaptureLocation />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTE_MAP.forgot_password}
              element={<ForgotPassword />}
            />
            <Route
              path={ROUTE_MAP.assessment_type}
              element={
                <PrivateRoute>
                  <AssessmentType />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTE_MAP.otherforms_param_formName}:formName`}
              element={
                <PrivateRoute>
                  <GenericOdkForm />
                </PrivateRoute>
              }
            />
            <Route
              path={`${ROUTE_MAP.offline_odk_form}:formName`}
              element={
                <PrivateRoute>
                  <OfflineOdkForm />
                </PrivateRoute>
              }
            />
            <Route path={ROUTE_MAP.root_star} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
