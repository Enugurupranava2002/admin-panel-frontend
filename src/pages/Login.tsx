import { ChangeEvent, useState } from "react";
import AuthForm, { formState } from "../components/AuthForm";
import NavBars from "../components/NavBars";
import Modal from "../components/Modal";
import { StateMachineInput } from "rive-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState({
    open: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (
    e: ChangeEvent,
    formState: formState,
    trigSuccessInput: StateMachineInput,
    trigFailInput: StateMachineInput
  ) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${import.meta.env.VITE_PROD_BACK_URL as string}/api/authenticate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formState.input.email,
        password: formState.input.password,
      }),
      credentials: "include",
    })
      .then((res: any) => res.json())
      .then((resData: any) => {
        console.log(resData);
        if (resData.status === 422) {
          throw new Error("Validation failed.");
        }
        if (!resData.token) {
          throw new Error(resData.message || "Could not authenticate you!");
        }

        localStorage.setItem("token", resData.token);

        trigSuccessInput.fire();

        setTimeout(() => {
          navigate("/progress");
          setLoading(false);
        }, 3000);
      })
      .catch((err: any) => {
        trigFailInput.fire();
        console.log(err);
        setTimeout(() => {
          setLoading(false);
          setShowModal({
            open: true,
            message:
              err.message === "Name is required"
                ? "You are not registered!"
                : err.message,
          });
        }, 2000);
      });
  };

  return (
    <>
      {showModal.open && (
        <Modal
          open={showModal.open}
          setOpen={setShowModal}
          title="Error"
          message={showModal.message}
        />
      )}
      <div
        className="fixed inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(login_bg.jpg)` }}
      ></div>
      <div className="fixed w-full z-10">
        <NavBars />
      </div>
      <div className="fixed inset-0">
        <div className="flex items-end justify-center p-4 sm:items-center sm:p-0">
          <AuthForm mode="login" onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Login;
