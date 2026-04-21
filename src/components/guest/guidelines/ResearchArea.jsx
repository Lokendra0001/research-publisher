const ResearchArea = () => {
  const categories = [
    {
      title: "All Major Subject (Multidisciplinary)",
      items: [
        "Engineering",
        "Science & Technology",
        "Pharmacy",
        "Biological Science",
        "Applied Mathematics",
        "Physics",
        "Chemistry",
        "Science",
        "Management(MBA)",
        "Commerce",
        "Arts",
        "Medical Science",
        "Life Sciences",
        "Languages",
        "Health Science",
        "Social Science and Humanities",
      ],
    },
    {
      title: "Academic Programs & Degrees",
      items: [
        "Master in MBBS",
        "BAMS (Ayurvedic)",
        "BHMS (Homoeopathy)",
        "Master in BUMS (Unani)",
        "Master in Dental",
        "Master in Veterinary Science & Animal Husbandry (B.VSc AH)",
        "Master in Naturopathy & Yogic Science (BNYS)",
        "Master in Physiotherapy",
        "Master in Integrated M.Sc",
        "Master in Nursing",
        "Master in Dairy Technology",
        "Master in Home Science",
        "Master in Pharmacy",
        "Biotechnology",
        "BOT (Occupational Therapy)",
        "General Nursing",
        "BMLT (Medical Lab Technology)",
        "Paramedical Courses",
        "B.Sc. Degree",
        "BA",
        "LLB (Bachelor of Law)",
        "Education/ Teaching",
        "Travel & Tourism Courses",
        "Environmental Science",
        "Fashion Technology",
        "Hotel Management",
        "Designing Courses",
        "Media/ Journalism Courses",
        "Film/ Television Courses",
        "CA Program",
        "ICWA Program",
        "CS Program",
        "Engineering (B.E/ B.Tech)",
        "B.Arch",
        "Integrated M.Sc",
        "BCA",
        "B.Com",
        "Defence (Navy, Army, Air force)",
        "B.Sc. Degree",
        "B.Des",
        "BA",
        "LLB (Bachelor of Law)",
        "Education/ Teaching",
        "Travel & Tourism Courses",
        "Environmental Science",
        "Fashion Technology",
        "Hotel Management",
        "Designing Courses",
        "Media/ Journalism Courses",
        "Film/ Television Courses",
        "CA Program",
        "ICWA Program",
        "CS Program",
        "Master's Degree",
      ],
    },
    {
      title: "Research Disciplines (All Branches)",
      items: [
        "Engineering, Science & Technology (All Branch)",
        "Pharmacy (All Branch)",
        "Management (All Branch)",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Science (All Branch)",
        "Biological Science (All Branch)",
        "Applied Mathematics",
        "Applied Sciences",
        "Agricultural Sciences",
        "Computer & Information Technology",
        "Medical Sciences",
        "Humanities",
        "Law & Legal Studies",
        "Arts (All Branch)",
        "Arts and Social Science (All Branch)",
        "Commerce (All Branch)",
        "Life Sciences (All Branch)",
        "Languages(All Branch)",
        "Health Science(All Branch)",
        "Social Science(All Branch)",
        "Commerce and Management, MBA (All Branch)",
        "Applied Instrumentation",
        "Education",
        "Environmental Science",
        "Earth & Atmospheric Sciences",
        "Economics",
        "Psychology",
        "Political Science",
        "Sociology",
      ],
    },
    {
      title: "Social Science and Humanities",
      items: [
        "Arts and Humanities",
        "Business Management",
        "Hotel Management",
        "Management",
        "Tourism",
        "Accounting",
        "Decision Science",
        "Education",
        "Economics",
        "Law",
        "Finance",
        "Psychology",
        "Political Science",
        "Physical Education",
        "English Literature",
        "Social Work",
        "History",
      ],
    },
    {
      title: "Life Sciences",
      items: [
        "Agricultural",
        "Biological Sciences",
        "Biotechnology",
        "Biochemistry",
        "Genetics",
        "Molecular Biology",
        "Environmental Science",
        "Ecology",
        "Arachnology",
        "Biodiversity and Conservation",
        "Entomology",
        "Limnology",
        "Ichthyology",
        "Malacology",
        "Immunology and Microbiology",
        "Neuroscience",
        "Marine Biology",
      ],
    },
    {
      title: "Health Science",
      items: [
        "Medicine and Dentistry",
        "Nursing and Health Professions",
        "Pharmacology and Toxicology",
        "Pharmaceutical Science",
        "Veterinary Science",
        "Veterinary Medicine",
      ],
    },
    {
      title: "Physical, Chemical Science and Engineering",
      items: [
        "Chemical Engineering",
        "Chemistry",
        "Computer Science",
        "Earth and Planetary Science",
        "Energy",
        "Mathematics",
        "Physics and Astronomy",
        "Engineering",
        "Material Science",
        "Statistics",
      ],
    },
  ];

  return (
    <section className="space-y-3 mt-15">
      <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8 ">
        Research Areas
      </h2>
      <p className="text-text-primary">
        <span className="font-bold">Aim-</span>The basic aim of this journal is
        to provide platform for the researcher, innovators, scholars and
        students to share their research through worldwide with us. We promote
        research in all disciplines and the advancement of knowledge and
        understanding. This journal will provide a quality readable and valuable
        addition to the knowledge this will serve as resources for researchers
        along with to provide support to the scholars to enable them to
        undertake and disseminate their research and to help them for
        development of their own skills of reasoning and understanding. It is a
        peer-reviewed journal aspiring to publish high quality of original
        Research Articles, Review Articles, Survey Articles, Case Study,
        Technical Notes and Short Communication. The preference will be given to
        the research articles and articles which contains advance research
        concepts which will be helpful to the society.
        <br />
        <br />
        <span className="font-bold">Scope-IJARMY</span> which is cross
        boundaries between different faculties. IJARMY is the place for exchange
        of information and research results within the following scope: (But are
        not limited to the following)
      </p>

      <div className="space-y-8 mt-6">
        {categories.map((category, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-xl font-bold text-primary-blue mb-4 border-l-4 border-primary-blue pl-3">
              {category.title}
            </h3>
            <ul className="list-disc pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-text-primary font-medium">
              {category.items.map((item, index) => (
                <li key={index} className="break-words">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchArea;
