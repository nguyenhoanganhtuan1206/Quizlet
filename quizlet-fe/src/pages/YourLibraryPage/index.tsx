import { useSelector } from "react-redux";
import { YourLibraryFilterSection } from "../../components";
import { RootState } from "../../store";
import {
  FlashSetListSection,
  FolderListSection,
} from "../../components/your_library";

export default function YourLibraryPage() {
  const { currentLibrary, filters } = useSelector(
    (state: RootState) => state.libraryFilters
  );

  const renderListSection = () => {
    const current = filters.find((libraryFilterItem) => {
      return libraryFilterItem.id === currentLibrary;
    });

    if (!current) {
      return <FolderListSection />;
    }

    switch (current.tags) {
      case "#folder":
        return <FolderListSection />;
      case "#flashset":
        return <FlashSetListSection />;
    }
  };

  return (
    <div>
      <h3 className="text-[2.6rem] text-white font-bold mt-5 pb-[56px]">
        Your Library
      </h3>

      <YourLibraryFilterSection />

      {renderListSection()}
    </div>
  );
}
