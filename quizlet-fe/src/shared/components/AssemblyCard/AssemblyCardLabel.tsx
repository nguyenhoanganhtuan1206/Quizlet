import "./AssemblyCard.scss";

type AssemblyCardLabelProps = {
  content: string;
};

export default function AssemblyCardLabel({
  content,
}: Readonly<AssemblyCardLabelProps>) {
  return (
    <div className="text-[1.2rem] border-none rounded-[10px] bg-[var(--twilight-100-gray-600)] text-white">
      {content}
    </div>
  );
}
