import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../App";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";

const MedicalAssessmentsOptions = () => {
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    }
    return (
        <CommonLayout>
            <div className="flex flex-col px-5 py-8 items-center">
                <p className="text-secondary text-[34px] font-bold mt-5 lg:text-[45px] text-center">
                    Select your assessment type
                </p>
                <Button text="Form 1" onClick={() => { handleNavigation("pehla-form") }} />
                <Button text="Form 2" onClick={() => { handleNavigation("dusra-form") }} />
                <Button text="Form 3" onClick={() => { handleNavigation("teesra-form") }} />
                <Button text="Form 4" onClick={() => { handleNavigation("foruth-form") }} />
            </div>
        </CommonLayout>
    );
};

export default MedicalAssessmentsOptions;
