import React from 'react';
import Link from 'next/link';

const CallPaper = () => {
    return (
        <div className="bg-primary-foreground p-2 md:p-6 rounded-lg md:shadow-sm md:border border-border mt-6">
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">
                Call Paper
            </h2>

            <div className="space-y-4 text-text-primary text-sm leading-relaxed text-justify">
                <p>
                    IJARMY solicits original or unpublished research papers/articles, review articles, and survey papers to our
                    upcoming Edition issue. Authors are cordially invited to submit their original or unpublished, experimental,
                    theoretical research paper through the Online Submission procedure available at our website. It is a step easy
                    and fast process of submission which will give rapid processing to your submitted articles. To submit the
                    manuscript through the online procedure, please register yourself by filling a simple registration form and enjoy
                    the benefits of our services.
                </p>

                <div className="py-2">
                    <Link href="/author/role?page=new_submission" className="bg-primary/90 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-primary transition-colors">
                        Online Submission
                    </Link>
                </div>

                <p>
                    All the submitted papers are first reviewed at the editorial board level and assessed on the basis of their
                    technical suitability for the journal, scope of work, and plagiarism. If selected by the editorial board, the paper
                    shall be subjected to a fair and unbiased double-blind peer review by at least two referees on the basis of their
                    originality, novelty, clarity, completeness, relevance, significance and research contribution. The review process
                    may take 02 to 4 weeks depending upon the cycles of review required before the paper is finally accepted.
                    Please refer to <span className="font-bold">Authors Guidelines</span> for details of the reviewing process and to submit your papers please refer
                    to the Online Submission System.
                </p>

                <div>
                    <h3 className="text-start text-lg font-bold text-primary mt-6 mb-3">Article/Paper Acceptance Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The article is presented in an intelligible fashion and is written in IJARMY Template.</li>
                        <li>The article should be original writing that enhances the existing body of knowledge in the given subject area. Original review articles and surveys are acceptable, even if new data/concepts are not presented.</li>
                        <li>Results reported have not been submitted or published elsewhere (although expanded versions of conference publications are eligible for submission).</li>
                        <li>Experiments, statistics, and other analyses are performed to a high standard and are described in sufficient detail.</li>
                        <li>Conclusions are presented in an appropriate fashion and are supported by the data.</li>
                        <li>Figure/Image should be showing clearly and clearly mention figure name and numbers in increasing order.</li>
                        <li>Equation/Formula should be in Math's equation Software or word Equation.</li>
                        <li>Please do not give a scanned copy of the equation/formula. The tables should be in MS Word. Please do not give a scanned copy of the tables.</li>
                        <li>Appropriate references to related prior published works must be included in IJARMY Standard.</li>
                        <li>All the references should be mentioned inside the paragraph in IJARMY/IEEE format. References must be serially numbered and should be arranged in increasing order of number quoted in the text. References must be quoted in the text as numerals at the end of the sentence, before full stop, with bracket e.g. ......solution [1]. It is an international journal [2],[3],[4],[5],[6]. ......., [N] that is increasing order. You have started references form [9],[1],[2],[3],[4],[7],[4],[5],[6] this is not correct.</li>
                        <li>Websites URL and invalid/incomplete references/citations replaced by the references of the Journal or remove from the reference section.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-primary mt-6 mb-3">Common Reasons for Rejection</h3>

                    <p className="italic font-semibold mb-2 decoration-black underline">Technical reasons for rejection include:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Incomplete data such as too small a sample size or missing or poor controls</li>
                        <li>Poor analysis such as using inappropriate statistical tests or a lack of statistics altogether</li>
                        <li>Inappropriate methodology for answering your hypothesis or using the old methodology that has been surpassed by newer, more powerful methods that provide more robust results</li>
                        <li>Weak research motive where your hypothesis is not clear or scientifically valid or your data does not answer the question posed</li>
                        <li>Inaccurate conclusions on assumptions that are not supported by your data</li>
                    </ul>

                    <p className="italic font-semibold mb-2 decoration-black  underline">Technical reasons for rejection include:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Out of scope for the journal</li>
                        <li>Not enough of an advance or of enough impact for the journal</li>
                        <li>Research ethics ignored such as consent from patients or approval from an ethics committee for animal research</li>
                        <li>Lack of proper structure or not following journal formatting requirements</li>
                        <li>Lack of the necessary detail for readers to fully understand and repeat the authors' analysis and experiments</li>
                        <li>Lack of up-to-date references or references containing a high proportion of self-citations</li>
                        <li>Has poor language quality such that it cannot be understood by readers</li>
                        <li>Difficult to follow logic or poorly presented data.</li>
                        <li>Violation of publication ethics</li>
                    </ul>
                </div>

                <div className="pt-4 mt-6 border-t border-border">
                    <p className="font-medium">
                        For any information, Please contact Editorial support Team at <a href="mailto:ijarmy.submission@gmail.com" className="text-primary-blue hover:underline">ijarmy.submission@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CallPaper;
