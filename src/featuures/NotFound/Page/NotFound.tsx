import Button from "@/components/common/Ui/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-9xl text-colorIcon font-bold dark:text-white">404</h1>
        <p className="text-base text-gray-400 font-semibold my-2">Page not found</p>
        <Button variant="primary">
          <Link to="/home"> Go to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;
