import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import { StateContext } from "../App";
import { getAssessmentStatus } from "../api";

const OsceOptions = () => {
    const { state, setState } = useContext(StateContext);
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    const getFilledAssessmentStatus = async () => {
        setLoading(true);
        const res = await getAssessmentStatus();
        console.log(res.data);
        const filledForms = {};
        if (res?.data?.q1?.length) {
            res.data.q1.forEach(el => filledForms[el.form_name] = true)
        }
        setState({ ...state, userData: { ...state?.userData, filledForms: { ...state?.filledForms, ...filledForms } } })
        setLoading(false);
    }

    useEffect(() => {
        getFilledAssessmentStatus();
        const user = JSON.parse(localStorage.getItem("userData"))?.user?.registrations[0]?.roles[0];
        setRole(() => user);
    }, []);

    return (
        role && (
            <CommonLayout back="/medical-assessment-options">
                <div className="flex flex-col px-5 py-8 items-center">
                    <p className="text-secondary text-[34px] font-bold mt-5 lg:text-[45px] text-center animate__animated animate__fadeInDown">
                        Select your assessment type
                    </p>
                    {!loading && <Button
                        text="Unoccupied Beds"
                        styles={`lg:w-[70%] animate__animated animate__fadeInDown ${state?.userData?.filledForms?.['osce_unoccupied_beds'] ? 'disabled-btn' : ''}`}
                        onClick={() => {
                            if (!state?.userData?.filledForms?.['osce_unoccupied_beds'])
                                handleNavigation("/osce-unoccupied-beds");
                            else {
                                setError("You've already filled Unoccupied Beds assessment today")
                                setTimeout(() => setError(''), 3000)
                            }
                        }}
                    />}
                    {!loading && <Button
                        text="Vital Signs"
                        styles={`lg:w-[70%] animate__animated animate__fadeInDown ${state?.userData?.filledForms?.['osce_vital_signs'] ? 'disabled-btn' : ''}`}
                        onClick={() => {
                            if (!state?.userData?.filledForms?.['osce_vital_signs'])
                                handleNavigation("/vital-signs");
                            else {
                                setError("You've already filled Vital Signs assessment today")
                                setTimeout(() => setError(''), 3000)
                            }
                        }}
                    />}
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

export default OsceOptions;
