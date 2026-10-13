const fieldClasses =
  "w-full rounded-none border-0 border-b border-line bg-transparent py-2.5 transition-colors focus:border-text focus:shadow-[0_1px_0_0_var(--color-text)] focus:outline-none";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 pb-20 lg:grid-cols-3 lg:gap-x-4 lg:pb-32"
    >
      <div className="flex flex-col gap-5">
        <h2
          id="contact-title"
          className="font-display text-2xl uppercase lg:text-3xl"
        >
          Contact
        </h2>
        <ul className="flex flex-col gap-1 text-muted">
          <li>
            <a
              href="mailto:hello@carlosriviera.com"
              className="text-text wrap-anywhere transition-colors hover:text-muted"
            >
              hello@carlosriviera.com
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              className="text-text transition-colors hover:text-muted"
            >
              Instagram
            </a>
          </li>
          <li>Los Angeles, CA</li>
        </ul>
      </div>

      <form
        action="mailto:hello@carlosriviera.com"
        method="post"
        encType="text/plain"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-muted">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            className={fieldClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-muted">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className={fieldClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="enquiry" className="text-sm text-muted">
            Enquiry
          </label>
          <div className="relative">
            <select
              id="enquiry"
              name="enquiry"
              className={`${fieldClasses} appearance-none pr-6`}
            >
              <option>Shoot booking</option>
              <option>Editorial commission</option>
              <option>Something else</option>
            </select>
            <img
              src="/icons/caret-down.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-sm text-muted">
            Preferred date (optional)
          </label>
          <div className="relative">
            <input
              type="date"
              id="date"
              name="date"
              className={`${fieldClasses} pr-6 [&::-webkit-calendar-picker-indicator]:opacity-0`}
            />
            <img
              src="/icons/calendar-blank.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className={`${fieldClasses} min-h-30 resize-y`}
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer justify-self-end border border-text bg-text px-6 py-3.5 text-bg transition-colors hover:bg-bg hover:text-text sm:col-span-2"
        >
          Send enquiry
        </button>
      </form>
    </section>
  );
}
