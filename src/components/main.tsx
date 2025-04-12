export function Main({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <main className={"w-[100vw] h-[100vh] relative p-0 m-0 bg-primary-foreground overflow-x-hidden " + className || ""}>
      {children}
    </main>
  );
}
