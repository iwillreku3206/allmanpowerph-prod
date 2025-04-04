import { SITE_TITLE } from "@/lib/constants";

// Site title component
export function Title() {
  return (
    <h1 className="texttype-logo mb-2 motion-translate-x-in-[-5%] motion-opacity-in-0">
      {" "}
      {SITE_TITLE}{" "}
    </h1>
  );
}

// Contact information footer
export function Contact() {
  return (
    <div className="lg:block hidden">
      <div className="absolute bottom-14 w-full flex flex-row">
        <p className="block texttype-body opacity-20 text-white lg:text-left text-center motion-translate-y-in-50 motion-opacity-in-0 motion-delay-500">
          Questions or concerns? Call us at:
          <br />
          <span className="font-semibold">09270251730</span>
        </p>
      </div>
    </div>
  );
}
