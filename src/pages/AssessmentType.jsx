import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import ROUTE_MAP from "../services/routing/routeMap";

const AssessmentType = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout back={ROUTE_MAP.medical_assessments}>
      <div className="flex flex-col px-5 py-8 items-center">
        <p className="text-secondary text-[28px] font-bold mt-4 lg:text-[45px] animate__animated animate__fadeIn">
          Select Form
        </p>
        <Button text="Test Form" styles="lg:w-[70%] animate__animated animate__fadeInDown" onClick={() => { navigator.onLine ? navigate(ROUTE_MAP.otherforms_param_formName + "hospital_clinical_facilities") : navigate(ROUTE_MAP.offline_odk_form + "hospital_clinical_facilities") }} />
      </div>
    </CommonLayout>
  );
};

export default AssessmentType;
