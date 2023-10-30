import { title } from '@components/primitives';

export default function PatientsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className={title()}>Patients</h1>
        {children}
      </div>
    </>
  );
}
