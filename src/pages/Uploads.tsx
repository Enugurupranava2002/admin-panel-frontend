import NavBars from "../components/NavBars";
import UploadItem from "../components/UploadItem";

const Uploads = () => {
  return (
    <>
      <div className="relative w-full z-10">
        <NavBars current="uploads"></NavBars>
      </div>
      <div className="m-5 p-10">
        <UploadItem />
      </div>
    </>
  );
};

export default Uploads;
