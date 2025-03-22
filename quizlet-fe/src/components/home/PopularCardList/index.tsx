import { AssemblyCard } from "../../../shared/components";

export default function PopularCardList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <AssemblyCard path="/latest" imagePath="asd">
          HEllo
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard path="/latest" imagePath="asd">
          HEllo
        </AssemblyCard>
      </div>

      <div className="col-span-1">
        <AssemblyCard path="/latest" imagePath="asd">
          HEllo
        </AssemblyCard>
      </div>
    </div>
  );
}
