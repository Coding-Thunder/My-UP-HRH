import React, { useState, useEffect, useContext } from "react";
import CommonLayout from "../../components/CommonLayout";
import formSpecJSON from "../../configs/qualityOfProcesses.json";
import { useNavigate } from "react-router-dom";
import { getMedicalAssessments, saveNursingFormSubmissions } from "../../api";
import { StateContext } from "../../App";

const QualityOfProcesses = () => {
    const { state } = useContext(StateContext)
    console.log(state);
    const getFormURI = (form, ofsd, prefillSpec) => {
        // console.log(form, ofsd, prefillSpec);
        return encodeURIComponent(
            `https://enketo-manager-ratings-tech.samagra.io/prefill?form=${form}&onFormSuccessData=${encodeFunction(
                ofsd
            )}&prefillSpec=${encodeFunction(prefillSpec)}`
        );
    };
    const formSpec = formSpecJSON;
    console.log(formSpec)
    const navigate = useNavigate();
    const encodeFunction = (func) => encodeURIComponent(JSON.stringify(func));
    const startingForm = formSpec.start;
    const [formId, setFormId] = useState(startingForm);
    const [encodedFormSpec, setEncodedFormSpec] = useState(
        encodeURI(JSON.stringify(formSpec.forms[formId]))
    );
    const [onFormSuccessData, setOnFormSuccessData] = useState(undefined);
    const [onFormFailureData, setOnFormFailureData] = useState(undefined);
    const [encodedFormURI, setEncodedFormURI] = useState(
        getFormURI(
            formId,
            formSpec.forms[formId].onSuccess,
            formSpec.forms[formId].prefill
        )
    );

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        district: "",
        instituteName: "",
        nursing: "",
        paramedical: "",
        type: "",
        latitude: null,
        longitude: null,
    });

    function afterFormSubmit(e) {
        // console.log(e)
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        console.log("data", data);
        try {
            /* message = {
              nextForm: "formID",
              formData: {},
            }
            */

            const { nextForm, formData, onSuccessData, onFailureData } = data;

            if (data?.state == "ON_FORM_SUCCESS_COMPLETED") {
                const userData = JSON.parse(localStorage.getItem("userData"));

                saveNursingFormSubmissions({
                    assessor_id: userData?.user?.id,
                    username: userData?.user?.username,
                    submission_date: new Date(),
                    institute_id: state?.todayAssessment?.id,
                    form_data: JSON.stringify(data.formData),
                    form_name: formSpec.start
                })
                setTimeout(() => navigate('/medical-assessment-options'), 2000)
            }

            if (nextForm.type === "form") {
                setFormId(nextForm.id);
                setOnFormSuccessData(onSuccessData);
                setOnFormFailureData(onFailureData);
                setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
                setEncodedFormURI(
                    getFormURI(
                        nextForm.id,
                        onSuccessData,
                        formSpec.forms[nextForm.id].prefill
                    )
                );
                navigate("medical-assessment-options");
            } else {
                window.location.href = nextForm.url;
            }
        } catch (e) {
            // console.log(e)
        }
    }

    const eventTriggered = (e) => {
        afterFormSubmit(e);
    };
    const bindEventListener = () => {
        window.addEventListener("message", eventTriggered);
    };
    const detachEventBinding = () => {
        window.removeEventListener("message", eventTriggered);
    };

    const getTodayAssessments = async () => {
        setLoading(true);
        const res = await getMedicalAssessments();
        if (res?.data?.institutes?.[0]) {
            let assess = res?.data?.institutes?.[0];
            setData({
                district: assess.district,
                instituteName: assess.name,
                nursing: assess.nursing,
                paramedical: assess.paramedical,
                type: assess.type,
                latitude: assess.latitude,
                longitude: assess.longitude,
            });
            formSpec.forms[formId].prefill.dist = "`" + `${assess?.district}` + "`";
            formSpec.forms[formId].prefill.name = "`" + `${assess?.name}` + "`";
            setEncodedFormSpec(encodeURI(JSON.stringify(formSpec.forms[formId])));
            setEncodedFormURI(
                getFormURI(
                    formId,
                    formSpec.forms[formId].onSuccess,
                    formSpec.forms[formId].prefill
                )
            );
        } else setData(null);
        setLoading(false);
    };

    useEffect(() => {
        getTodayAssessments();
    }, []);

    useEffect(() => {
        bindEventListener();
        return () => {
            detachEventBinding();
        };
    }, [data]);

    return (
        <CommonLayout back="/nursing-options">
            <div className="flex flex-col items-center">
                {!loading && data && (
                    <>
                        {console.log(formSpec.forms[formId].prefill)}
                        <iframe
                            title="form"
                            src={`${process.env.REACT_APP_ENKETO_URL}/preview?formSpec=${encodedFormSpec}&xform=${encodedFormURI}`}
                            style={{ height: "80vh", width: "100%", marginTop: "20px" }}
                        />
                    </>
                )}
            </div>
        </CommonLayout>
    );
};

export default QualityOfProcesses;
