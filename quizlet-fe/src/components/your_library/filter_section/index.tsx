import './YourLibraryFilterSection.scss';

import { useSelector } from 'react-redux';
import { TabsFilter } from '../../../shared/components';
import { RootState } from '../../../store';

export default function YourLibraryFilterSection() {
  const libraryFiltersList = useSelector(
    (state: RootState) => state.libraryFilters.filters
  );

  return (
    <div>
      <TabsFilter
        ulClassName="border-b-2 border-b-[var(--color-text-blacklight)] pb-2"
        liClassName="library__filter-underline"
        libraryFiltersList={libraryFiltersList}
      />
    </div>
  );
}
