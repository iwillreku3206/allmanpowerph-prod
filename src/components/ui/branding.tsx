import { SITE_TITLE } from "@/lib/constants";

// Site title component
export function Title() {
  return (
    <h1 className="text-logo mb-8 motion-translate-x-in-[-5%] motion-opacity-in-0">
      {" "}
      {SITE_TITLE}{" "}
    </h1>
  );
}

// Contact information footer
export function Contact() {
  return (
    <p className="text-body mt-8 opacity-30 text-white lg:text-right text-center motion-translate-y-in-50 motion-opacity-in-0 motion-delay-500">
      Questions or concerns? Call us at:
      <br />
      <span className="font-semibold">09270251730</span>
    </p>
  );
}
