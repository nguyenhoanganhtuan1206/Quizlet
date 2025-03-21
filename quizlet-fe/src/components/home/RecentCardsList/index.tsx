import RecentCardItem from '../RecentCardItem';

export default function RecentCardsList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RecentCardItem isActive />
      <RecentCardItem />
      <RecentCardItem />
      <RecentCardItem />
    </div>
  );
}
