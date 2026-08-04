import { Reveal } from "./Reveal";

// Real, hosted customer testimonial videos. These are genuine assets served
// from the production domain; no attribution is invented for the speakers.
export type VideoTestimonial = { src: string; label: string };

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    src: "https://pyngyn.ai/assets/Testimonial-CRAqvVm9.mp4",
    label: "Customer testimonial",
  },
];

/**
 * A single framed testimonial video. Presentational only (no hooks), so it can
 * be dropped into either light or dark layouts. Native controls, no autoplay,
 * metadata preload so the browser shows a first-frame poster cheaply, and
 * object-contain on a black frame so portrait or landscape clips never crop.
 */
export function TestimonialVideo({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-video overflow-hidden rounded-xl bg-black ${className}`}>
      <video
        className="h-full w-full object-contain"
        controls
        preload="metadata"
        playsInline
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video. You can{" "}
        <a href={src} className="underline">
          watch it here
        </a>
        .
      </video>
    </div>
  );
}

/** Light-themed video testimonials section for the home page. */
export function VideoTestimonials() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              Customer stories
            </span>
            <h2 className="title mt-3">Hear it from the teams using it.</h2>
            <p className="lead mx-auto mt-4 max-w-[620px]">
              A real customer, in their own words, on what changed once the busywork moved to
              PYNGYN.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-[46px] max-w-[560px]">
          {VIDEO_TESTIMONIALS.map((v) => (
            <Reveal key={v.src}>
              <figure>
                <TestimonialVideo src={v.src} label={v.label} className="border border-line shadow-card" />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
