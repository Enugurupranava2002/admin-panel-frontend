const ProgressBar = (props: any) => {
  return (
    <div className="flex-start flex h-1.5 w-full overflow-hidden rounded-sm bg-blue-gray-50 font-sans text-xs font-medium">
      <div
        className="flex h-full items-baseline justify-center overflow-hidden break-all bg-blue-700/75 text-white rounded-lg"
        style={{ width: props.width }}
      ></div>
    </div>
  );
};

export default ProgressBar;
