export default function LoginTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-full min-w-full bg-gray-800">
      {children}
    </main>
  );
}