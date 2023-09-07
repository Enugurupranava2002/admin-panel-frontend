import {
  Alignment,
  Fit,
  Layout,
  RiveState,
  StateMachineInput,
  useRive,
  useStateMachineInput,
} from "rive-react";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import LoadingSpinner from "./LoadingSpinner";

const STATE_MACHINE_NAME = "Login Machine";

export interface formState {
  input: inputState;
  isSubmitting: boolean;
  isValid: boolean;
}

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: any;
  loading: boolean;
}

type inputState = {
  name: string;
  email: string;
  password: string;
};

const initialState: formState = {
  input: {
    name: "",
    email: "",
    password: "",
  },
  isSubmitting: false,
  isValid: false,
};

const AuthForm = (props: AuthFormProps) => {
  const { rive, RiveComponent }: RiveState = useRive({
    src: "teddy.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const isCheckingInput: StateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "isChecking"
  ) as StateMachineInput;
  const numLookInput: StateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numLook"
  ) as StateMachineInput;
  const trigSuccessInput: StateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "trigSuccess"
  ) as StateMachineInput;
  const trigFailInput: StateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "trigFail"
  ) as StateMachineInput;
  const isHandsUpInput: StateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "isHandsUp"
  ) as StateMachineInput;

  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const nameRef: any = useRef(null);

  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (emailRef.current && !inputLookMultiplier) {
      setInputLookMultiplier(emailRef.current.offsetWidth / 100);
    }
  }, [emailRef]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = e.target.value;
    if (!isCheckingInput.value) {
      isCheckingInput.value = true;
    }
    numLookInput.value = value.length * inputLookMultiplier;

    let is: boolean = true;
    const name = type === "name" ? value : formState.input["name"];
    const email = type === "email" ? value : formState.input["email"];
    const password = type === "password" ? value : formState.input["password"];
    if (props.mode === "register") {
      is = is && name.length > 2 && name.length < 101;
    }
    is =
      is && email.includes("@") && password.length > 5 && password.length < 101;

    setFormState((prevState) => {
      return {
        ...prevState,
        input: {
          ...prevState.input,
          [type]: value,
        },
        isValid: is,
      };
    });
  };

  const onFocus = (type: keyof inputState) => {
    if (type !== "password") {
      isCheckingInput.value = true;
      if (
        numLookInput.value !==
        formState.input.email.length * inputLookMultiplier
      ) {
        numLookInput.value = formState.input[type].length * inputLookMultiplier;
      }
    } else {
      isHandsUpInput.value = true;
    }
  };

  return (
    <div className="mx-auto my-20 w-fit border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  bg-white/70">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10">
          <h2 className="m-auto w-fit pl-4 pr-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {props.mode === "login" ? "Sign in to your account" : "Sign up"}
          </h2>
        </div>
        <div className="w-72 h-60 m-auto mt-5 overflow-hidden rounded-md border-4 border-blue-600/90">
          <RiveComponent />
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-2"
            onSubmit={(e: any) => {
              isCheckingInput.value = false;
              isHandsUpInput.value = false;
              props.onSubmit(e, formState, trigSuccessInput, trigFailInput);
            }}
          >
            {props.mode !== "login" && (
              <FormInput
                inputContainerClasses="mt-2"
                htmlFor="name"
                labelClasses="block text-sm font-medium leading-6 text-gray-900"
                title="Name "
                id="name"
                name="name"
                type="name"
                required={true}
                inputRef={nameRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(e, "name")
                }
                onFocus={() => onFocus("name")}
                onBlur={() => (isCheckingInput.value = false)}
                className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            )}

            <FormInput
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
              title="Email"
              id="email"
              name="email "
              type="email"
              inputRef={emailRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e, "email")
              }
              onFocus={() => onFocus("email")}
              onBlur={() => (isCheckingInput.value = false)}
              required={true}
              className={
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
            />

            <FormInput
              labelContainerClasses="flex items-center justify-between"
              inputContainerClasses="mt-2"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="password"
              title="Password"
              extras={
                props.mode === "login" && (
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                )
              }
              required={true}
              id="password"
              name="password"
              type="password"
              inputRef={passwordRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e, "password")
              }
              onFocus={() => onFocus("password")}
              onBlur={() => (isHandsUpInput.value = false)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={!formState.isValid || props.loading}
                className={`flex w-full justify-center rounded-md ${
                  formState.isValid && !props.loading
                    ? "bg-indigo-600"
                    : "bg-gray-400/80"
                } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  formState.isValid &&
                  !props.loading &&
                  "hover:bg-indigo-500 focus-visible:outline-indigo-600"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
              >
                {props.loading && <LoadingSpinner />}
                {props.loading
                  ? "Loading..."
                  : props.mode === "login"
                  ? "Sign in"
                  : "Sign up"}
              </button>
            </div>
          </form>
          <p className=" pl-4 pr-4 m-auto w-fit mt-6 text-center text-sm text-gray-500">
            {props.mode === "login" ? "Not a member? " : "Already a member? "}
            <Link
              to={props.mode === "login" ? "/register" : "/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {props.mode === "login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
