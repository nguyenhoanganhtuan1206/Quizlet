import './Skeleton.scss';
import classNames from 'classnames';

interface SkeletonProps {
  times: number; // Number of skeleton items to render
  className?: string; // Optional additional classes
  textBars?: number; // Number of text bars (default to 2)
  iconSize?: string; // Size of the icon placeholder (default to 40px)
}

const Skeleton = ({
  times,
  className,
  textBars = 2,
  iconSize = '40px',
}: SkeletonProps) => {
  const finalClassName = classNames('skeleton', className);

  return Array(times)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={finalClassName}>
        {/* Icon placeholder */}
        <div
          className="skeleton__icon"
          style={{ width: iconSize, height: iconSize }}
        ></div>

        {/* Text bars */}
        <div className="skeleton__text">
          {Array(textBars)
            .fill(0)
            .map((_, barIndex) => (
              <div key={barIndex}></div>
            ))}
        </div>
      </div>
    ));
};

export default Skeleton;
