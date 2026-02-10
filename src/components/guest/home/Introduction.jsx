import React from 'react';

const SectionTitle = ({ children }) => (
    <h3 className="text-xl font-bold text-primary border-b-2 border-primary/40 pb-1 mb-3 mt-8 first:mt-0">
        {children}
    </h3>
);

const Paragraph = ({ children }) => (
    <p className="text-text-primary text-sm leading-relaxed mb-4 text-justify">
        {children}
    </p>
);

const Introduction = () => {
    return (
        <div className="w-full">
            <SectionTitle>Introduction</SectionTitle>
            <Paragraph>
                International Journal for Advanced Research in Multidisciplinary domains, is an open accessed, scholarly peer-reviewed, and academic research journal for scientists, engineers, research scholars, and academicians, which gains a foothold in Asia and opens to the world, aims to publish original, theoretical and practical advances in Computer Science, Information Technology, Engineering (Software, Mechanical, Civil, Electronics & Electrical), Management and Information Sciences and all interdisciplinary streams. It aims to bridge the significant gap between research and practice by promoting the publication of original, novel, industry-relevant research.
            </Paragraph>
            <Paragraph>
                Authors are cordially invited to submit full length paper, Original and unpublished research articles, based on theoretical or experimental works, are solicited for publication in the journal. Submission of article implies that the work described has not been published previously (except in the form of an abstract or academic thesis) and is not under consideration for publication elsewhere.
            </Paragraph>

            <SectionTitle>Why Publish Here</SectionTitle>
            <Paragraph>
                IJARMY publishes articles that are of high interest to readers-original, novelty, completeness, relevance, significance, technically correct, and clearly presented. The scope of this all-electronic, archival publication comprises all IJARMY fields of interest, emphasizing applications-oriented and interdisciplinary articles.
            </Paragraph>
            <Paragraph>
                IJARMY makes it easy for practitioners, researchers, institutions, funding agencies, and others to make published information available to everyone via one of the most prestigious and growing technical publishers in the world. IJARMY, an open access publishing facilitates dissemination to those who seek direct access to an author's research results.
            </Paragraph>

            <SectionTitle>Abstracting and Indexing</SectionTitle>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-sm text-gray-700">
                <li>Emerging Sources Citation Index (in process)</li>
                <li>Indian Citation Index</li>
                <li>ROAD: the Directory of Open Access scholarly Resources</li>
                <li>Research Gate</li>
                <li>A UGC Recognized Journal</li>
                <li>Google Scholar</li>
                <li>Academia Database</li>
                <li>DPI Digital Library</li>
            </ul>
            <Paragraph>
                Prospective authors should note that only original and previously unpublished research papers will be considered. Furthermore, simultaneous submissions (under consideration for publication elsewhere) are not acceptable. Submission of a manuscript is interpreted as a statement of certification that no part of the manuscript is copyrighted by any other publication nor is under review by any other formal publication. It is the primary responsibility of the author to obtain proper permission for the use of any copyrighted materials in the manuscript, prior to the submission of the manuscript to IJARMY.
            </Paragraph>

            <SectionTitle>About IJARMY</SectionTitle>
            <Paragraph>
                IJARMY is a multi-disciplinary journal, publishing only original research papers and articles from all the respective educational segments and publishing in multiple Languages. Our dedicated, experienced team incorporates innovative ideas and successful strategies. Since 2022, we are educational journal publishing research papers and articles, created and submitted by the students, scholars, researchers and professors.
            </Paragraph>
            <Paragraph>
                Since 2022, IJARMY has been representing the creative and talented individuals and their ideas across a wide array of education segment. IJARMY is an International Refereed Peer Reviewed Educational Research Journal which is being managed by JUMP2LEARN Publication. JUMP2LEARN Publication is engaged with the educational segment and is providing the services like Book Publications, Articles and Research paper publishing.
            </Paragraph>
        </div>
    );
};

export default Introduction;
