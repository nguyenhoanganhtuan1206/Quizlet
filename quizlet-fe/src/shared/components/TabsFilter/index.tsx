import './TabsFilter.scss';

import { useDispatch } from 'react-redux';

import {
  selectFilterLibraryItem,
  TabFilter,
} from '../../../store/slices/libraryFiltersSlices';

type TabsFilterProps = {
  libraryFiltersList: TabFilter[];
  ulClassName?: string;
  liClassName?: string;
};

export default function TabsFilter({
  libraryFiltersList,
  ulClassName,
  liClassName,
}: Readonly<TabsFilterProps>) {
  const dispatch = useDispatch();
  const handleSelectItem = (id: number) => {
    dispatch(selectFilterLibraryItem(id));
  };

  return (
    <ul
      className={`${ulClassName} flex items-center text-[var(--gray-700-gray-500)] text-[1.4rem] font-bold`}
    >
      {libraryFiltersList.map((libraryFilterItem) => {
        return (
          <li
            onClick={() => handleSelectItem(libraryFilterItem.id)}
            className={`table-filter__item px-[16px] ${liClassName} ${
              libraryFilterItem.isSelected
                ? 'table-filter__item--active'
                : ''
            }`}
            key={libraryFilterItem.id}
          >
            <p>{libraryFilterItem.title}</p>
          </li>
        );
      })}
    </ul>
  );
}
