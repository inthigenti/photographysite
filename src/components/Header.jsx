export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <a href="#hero" className="font-medium">
          Carlos Riviera
        </a>
        <ul className="flex gap-4 text-sm sm:gap-6 sm:text-base">
          <li>
            <a href="#work" className="transition-colors hover:text-muted">
              Work
            </a>
          </li>
          <li>
            <a href="#about" className="transition-colors hover:text-muted">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="transition-colors hover:text-muted">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
