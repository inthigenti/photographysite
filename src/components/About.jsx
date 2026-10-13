export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:gap-x-4 lg:px-8 lg:pb-32"
    >
      <h2
        id="about-title"
        className="font-display text-2xl uppercase lg:text-3xl"
      >
        About
      </h2>

      <div className="flex max-w-xl flex-col gap-5">
        <p className="text-xl leading-snug lg:text-2xl">
          I make honest pictures of people and the places that shape them.
        </p>
        <p className="text-muted">
          Born in Lisbon, based in Los Angeles. I shoot portrait, editorial and
          street work on film and digital.
        </p>
        <a
          href="#contact"
          className="self-start underline underline-offset-4 transition-colors hover:text-muted"
        >
          Book a shoot
        </a>
      </div>

      <img
        src="/images/carlos-6.jpg"
        alt="Black and white portrait of Carlos looking through a Canon camera"
        loading="lazy"
        className="aspect-[4/5] w-full max-w-sm object-cover lg:max-w-none"
      />
    </section>
  );
}
