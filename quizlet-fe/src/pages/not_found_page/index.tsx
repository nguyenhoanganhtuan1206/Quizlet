import { Button, ErrorComponent } from "../../shared/components";

export default function NotFoundPage() {
  return (
    <ErrorComponent>
      <h3 className="text-[2.6rem] font-bold text-white">
        Hmm, we can't seem to find that page
      </h3>
      <span className="text-[1.6rem] mt-5 text-[var(--gray-400-gray-600)]">
        The page you're looking for doesn't exist or has been moved.
      </span>

      <Button className="mt-5 border-none" path="/" variant="borderOnly">
        Go Back the Home Page
      </Button>
    </ErrorComponent>
  );
}
