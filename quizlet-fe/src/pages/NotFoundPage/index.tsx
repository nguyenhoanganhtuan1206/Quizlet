import { Button } from '../../shared/components';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-[2.5rem] mt-4">
        Hmm, we can't seem to find that page
      </h1>
      <p className="text-[1.3rem] text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        path="/"
        className="w-fit mt-6 inline-block border-none px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Button>
    </div>
  );
}
