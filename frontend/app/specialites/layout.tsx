import { title } from '@components/primitives';

export default function PatientsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className={title()}>Spécialités</h1>
        {children}
      </div>
    </>
  );
}
