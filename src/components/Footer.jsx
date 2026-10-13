export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 pt-6 pb-8 text-sm">
        <p>&copy; 2026 Carlos Riviera</p>

        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          <li>
            <a
              href="https://www.instagram.com/"
              className="transition-colors hover:text-muted"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@carlosriviera.com"
              className="transition-colors hover:text-muted"
            >
              Email
            </a>
          </li>
          <li>
            <a href="#hero" className="transition-colors hover:text-muted">
              Back to top
            </a>
          </li>
        </ul>

        <p className="text-muted">
          Photos from{" "}
          <a
            href="https://pxhere.com"
            className="underline underline-offset-4 transition-colors hover:text-text"
          >
            Pxhere
          </a>
        </p>
      </div>
    </footer>
  );
}
