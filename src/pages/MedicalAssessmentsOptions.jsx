import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import { StateContext } from "../App";
import { getAssessmentStatus, getMedicalAssessments } from "../api";

const MedicalAssessmentsOptions = () => {
  const { state, setState } = useContext(StateContext);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };

  // const getFilledAssessmentStatus = async () => {
  //   setLoading(true);
  //   const res = await getAssessmentStatus();
  //   console.log(res.data);
  //   setState({
  //     ...state, userData: {
  //       ...state?.userData,
  //       nursingFilled: res?.data?.q1?.length ? true : false,
  //       paramedFilled: res?.data?.q2?.length ? true : false
  //     }
  //   })
  //   setLoading(false);
  // }

  const getTodayAssessments = async () => {
    const res = await getMedicalAssessments();
    if (res?.data?.assessment_schedule?.[0]) {
      let ass = res?.data?.assessment_schedule?.[0];
      setState({
        ...state,
        todayAssessment: {
          id: ass.institute.id,
          district: ass.institute.district,
          instituteName: ass.institute.name,
          nursing: ass.institute.nursing,
          paramedical: ass.institute.paramedical,
          gnm: ass.institute.gnm,
          anm: ass.institute.gnm,
          bsc: ass.institute.gnm,
          type: ass.institute.type,
          latitude: ass.institute.latitude,
          longitude: ass.institute.longitude
        }
      });
    }
  };

  useEffect(() => {
    // getFilledArole === "Medical" ssessmentStatus();
    const user = JSON.parse(localStorage.getItem("userData"))?.user
      ?.registrations[0]?.roles[0];
    setRole(() => user);
  }, []);

  useEffect(() => {
    if (!state?.todayAssessment) {
      getTodayAssessments();
    }
  }, [])
  return (
    role && (
      <CommonLayout back="/medical-assessments">
        <div className="flex flex-col px-5 py-8 items-center">
          <img
            src="/assets/forms.png "
            className="h-60 lg:h-80 my-5 lg:mt-[70px]"
            alt="illustration"
          />
          <p className="text-secondary text-[34px] font-bold mt-5 lg:text-[45px] text-center animate__animated animate__fadeInDown">
            Select form type
          </p>
          {state?.todayAssessment?.nursing && (
            <Button
              text="Nursing Forms"
              styles={`lg:w-[70%] animate__animated animate__fadeInDown'}`}
              onClick={() => {
                handleNavigation("/nursing-options");
              }}
            />
          )}
          {state?.todayAssessment?.paramedical && (
            <Button
              text="Paramedical Forms"
              styles={`lg:w-[70%] animate__animated animate__fadeInDown'}`}
              onClick={() => {
                handleNavigation("/paramedical-options");
              }}
            />
          )}
          {role === "Medical" && (
            <Button
              text="OSCE Forms"
              styles={`lg:w-[70%] animate__animated animate__fadeInDown'}`}
              onClick={() => {
                handleNavigation("/osce-options");
              }}
            />
          )}
          {/* {!loading && state?.todayAssessment?.nursing == "Yes" && <Button
            text="Nursing Form"
            styles={`lg:w-[70%] animate__animated animate__fadeInDown ${state?.userData?.nursingFilled ? 'disabled-btn' : ''}`}
            onClick={() => {
              if (!state?.userData?.nursingFilled)
                handleNavigation("/nursing");
              else {
                setError("You've already filled nursing assessment for this date.")
                setTimeout(() => setError(''), 3000)
              }
            }}
          />}
          {!loading && state?.todayAssessment?.paramedical == "Yes" && <Button
            text="Paramedical Form"
            styles={`lg:w-[70%] animate__animated animate__fadeInDown  ${state?.userData?.paramedFilled ? 'disabled-btn' : ''}`}
            onClick={() => {
              if (!state?.userData?.paramedFilled)
                handleNavigation("/paramedical");
              else {
                setError("You've already filled paramedical assessment for this date.")
                setTimeout(() => setError(''), 3000)
              }
            }}
          />}
          {!loading && role === "Medical" && (
            <Button
              text="OSCE 1"
              styles="lg:w-[70%] animate__animated animate__fadeInDown"
              onClick={() => {
                handleNavigation("/osce-1");
              }}
            />
          )}
          {!loading && role === "Medical" && (
            <Button
              text="OSCE 2"
              styles="lg:w-[70%] animate__animated animate__fadeInDown"
              onClick={() => {
                handleNavigation("/osce-2");
              }}
            />
          )} */}
          {error && (
            <span className="text-white animate__animated animate__headShake bg-rose-600 font-medium px-4 py-2 mt-5 text-center ">
              {error}
            </span>
          )}
        </div>
        <style>
          {`
            .disabled-btn {
              opacity: 0.5 !important;
              cursor: not-allowed;
            }
          `}
        </style>
      </CommonLayout>
    )
  );
};

export default MedicalAssessmentsOptions;
