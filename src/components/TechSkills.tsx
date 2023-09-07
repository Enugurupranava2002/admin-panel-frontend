import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { skillsActions } from "../store/tech-slice";
import { DataState } from "../store/data-slice";
import { FileState } from "../store/file-slice";
import { useNavigate } from "react-router-dom";
import resetForm from "../util/resetForm";

const skills = [
  { id: 1, name: "Excellent Debugging" },
  { id: 2, name: "Knowledge of Frameworks" },
  { id: 3, name: "Cloud Computing" },
  { id: 4, name: "Git and Github" },
  { id: 5, name: "VIM" },
  { id: 6, name: "Testing procedures" },
  { id: 7, name: "Data Structures" },
  { id: 8, name: "Algorithms" },
  { id: 9, name: "Problem Solving" },
  { id: 10, name: "Object-Oriented Design" },
];

interface TechSkillsProps {
  step: number;
  setStep: any;
  setShowModal: any;
}

const TechSkills = (props: TechSkillsProps) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const skillsData = useSelector((state: any) => state.tech);
  const infoData: DataState = useSelector((state: any) => state.data);
  const fileData: FileState = useSelector((state: any) => state.file);

  const filteredSkills =
    query === ""
      ? skills
      : skills.filter((skill: any) =>
          skill.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          skillsActions.updateGeolocation({
            geolocation: `${position.coords.latitude} ${position.coords.longitude}`,
          })
        );
      },
      (err) => {}
    );
    dispatch(skillsActions.updateGeolocation({ geolocation: "India" }));
  }, []);

  const onSubmit = () => {
    dispatch(skillsActions.updateSkills({ skills: selectedSkills }));
    fetch(`${import.meta.env.VITE_PROD_BACK_URL as string}/api/data`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        info: infoData,
        files: fileData,
        skills: skillsData,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resetForm(dispatch);
        navigate("/uploads");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-32 pt-5 pb-2">
      <div className="flex-col col-span-12">
        <div className="relative">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Skills
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will give a kind of proffesional touch tp your
            profile.
          </p>
          <p className="mt-5 bg-gray-50 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
            Fill your skills
          </p>
          <Combobox value={selectedSkills} onChange={setSelectedSkills}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-96 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(skills: any) => {
                    console.log(skills);
                    return skills.map((skill: any) => skill.name).join(", ");
                  }}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredSkills.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredSkills.map((skill: any) => (
                      <Combobox.Option
                        key={skill.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={[...selectedSkills, skill]}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {skill.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
      <div className={`mt-56 flex justify-between items-center`}>
        <button
          type="submit"
          onClick={() => props.setStep(2)}
          className="h-fit px-3 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Prev
        </button>

        <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => dispatch(skillsActions.setEmptySkills())}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechSkills;
