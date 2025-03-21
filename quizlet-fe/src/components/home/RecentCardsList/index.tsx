import RecentCardItem from '../RecentCardItem';
import { useGetFlashSetQuery } from '../../../redux';

type RecentCardListProps = {
  userId: string;
};

export default function RecentCardsList({
  userId,
}: Readonly<RecentCardListProps>) {
  const { data: flashSets, isLoading } = useGetFlashSetQuery(userId);
  console.log('flashSets', flashSets);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <RecentCardItem isActive />
      <RecentCardItem />
      <RecentCardItem />
      <RecentCardItem />
    </div>
  );
}
