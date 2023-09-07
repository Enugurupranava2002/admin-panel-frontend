import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { FileState, fileActions } from "../store/file-slice";

interface FileUploadProps {
  setStep: any;
  setShowModal: any;
}

const FileUpload = (props: FileUploadProps) => {
  const dispatch = useDispatch();
  const fileData: FileState = useSelector((state: any) => state.file);
  const onChange = (e: any) => {
    if (e.target.files.length > 2) {
      e.target.files = null;
      props.setShowModal({
        open: true,
        message: "You can only upload 2 files",
      });
      return;
    }

    for (let index = 0; index < e.target.files.length; index++) {
      if (e.target.files[index].size > 10 * 1024 * 1024) {
        e.target.files = [];
        props.setShowModal({
          open: true,
          message: "Each file should be less than 10MB",
        });
      }
    }

    for (let index = 0; index < e.target.files.length; index++) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[index]);
      reader.onload = () => {
        if (index === 0) {
          dispatch(
            fileActions.updateFile1({
              file1: {
                src: reader.result as string,
                name: e.target.files[index].name,
              },
            })
          );
        } else {
          dispatch(
            fileActions.updateFile2({
              file2: {
                src: reader.result as string,
                name: e.target.files[index].name,
              },
            })
          );
        }
      };
    }
  };

  const onClickChangeAvatar = () => {
    document.getElementById("changeAvatar")?.click();
  };

  const onChangeAvatar = (e: any) => {
    if (e.target.files[0].size > 10 * 1024 * 1024) {
      e.target.files = [];
      props.setShowModal({
        open: true,
        message: "Each file should be less than 10MB",
      });
    }

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      dispatch(
        fileActions.updateAvatar({
          avatar: {
            src: reader.result as string,
            name: e.target.files[0].name,
          },
        })
      );
    };
  };

  return (
    <form>
      <div className="space-y-12 px-10 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 pt-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Verification
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please upload your photo which will be set as Avatar, front and back
            of your ID card in same order.
          </p>

          <div className="divide-y">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Avatar
                </label>
                <div className="flex-col">
                  <div className="mt-2 flex items-center gap-x-3">
                    {fileData.avatar.src ? (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={fileData.avatar.src}
                        alt=""
                      />
                    ) : (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <input
                      className="w-0 h-0"
                      id="changeAvatar"
                      type="file"
                      onChange={onChangeAvatar}
                      style={{ visibility: "hidden" }}
                    />
                    <button
                      type="button"
                      onClick={onClickChangeAvatar}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-gray-600">
                    {fileData.avatar.name}
                  </p>
                </div>
              </div>
              <div className="col-span-11">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="avatar"
                        className="relative cursor-pointer rounded-md bg-gray-50 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          onChange={onChange}
                          id="avatar"
                          name="avatar"
                          type="file"
                          className="sr-only"
                          multiple={true}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-col col-span-5">
                {fileData.file1.src ? (
                  <div>
                    <p className="pb-2 bg-gray-50 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      Indentity Front
                    </p>
                    <p className="text-gray-600">{fileData.file1.name}</p>
                  </div>
                ) : (
                  ""
                )}
                {fileData.file2.src ? (
                  <div>
                    <p className="pb-1 bg-gray-50 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 mt-2">
                      Indentity Back
                    </p>
                    <p className="text-gray-600">{fileData.file2.name}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          onClick={() => props.setStep(1)}
          className="h-fit px-3 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Prev
        </button>
        <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => dispatch(fileActions.setEmptyFiles())}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => props.setStep(3)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save & Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
