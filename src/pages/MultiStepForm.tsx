import { useState } from "react";
import TechSkills from "../components/TechSkills";
import FileUpload from "../components/FileUpload";
import InfoForm from "../components/InfoForm";
import NavBars from "../components/NavBars";
import Steps from "../components/Steps";
import Modal from "../components/Modal";

const Progress = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState({
    open: false,
    message: "",
  });

  const componentGenerator = (step: number, setShowModal: any) => {
    switch (step) {
      case 1:
        return (
          <div className="absolute top-2">
            <InfoForm setStep={setStep} setShowModal={setShowModal} />
          </div>
        );
      case 2:
        return (
          <div className="absolute top-2">
            <FileUpload setStep={setStep} setShowModal={setShowModal} />
          </div>
        );
      case 3:
        return (
          <div className="absolute top-2">
            <TechSkills
              step={step}
              setStep={setStep}
              setShowModal={setShowModal}
            />
          </div>
        );
      default:
    }
  };

  return (
    <>
      <Modal
        open={showModal.open}
        setOpen={setShowModal}
        title="Error"
        message={showModal.message}
      />
      <div className="relative w-full z-10">
        <NavBars />
      </div>
      <div className="relative inset-0 mt-5">
        <Steps step={step} percent={`${((step / 3.0) * 100) | 0}%`} />
      </div>
      <div className="relative inset-0 mt-5">
        <div className="flex items-end justify-center p-4 sm:items-center sm:p-0">
          {componentGenerator(step, setShowModal)}
        </div>
      </div>
    </>
  );
};

export default Progress;
