export default function PrivateCover({ name, isPrivate }: { name: string; isPrivate?: boolean }) {
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col justify-between bg-fg p-[18px] lg:p-8">
      <span className="font-mono text-xs uppercase text-[#BDBDBD]">{isPrivate ? "Private project" : null}</span>
      <span className="text-[40px] font-bold leading-none tracking-[-0.03em] text-white lg:text-[72px]">{name}</span>
    </div>
  );
}
