import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Disclaimer",
  description: "Read our privacy policy, terms of service, and student project disclaimer.",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Policies & Disclaimer</h1>
      
      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Student Project Disclaimer</h2>
          <p className="mt-2 text-slate-600">
            This website is a student project created for the course **NIT3274** at 
            **James Cook University**. It is not a real business, and no actual repair 
            services are being offered or fulfilled through this platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Privacy Policy</h2>
          <p className="mt-2 text-slate-600">
            As a student project, we do not intentionally collect or sell personal 
            data for commercial purposes. Any data entered is used solely for the 
            demonstration of functionality within the scope of the university assignment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Terms of Service</h2>
          <p className="mt-2 text-slate-600">
            By using this demo site, you acknowledge its status as a non-commercial 
            educational project.
          </p>
        </section>
      </div>
    </div>
  );
}
