export function Main({ children }: { children?: React.ReactNode }) {
  return (
    <main className="w-[100vw] h-[100vh] relative p-0 m-0 bg-primary-foreground overflow-x-hidden">
      {children}
    </main>
  );
}
