import RecentCardItem from '../RecentCardItem';
import { useGetFlashSetQuery } from '../../../redux';

type RecentCardListProps = {
  userId: string;
};

export default function RecentCardsList({
  userId,
}: Readonly<RecentCardListProps>) {
  const { data: flashSets, isLoading } = useGetFlashSetQuery(userId);

  if (isLoading) {
    return <div>Loading</div>;
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
