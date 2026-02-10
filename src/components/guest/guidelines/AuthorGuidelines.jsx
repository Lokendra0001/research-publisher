import CommonGuide from "./CommonGuide";

const GuidelinesForAuthors = () => {

    return (
        <section className="space-y-3 mt-15">
            <CommonGuide
                data={{
                    title: "Guidelines for Author",
                    blocks: [
                        {
                            heading: "A. Paper Submission",
                            type: "paragraph",
                            text: "Authors will be required to submit, MS-Word compatible (.doc, .docx), papers electronically after logging in at our portal and accessing the submit paper link, available at Online Submission. Once the paper is uploaded successfully, our automated Paper Submission System assigns a Unique Paper ID, acknowledges it on the screen and also sends an acknowledgement email to the author at her/his registered email ID. The authors must quote /refer the paper ID in all future correspondences."
                        },
                        {
                            heading: "B. Paper Format and Page Layout",
                            type: "paragraph",
                            text: "While preparing and formatting papers, authors must confirm to the under-mentioned MS-Word (.doc, .docx) format:- We strongly recommend authors to submit manuscript via our online submission and review system. Authors may suggest three reviewers. Please provide the name, postal address, e-mail address, telephone and fields of interest of suggested reviewers. Authors may also suggest that specific individuals not be involved as reviewers, but IJARMY reserves the right of final selection. Any technical queries will be referred back to the author, although the Editors reserve the right to make alterations in the texts without altering the technical content."
                        },
                        {
                            type: "list",
                            items: [
                                "All manuscripts must be in English and in MS-Word (.doc, .docx) format",
                                "The total length of the paper, including references and appendices, must not exceed six (25) Letter Size pages. It should be typed on one-side with double column, single-line spacing, 10 font size, Times New Roman, in MS Word (.doc/.docx).",
                                "The Top Margin should be 1.52 cm”, Bottom 1.27 cm”, Left2.03 cm”, and Right 2.03cm”. Page layout should be portrait with 0.5 Header and Footer margins.Select the option for different Headers and Footers for Odd and Even pages and different for First page in Layout (under Page Setup menu option of MS Word). Authors are not supposed to write anything in the footer.",
                                "The title in bold should appear in single column on the first page in 16Font size, below which the name of the author(s), 12 font size, name of affiliation (Department name, College/University/Institute) 10 font size and email id should be provided centrally aligned in 09 font size.",
                                "To avoid unnecessary errors, the authors are strongly advised to use the 'spell-check' and 'grammar-check' functions of the word processor.",
                                "Author should be typed references in single-line spacing, 9 font size.",
                                "Complete author’s profile with clear photographs",
                                "The complete template has been prepared and is available at: “Download Section”."
                            ]
                        },
                        {
                            heading: "C. Structure of Paper",
                            type: "paragraph",
                            text: "The structure of the paper should be based on the following details:-"
                        },
                        {
                            heading: "Essential Title Page Information",
                            type: "paragraph",
                            text: "The structure of the paper should be based on the following details:-"
                        },
                        {
                            type: "list",
                            items: [
                                "Title: Title should be Concise and informative. Avoid abbreviations and formulae to the extent possible.",
                                "Authors’ Names and Affiliations:Present the authors' affiliation addresses (where the actual work was done) below their names. Indicate all affiliations with a lower-case superscript letter immediately after the author's name and in front of the appropriate address. Provide the full postal address of each affiliation, including the country name and e-mail address of each author.",
                                "Corresponding author:Clearly indicate who will handle correspondence at all stages of refereeing and publication. Ensure that phone numbers (with country and area code) are provided in addition to the e-mail address and the complete postal address."
                            ]
                        },
                        {
                            heading: "Abstract",
                            type: "paragraph",
                            text: "A concise abstract not exceeding 180-240 words is required for original articles and other article types. The abstract should be structured for original articles. The abstract should state briefly the purpose of the research, settings and design, material and methods, statistical analysis used, the principal results and conclusions. The abstract should not be structured for a brief report, review article, symposia and research methodology. Do not include references in abstract. As a last paragraph of the abstract, should provide 5 to 10 Keywords/Index Terms. Under the heading Index Terms (Index Terms/Key words - …….) must be provided."
                        },
                        {
                            heading: "Nomenclature",
                            type: "paragraph",
                            text: "Define all the abbreviations that are used in the paper and present a list of abbreviations with their definition in Nomenclature section. Ensure consistency of abbreviations throughout the article. Do not use any abbreviation in the paper, which has not been defined and listed in Nomenclature section."
                        },
                        {
                            heading: "Subdivision - Numbered Sections",
                            type: "paragraph",
                            text: "Divide article into numbered Sections as I, II, II, …... and its heading should be written in CAPITAL LETTERS. The Subsections should be numbered I.I (then I.I.I, I.I.II ...), I.II, etc. and should be written in Title Case. The Abstract, Nomenclature, Appendix, Acknowledgement and References will not be included in section numbering. In fact, section numbering will start from Introduction and will continue till Conclusion. The Subsections should also be given a brief heading, written in title case, and should appear in separate line. All headings of sections and subsections should be left aligned."
                        },
                        {
                            heading: "Introduction",
                            type: "paragraph",
                            text: "Introduction should lead the reader to the importance of the study; tie-up published literature with the aims of the study and clearly states the rationale behind the investigation. It should state the purpose and summarize the rationale for the study and gives a concise background. Use references to provide the most salient background rather than an exhaustive review. The last sentence should concisely state your purpose for carrying out the study or a summary of the results."
                        },
                        {
                            type: "paragraph",
                            text: "As a last paragraph of the introduction should provide organization of the paper/article (Rest of the paper is organized as follows, Section I contains the introduction of ……. , Section II contain the related work of ………, Section III contain the some measures of …….., Section IV contain the architecture and essential steps of ………., section V explain the ………… methodology with flow chart, Section VI describes results and discussion ….., Section VII contain the recommendation of ……… and Section VIII concludes research work with future directions)."
                        },
                        {
                            heading: "Related Work",
                            type: "paragraph",
                            text: "In this section, the author describes the previous research works in the form of title, problem statement, objectives, not repeat the information discussed in Introduction."
                        },
                        {
                            heading: "Theory/Calculations",
                            type: "paragraph",
                            text: "In this section should extend, not repeat the information discussed in Introduction. In contrast, a Calculation Section represents a practical development from a theoretical basis."
                        },
                        {
                            heading: "Methodology",
                            type: "paragraph",
                            text: "This section includes the details about your proposed method, flowchart, proposed models or techniques and others."
                        },
                        {
                            heading: "Result",
                            type: "paragraph",
                            text: "This section should present clearly but succinctly the experimental findings. Only results essential to establish the main points of the work should be included. Results should be presented in a logical sequence in the form of table, graph, figure, case study, chart etc.Numerical data should be analysed using appropriate simulation or statistical tools and techniques. Figures/Tables/Flowcharts/Equations/Formulas should draw the pictures himself. Please do not give scanned equation/formula"
                        },
                        {
                            heading: "Discussion",
                            type: "paragraph",
                            text: "The discussion section should be as concise as possible and should include a brief statement of the principal findings, a discussion of the strength of the findings, a discussion of the findings in light of other published work dealing with the same or closely related subjects, and a statement of the possible significance of the work. Extensive discussion of the literature is discouraged."
                        },
                        {
                            heading: "Conclusion And Future Scope",
                            type: "paragraph",
                            text: "The main conclusions of the study may be presented in a short Conclusion Section. In this section, the author(s) should also briefly discuss the limitations of the research and Future Scope for improvement."
                        },
                        {
                            heading: "Appendix(Define last page of paper)",
                            type: "paragraph",
                            text: "If there are multiple appendices, they should be identified as A, B, etc. Formulae and equations in appendices should be given separate numbering: Eq. (A.1), Eq. (A.2), etc.; in a subsequent appendix, Eq. (B.1) and so on. Similar nomenclature should be followed for tables and figures: Table A.1; Fig. A.1, etc."
                        },
                        {
                            heading: "Acknowledgement",
                            type: "paragraph",
                            text: "If desired, authors may provide acknowledgements at the end of the article, before the references. The organizations / individuals who provided help during the research (e.g. providing language help, writing assistance, proof reading the article, sponsoring the research, etc.) may be acknowledged here"
                        },
                        {
                            heading: "References[should provide 08 minimum References]",
                            type: "paragraph",
                            text: "List and number all bibliographical references in 9-point Times, single-spaced, at the end of your paper. When referenced in the text, enclose the citation number in square brackets, for example [1]. Where appropriate, include the name(s) of editors of referenced books. The template will number citations consecutively within brackets [1]. The sentence punctuation follows the bracket [2]. Refer simply to the reference number, as in [3]-do not use \"Ref. [3]\" or \"reference [3]\" except at the beginning of a sentence: \"Reference [3] was the first . . .\" Number footnotes separately in superscripts. Place the actual footnote at the bottom of the column in which it was cited. Do not put footnotes in the reference list. Use letters for table footnotes. Unless there are six authors or more give all authors' names; do not use \"et al.\". Papers that have not been published, even if they have been submitted for publication, should be cited as \"unpublished\" [4,5]. Papers that have been accepted for publication should be cited as \"in press\" [6.7]. Capitalize only the first word in a paper title, except for proper nouns and element symbols. For papers published in translation journals, please give the English citation first, followed by the original foreign-language citation [8]."
                        },
                        {
                            heading: "Citation IN Text",
                            type: "paragraph",
                            text: "Please ensure that every reference cited in the text is also present in the reference list (and vice versa). The references in the reference list should follow the standard IJARMY/ IEEE reference style of the journal and citation of a reference. IJARMY except only book, journal, and conference papers for citation; please do not use websites URL references in the references section."
                        },

                    ]
                }}
            />

            <div className="space-y-6">
                <ul>
                    <li className="ml-8 lg:ml-20 list-disc font-bold  my-2">Format for Journal Paper</li>
                    <p className="pl-10 lg:pl-25 text-text-primary leading-relaxed font-medium">Syntax: &lt;First character of name & First character of Middle name&gt;. &lt;Surname&gt;, “title of paper”, Journal Name, Vol. X(Issue/No), pp.&lt;Page no&gt;, &lt;Year&gt;. Example: S. K. Sharma, L. Gupta, “A Novel Approach for Cloud Computing Environment”, International Journal of Computer Sciences and Engineering, Vol. 4, Issue.,12, pp.1-5, 2014.</p>
                </ul>
                <ul>
                    <li className="ml-8 lg:ml-20 list-disc font-bold  my-2">Format for Book/Book Chapter</li>
                    <p className="pl-10 lg:pl-25 text-text-primary leading-relaxed font-medium">Syntax: &lt;First character of name & First character of Middle name&gt;. &lt;Surname&gt;, “title of book”, &lt;Publisher Name&gt;, &lt;Publisher location&gt;, pp.&lt;page no&gt;, &lt;Year&gt;. Example: K. Gupta, “A Proposed New Approach for Cloud Environment using Cryptic rules”, ISROSET Publisher, India, pp. 542-545, 2016.</p>
                </ul>
                <ul>
                    <li className="ml-8 lg:ml-20 list-disc font-bold  my-2">Format for Conference Paper</li>
                    <p className="pl-10 lg:pl-25 text-text-primary leading-relaxed font-medium">Syntax: &lt;First character of name & First character of Middle name&gt;. &lt;Surname&gt;, “&lt;title of Paper&gt;”, &lt;Conference title or name&gt;, &lt;Conference location (country)&gt;, pp.&lt;page no&gt;, &lt;Year&gt;. Example: S.L. Mewada, “A Proposed New Approach for Cloud Environment using Cryptic Techniques” In the Proceedings of the 2016 International Conference on Computer Science and Engineering, India, pp.542-545, 2016.</p>
                </ul>

                <ul className="pl-8 lg:pl-25 list-disc  space-y-2 font-medium">
                    <li>Invalid (websites URL) references remove or replaced by Journal references.</li>
                    <li>Add at least one reference paper from past IJARMY Issues.</li>
                </ul>

                <div>
                    <h3 className="text-xl text-primary-blue font-bold  my-6">Author Biographies</h3>
                    <p className="text-text-primary leading-relaxed font-medium">IJARMY is now Publishing Biographies with Photographs of authors at the conclusion of every published article. For every author on a given paper, it is required that a biography no longer than 100 words be included at the end of the paper. Author biographies should be ordered according to the order of authors on the paper. For Example: Mr. C T Lin pursed B.Tech., M.Tech., and Ph.D. Physical Science from IIT, Bombay in 1998, 2002 & 2008. He is currently working as Professor in Department of Physical Science from IIT, Bombay since 2010. He is a member of IEEE & IEEE computer society since 2013, Life member of ACM since 2011 and a life member of the IJARMY since 2015. He has published more than 50 research papers in reputed international journals including Thomson Reuters (SCI & Web of Science) and conferences including IEEE and it’s also available online. His main research work focuses on Cryptography Algorithms, Network Security, Cloud Security and Privacy, Big Data Analytics, Data Mining, IoT and Computational Intelligence based education. He has 15 years of teaching experience and 10 years of research experience.</p>
                </div>

                <div>
                    <h3 className="text-xl text-primary-blue font-bold  my-6">D. Copy Right</h3>
                    <p className="text-text-primary leading-relaxed font-medium">Copyright of all accepted papers will belong to IJARMY and the author(s) must affirm that accepted Papers for publication in IJARMY must not be re-published elsewhere without the written consent of the editor. To comply with this policy, authors will be required to submit a signed copy of Copyright Transfer Form, available at Download Section ,after acceptance of their paper, before the same is published</p>
                </div>

                <div>
                    <h3 className="text-xl text-primary-blue font-bold  my-6">E. Final Proof of the Paper</h3>

                    <p className="text-text-primary leading-relaxed font-medium">One set of page proofs (as PDF files) will be sent by e-mail to the corresponding author or a link will be provided in the e-mail so that the authors can download the files themselves. These PDF proofs can be annotated; for this you need to download Adobe Reader version 7 (or higher) available free from <a href="http://get.adobe.com/reader" className="text-blue-600 hover:underline">http://get.adobe.com/reader</a> . If authors do not wish to use the PDF annotations function, they may list the corrections and return them to IJARMY in an e-mail. Please list corrections quoting line number. If, for any reason, this is not possible, then mark the corrections and any other comments on a printout of the proof and then scan the pages having corrections and e-mail them back, within 05 days. Please use this proof only for checking the typesetting, editing, completeness and correctness of the text, tables and figures. Significant changes to the paper that has been accepted for publication will not be considered at this stage without prior permission. It is important to ensure that all corrections are sent back to us in one communication: please check carefully before replying, as inclusion of any subsequent corrections cannot be guaranteed. Proofreading is solely authors’ responsibility. Note that IJARMY will proceed with the publication of paper, if no response is received within 05 days If you have any questions please feel free to contact us: editor@ijarmy.com</p>
                </div>
            </div>
        </section>
    );
};

export default GuidelinesForAuthors;