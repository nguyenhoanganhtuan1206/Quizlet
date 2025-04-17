import "./PopularCardList.scss";

import { AssemblyCard, AssemblyCardLabel } from "../../../shared/components";
import { MdOutlineVerified } from "react-icons/md";

export default function PopularCardList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <AssemblyCard
          path="/"
          className="popular__assembly-card"
          imagePath="https://d2nchlq0f2u6vy.cloudfront.net/cache/2c/1e/2c1ebd8444499a8944f1c1c221b4201d.jpg"
          headerContent="Realidades 2: Practice Workbook 2"
        >
          <p className="popular__assembly-card-desc">
            1st Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021
          </p>

          <AssemblyCardLabel>
            <MdOutlineVerified />

            <p className="ml-2">1,783 solutions</p>
          </AssemblyCardLabel>
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard
          path="/"
          className="popular__assembly-card"
          imagePath="https://d2nchlq0f2u6vy.cloudfront.net/cache/2c/1e/2c1ebd8444499a8944f1c1c221b4201d.jpg"
          headerContent="Realidades 2: Practice Workbook 2"
        >
          <p className="popular__assembly-card-desc">
            1st Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021
          </p>

          <AssemblyCardLabel>
            <MdOutlineVerified />

            <p className="ml-2">1,783 solutions</p>
          </AssemblyCardLabel>
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard
          path="/"
          className="popular__assembly-card"
          imagePath="https://d2nchlq0f2u6vy.cloudfront.net/cache/2c/1e/2c1ebd8444499a8944f1c1c221b4201d.jpg"
          headerContent="Realidades 2: Practice Workbook 2"
        >
          <p className="popular__assembly-card-desc">
            1st Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021 1st
            Edition ISBN: 9780130360021 1st Edition ISBN: 9780130360021
          </p>

          <AssemblyCardLabel>
            <MdOutlineVerified />

            <p className="ml-2">1,783 solutions</p>
          </AssemblyCardLabel>
        </AssemblyCard>
      </div>
    </div>
  );
}
