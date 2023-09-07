import ProgressBar from "./ProgressBar";

interface StepsProps {
  step: number;
  percent: string;
}

const Steps = (props: StepsProps) => {
  return (
    <div className="w-fit mx-auto px-10 py-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        <li
          className={`flex  mr-24 md:w-full items-center ${
            props.step > 1 ? "text-blue-600 dark:text-blue-500" : ""
          } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {props.step > 1 && (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            )}
            {props.step <= 1 && <span className="mr-2">1</span>}
            Personal <span className="hidden sm:inline-flex sm:ml-2">Info</span>
          </span>
        </li>

        <li
          className={`mr-24 flex md:w-full items-center after:content-[''] ${
            props.step > 2 ? "text-blue-600 dark:text-blue-500" : ""
          } after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {props.step > 2 && (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            )}
            {props.step <= 2 && <span className="mr-2">2</span>}
            File <span className="hidden sm:inline-flex sm:ml-2">Upload</span>
          </span>
        </li>

        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full ${
            props.step > 3 ? "text-blue-600 dark:text-blue-500" : ""
          } after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block dark:after:border-gray-700`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {props.step > 3 && (
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            )}
            {props.step <= 3 && <span className="mr-2">3</span>}
            Tech <span className="hidden sm:inline-flex sm:ml-2">Skills</span>
          </span>
        </li>
      </ol>
      <div className="mt-2">
        <ProgressBar width={props.percent} />
      </div>
    </div>
  );
};

export default Steps;
