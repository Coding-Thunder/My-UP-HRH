import React, { useEffect, useState } from "react";
import CommonLayout from "../components/CommonLayout";

const Osce1 = () => {
  const forms = [
    "osce_1",
    "osce_3",
    "osce_4",
    "osce_5",
    "osce_6",
    "osce_7",
    "osce_8",
    "osce_9",
    "osce_10",
  ];
  const [formId, setFormId] = useState("");

  useEffect(() => {
    setFormId(Math.floor(Math.random() * forms.length));
  }, []);

  return (
    <CommonLayout back="/medical-assessment-options">
      {formId && (
        <div className="flex flex-col items-center">
          <iframe
            title="Location Form"
            src={`http://enketo-ratings-tech.samagra.io/preview?xform=http%3A%2F%2Fenketo-manager-ratings-tech.samagra.io%2Fprefill%3Fform%3D${forms[formId]}`}
            style={{ height: "80vh", width: "100%", marginTop: "20px" }}
          />
        </div>
      )}
    </CommonLayout>
  );
};

export default Osce1;
