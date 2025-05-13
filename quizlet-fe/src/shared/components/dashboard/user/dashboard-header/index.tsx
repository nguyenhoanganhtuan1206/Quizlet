import { RxCountdownTimer } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

import { Button } from "../../..";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <h2>IELTS Speaking</h2>
        <p>
          <RxCountdownTimer />

          <span>Modified 25/03/25</span>
        </p>
      </div>
      <div className="flex items-center">
        <Button>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}
