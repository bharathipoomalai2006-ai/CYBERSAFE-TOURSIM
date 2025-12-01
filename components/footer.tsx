export default function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built for your safety. © {new Date().getFullYear()} TN Tourist Shield.
        </p>
      </div>
    </footer>
  );
}
