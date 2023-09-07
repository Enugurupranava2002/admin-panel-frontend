import { useSelector, useDispatch } from "react-redux";
import { DataState, dataActions } from "../store/data-slice";
import DataInput from "./DataInput";
import DataTextArea from "./DataTextArea";

interface InfoFormProps {
  setStep: any;
  setShowModal: any;
}

const COUNTRIES = [
  "None",
  "India",
  "Canada",
  "Italy",
  "Germany",
  "Japan",
  "Britain",
  "France",
  "Brazil",
  "Russia",
  "United States",
  "Mexico",
];

const InfoForm = (props: InfoFormProps) => {
  const infoData: DataState = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.setStep(2);
  };

  const onChange = (e: any) => {
    dispatch(
      dataActions.updateInfoData({
        ...infoData,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will reproduce essential information regarding your
            identity and characteristics.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <DataInput
              containerClasses="sm:col-span-4"
              htmlFor="username"
              id="username"
              inputClasses="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              inputContainerClasses="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              inputSpanClasses="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
              label="Username"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="username"
              onChange={onChange}
              placeholder="username"
              type="text"
              value={infoData.username}
              inputSpan="admin.portal.com/"
            />

            <DataTextArea
              containerClasses="col-span-full"
              htmlFor="about"
              id="about"
              extras={
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              }
              label="About"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="about"
              onChange={onChange}
              rows={3}
              textAreaClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={infoData.about}
            />
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <DataInput
              containerClasses="sm:col-span-3"
              htmlFor="firstName"
              id="firstName"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpanClasses=""
              label="First name"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="firstName"
              onChange={onChange}
              placeholder=""
              type="text"
              value={infoData.firstName}
              inputSpan=""
            />
            <DataInput
              containerClasses="sm:col-span-3"
              htmlFor="lastName"
              id="lastName"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="Last name"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="lastName"
              onChange={onChange}
              placeholder=""
              type="text"
              value={infoData.lastName}
            />
            <DataInput
              containerClasses="sm:col-span-4"
              htmlFor="email"
              id="email"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="Email address"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="email"
              onChange={onChange}
              placeholder=""
              type="email"
              value={infoData.email}
            />
            <DataInput
              containerClasses="sm:col-span-4"
              htmlFor="phone"
              id="phone"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="Phone number"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="phone"
              onChange={onChange}
              placeholder=""
              type="tel"
              value={infoData.phone}
            />
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  onChange={onChange}
                  value={infoData.country}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <DataTextArea
              containerClasses="col-span-full"
              extras=""
              htmlFor="address1"
              id="address1"
              label="Address1"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="address1"
              onChange={onChange}
              rows={2}
              textAreaClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={infoData.address1}
            />

            <DataTextArea
              containerClasses="col-span-full"
              extras=""
              htmlFor="address2"
              id="address2"
              label="Address2"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="address2"
              onChange={onChange}
              rows={2}
              textAreaClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={infoData.address2}
            />

            <DataInput
              containerClasses="sm:col-span-2 sm:col-start-1"
              htmlFor="city"
              id="city"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="City"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="city"
              onChange={onChange}
              placeholder=""
              type="text"
              value={infoData.city}
            />

            <DataInput
              containerClasses="sm:col-span-2"
              htmlFor="state"
              id="state"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="State"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="state"
              onChange={onChange}
              placeholder=""
              type="text"
              value={infoData.state}
            />

            <DataInput
              containerClasses="sm:col-span-2"
              htmlFor="pin"
              id="pin"
              inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              inputContainerClasses=""
              inputSpan=""
              inputSpanClasses=""
              label="Pin code"
              labelClasses="block text-sm font-medium leading-6 text-gray-900"
              name="pin"
              onChange={onChange}
              placeholder=""
              type="text"
              value={infoData.pin}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => dispatch(dataActions.setEmptyInfoData())}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save & Next
        </button>
      </div>
    </form>
  );
};

export default InfoForm;
