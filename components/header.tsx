import Link from 'next/link';
import { AppIcon } from '@/components/app-icon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <AppIcon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            TN Tourist Shield
          </span>
        </Link>
      </div>
    </header>
  );
}
