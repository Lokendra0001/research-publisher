const PlagiarismPolicy = () => {
    return (
        <section className="space-y-6 mt-15">
            <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8">
                Plagiarism Policy
            </h2>

            <div className="space-y-6 text-text-primary leading-relaxed font-medium">
                <p>
                    Plagiarism is the unethical act of copying someone else's prior ideas, processes, results or words without explicit acknowledgement of the original author and source. Self-plagiarism occurs when an author utilizes large part of his/her own previously published work without using appropriate references. This can range from getting the same manuscript published in multiple journals to modifying a previously published manuscript with some new data.
                </p>

                <p>
                    <span className="font-bold">International Journal for Advanced Research in MultidisciplinarY,</span> is a peer reviewed indexed Quarterly online journal having ISSN 2583-794X, being published since 2022. The journal is strictly against any unethical act of copying or plagiarism in any form. Plagiarism is said to have occurred when large portions of a manuscript have been copied from existing previously published resources. <span className="text-red-500 font-bold">All manuscripts submitted for publication to IJARMY are cross-checked for Plagiarism / Similarity Index using Turnitin / Plagiarism CheckerX software.</span> Manuscripts found to be plagiarized during initial stages of review are out-rightly rejected and not considered for publication in the journal.
                </p>

                <p>
                    In case a manuscript is found to be plagiarized after publication, the Editor-in-Chief will conduct preliminary investigation, may be with the help of a suitable committee constituted for the purpose. If the manuscript is found to be plagiarized beyond the acceptable limits, the journal will contact the author's Institute / College / University and Funding Agency, if any. A determination of misconduct will lead IJARMY to run a statement bi-directionally linked online to and from the original paper, to note the plagiarism and provide a reference to the plagiarized material. The paper containing the plagiarism will also be marked on each page of the PDF. Upon determination of the extent of plagiarism, the paper may also be formally retracted.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary-blue">Types of Plagiarism</h3>
                <p className="text-text-primary leading-relaxed font-medium">The following types of plagiarism are considered by IJARMY:-</p>
                <ol className="list-decimal pl-6 space-y-2 text-text-primary font-medium marker:font-bold">
                    <li><span className="font-bold">Full Plagiarism:</span> Previously published content without any changes to the text, idea and grammar is considered as full plagiarism. It involves presenting exact text from a source as one’s own.</li>
                    <li><span className="font-bold">Partial Plagiarism:</span> If content is a mixture from multiple different sources, where the author has extensively rephrased text, then it is known as partial plagiarism.</li>
                    <li><span className="font-bold">Self-Plagiarism:</span> When an author reuses complete or portions of their pre-published research, then it is known as self-plagiarism. Complete self-plagiarism is a case when an author republishes their own previously published work in a new journal.</li>
                </ol>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary-blue">IJARMY Policy for Plagiarism</h3>
                <p className="text-text-primary leading-relaxed font-medium">
                    IJARMY respects intellectual property and aims at protecting and promoting original work of its authors. Manuscripts containing plagiarized material are against the standards of quality, research and innovation. Hence, all authors submitting articles to IJARMY are expected to abide ethical standards and abstain from plagiarism, in any form. In case, an author is found to be suspected of plagiarism in a submitted or published manuscript then;
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-text-primary font-medium marker:font-bold">
                    <li>IJARMY shall contact the author (s) to submit his / her (their) explanation within two weeks, which may be forwarded to the <span className="font-bold">Fact Finding Committee (FFC)</span> constituted for the purpose, for further course of action.</li>
                    <li>If IJARMY does not receive any response from the author within the stipulated time period, then the Director / Dean / Head of the concerned College, Institution or Organization or the Vice Chancellor of the University to which the author is affiliated shall be contacted to take strict action against the concerned author.</li>
                </ol>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary-blue">Policy and Action</h3>
                <p className="text-text-primary leading-relaxed font-medium">
                    IJARMY shall take serious action against published manuscripts found to contain plagiarism and shall completely remove them from IJARMY website and other third party websites where the paper is listed and indexed. The moment, any article published in IJARMY database is reported to be plagiarized, IJARMY will constitute a Fact Finding Committee (FFC) to investigate the same. Upon having established that the manuscript is plagiarized from some previously published work, IJARMY shall support the original author and manuscript irrespective of the publisher and may take any or all of the following immediate actions or follow the additional course of actions as recommended by the committee:-
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-text-primary font-medium marker:font-bold">
                    <li>IJARMY editorial office shall immediately contact the Director / Dean / Head of the concerned College, Institution or Organization or the Vice Chancellor of the University to which the author(s) is (are) affiliated to take strict action against the concerned author.</li>
                    <li>IJARMY shall remove the PDF copy of the published manuscript from the website and disable all links to full text article.</li>
                    <li>The term <span className="font-bold">Plagiarized Manuscript</span> shall be appended to the published manuscript title.</li>
                    <li>IJARMY shall disable the author account with the journal and reject all future submissions from the author for a period of 03 / 07 / 14 years or even ban the authors permanently.</li>
                    <li>IJARMY may also display the list of such authors along with their full contact details on the IJARMY website.</li>
                    <li>Any other course of action, as recommended by the Committee or as deemed fit for the instant case or as decided by the Editorial Board, from time to time.</li>
                </ol>
            </div>
        </section>
    );
};

export default PlagiarismPolicy;
