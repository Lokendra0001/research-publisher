import React from "react";

const CopyrightForm = () => {
  return (
    <section className="space-y-8 mt-15 max-w-4xl font-sans">
      <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8 pb-2">
        Copyright Form
      </h2>

      <div className="space-y-6 text-text-primary leading-relaxed font-medium">
        <p>
          Each author must read and sign the following statements. Completed
          statements should be sent to the Editorial Office through the online
          manuscript submission system.
        </p>

        <p className="italic">
          By submitting your work, you signify that you have read and agreed to
          the following terms.
        </p>

        <ol className="list-decimal pl-6 space-y-6 marker:font-bold">
          <li>
            While there is no page-charge for the publication of your article by{" "}
            <span className="font-bold">
              International Journal for Advanced Research in Multidisciplinary
              (IJARMY)
            </span>
            , you hereby agree to grant to IJARMY an irrevocable nonexclusive
            license to publish in print and electronic format, and further
            sublicense the article, for the full legal term of copyright and any
            renewals thereof in all languages throughout the world in all
            formats, and through any medium of communication.
          </li>

          <li>
            You shall retain the perpetual royalty-free right to reproduce and
            publish in print and electronic format, and further sublicense the
            article in all languages throughout the world in all formats, and
            through any medium of communication provided that you make reference
            to the first publication by IJARMY.
          </li>

          <li>
            You agree to indemnify IJARMY against any claims in respect of the
            below warranties.
            <ul className="list-disc pl-6 mt-4 space-y-3 marker:text-primary">
              <li>You warrant that the article is your original work.</li>
              <li>
                You warrant that you are the sole author(s) of the article and
                have full authority to enter into this Agreement and in granting
                rights to IJARMY that are not in breach of any other obligation.
              </li>
              <li>
                You warrant that the article is submitted for first publication
                in the journal and that it is not being considered for
                publication elsewhere and has not already been published
                elsewhere, either in printed or electronic form.
              </li>
              <li>
                You warrant that you have obtained all necessary permissions for
                the reproduction of any copyright works (including artistic
                works, e.g., illustrations, photographs, charts, maps, and other
                visual material) contained in the article and not owned by you
                and you have acknowledged all the sources.
              </li>
              <li>
                You warrant that the article contains no violation of any
                existing copyright, other third party rights, or any libelous
                statements, and does not infringe any rights of others.
              </li>
              <li>
                You warrant that the Contribution contains no violation of any
                existing copyright, other third party rights, or any libelous
                statements, and does not infringe any rights of others.
              </li>
              <li>
                You warrant that you have taken due care to ensure the integrity
                of the article so that to your and currently accepted scientific
                knowledge all statements contained in it purporting to be facts
                are true and any formula or instruction contained in the article
                will not, if followed accurately, cause any injury, illness, or
                damage to the user.
              </li>
            </ul>
          </li>

          <li>
            While understanding that copyright remains your own as the author,
            you hereby authorize IJARMY to act on your behalf to defend your
            copyright should it be infringed, and to retain half of any damages
            awarded, after deducting costs.
          </li>

          <li>
            No amendment or modification of any provision of this Agreement
            shall be valid or binding unless made in writing and signed by all
            parties. This Agreement constitutes the entire agreement between the
            parties with respect to its subject matter, and supersedes all
            previous agreements, understandings, and representations. The
            invalidity or unenforceability of any particular provision of this
            Agreement shall not affect the other provisions, and this Agreement
            shall be construed in all respects as if any invalid or
            unenforceable provision was omitted.
          </li>
        </ol>

        <div className="mt-12 space-y-6 border-t pt-8">
          <p className="font-bold">
            The authorized author has certified the agreement to all above
            statements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-8">
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-sm text-slate-500 block mb-1">
                  Authorized author’s name
                </span>
                &nbsp;
              </div>
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-sm text-slate-500 block mb-1">
                  Position
                </span>
                &nbsp;
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-sm text-slate-500 block mb-1">
                  Signature
                </span>
                &nbsp;
              </div>
              <div className="border-b border-dotted border-slate-400 pb-1">
                <span className="text-sm text-slate-500 block mb-1">Date</span>
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-center no-print">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
        >
          Print or Download PDF
        </button>
      </div>
    </section>
  );
};

export default CopyrightForm;
