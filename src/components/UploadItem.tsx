import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/index";
import { uploadActions } from "../store/upload-slice";

const UploadItem = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PROD_BACK_URL as string}/api/data`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: any) => {
        console.log(data.data);
        let people = data.data.map((person: any) => {
          return {
            name: person.firstName + " " + person.lastName,
            email: person.email,
            image: person.avatar.src,
          };
        });
        console.log(people);
        setPeople(people);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person: any) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
            {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UploadItem;
