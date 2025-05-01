import { PopularCardList, RecentCardsList } from "../../components/";

const HomePage = () => {
  return (
    <>
      {/**
       * Recent flashset List
       */}
      <h3 className="text-white text-[1.6rem] font-bold mb-5">
        Recent flashcards
      </h3>

      <RecentCardsList />

      {/**
       * Popular flashset List
       */}
      <h3 className="text-white text-[1.6rem] font-bold my-8">
        Popular flashcard sets
      </h3>

      <PopularCardList />
    </>
  );
};

export default HomePage;
