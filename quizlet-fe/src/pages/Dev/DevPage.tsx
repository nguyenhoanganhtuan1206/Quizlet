import { Skeleton } from "../../shared/components";

export default function DevPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid-cols-1">
        <Skeleton variant="section" times={3}>
          <Skeleton variant="icon" />
          <Skeleton variant="text" textBars={2} width="450px" />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" times={3}>
          <Skeleton variant="icon" />
          <Skeleton variant="text" textBars={2} width="450px" />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" times={3}>
          <Skeleton variant="icon" />
          <Skeleton variant="text" textBars={2} width="450px" />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" times={3}>
          <Skeleton variant="icon" />
          <Skeleton variant="text" textBars={2} width="450px" />
        </Skeleton>
      </div>
    </div>
  );
}
