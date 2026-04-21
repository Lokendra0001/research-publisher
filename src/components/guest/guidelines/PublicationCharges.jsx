import React from "react";
import { CreditCard, Globe, IndianRupee, Info } from "lucide-react";

const PublicationCharges = () => {
  const inclusions = [
    "Publication of one entire Research Paper Online (Max. 3 authors in basic charges)",
    "Individual certificate soft Copy to all author of paper",

    "Softcopy of Research Paper",
  ];

  return (
    <section className="space-y-8 mt-15 max-w-4xl">
      <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8 pb-2">
        Publication Charges
      </h2>

      <div className="space-y-6 text-text-primary leading-relaxed font-medium">
        <p>
          <span className="font-bold">
            International Journal for Advanced Research in Multidisciplinary
            (IJARMY)
          </span>{" "}
          is an open access journal. To manage the various costs associated with
          journal management, website maintenance, and the publication process,
          a nominal publication fee is charged from the authors.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                <IndianRupee className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary-blue">
                  Indian Authors
                </h4>
                <p className="text-2xl font-bold text-slate-800">₹ 1500</p>
                <p className="text-sm text-slate-500 mt-1">
                  Per Research Paper
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-secondary/10 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary-blue">
                  International Authors
                </h4>
                <p className="text-2xl font-bold text-slate-800">$ 50</p>
                <p className="text-sm text-slate-500 mt-1">
                  Per Research Paper
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-blue flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Inclusions
        </h3>
        <p className="text-text-primary leading-relaxed font-medium">
          The standard publication charges include the following services:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-text-primary font-medium marker:text-primary marker:font-bold">
          {inclusions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      
      <div className="pt-4 border-t border-slate-100 italic text-slate-500 text-sm">
        Last updated: April 2026 | IJARMY Editorial Office
      </div>
    </section>
  );
};

export default PublicationCharges;
