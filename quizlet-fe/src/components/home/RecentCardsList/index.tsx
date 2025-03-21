import RecentCardItem from '../RecentCardItem';
import { useGetFlashSetQuery } from '../../../redux';
import Skeleton from '../../../shared/components/Skeleton';

type RecentCardListProps = {
  userId: string;
};

export default function RecentCardsList({
  userId,
}: Readonly<RecentCardListProps>) {
  const { data: flashSets, isLoading } = useGetFlashSetQuery(userId);
  console.log('is', isLoading);

  if (isLoading) {
    return <Skeleton times={3} />;
  }

  return (
    <>
      <h3 className="text-white text-[1.6rem] font-bold">Recent Flashcards</h3>
      <div className="grid grid-cols-2 gap-4">
        {flashSets?.map((flashset) => {
          return (
            <RecentCardItem
              key={flashset.id}
              name={flashset.name}
              isActive={flashset.drafted}
            />
          );
        })}
      </div>
    </>
  );
}
