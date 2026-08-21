import { GENERAL_INFO } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 pb-5 text-center" id="contact">
      <div className="mx-auto max-w-[1148px] px-4">
        <p className="text-lg">Have a project in mind?</p>
        <a
          href={`mailto:${GENERAL_INFO.email}`}
          className="font-anton mt-5 mb-0 inline-block text-3xl hover:underline sm:text-4xl"
        >
          {GENERAL_INFO.email}
        </a>
      </div>
    </footer>
  );
}
