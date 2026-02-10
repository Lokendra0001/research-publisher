const ResearchArea = () => {
    const categories = [
        {
            title: "Computer Science Engineering and Technology",
            items: [
                "Advanced Algorithms", "Applications of Computer Science", "Architecture Evaluations", "Artificial intelligence", "Automation and Mobile Robots", "Bioengineering", "Bioinformatics", "Blue-Tooth Technologies", "Brain machine Interface System", "Brain Mapping",
                "Cloud Computing", "Computational Biology", "Computational linguistics", "Computational Statistics", "Computational Mathematics", "Computer Graphics", "Computer Applications", "Computer Architecture", "Compiler", "Computer Software / Hardware",
                "Cyber-Science and Cyber-Space", "Data and Information Systems", "Data Bases and its applications", "Data Compression", "Data Engineering", "Data Fusion", "Data Mining", "Data Warehousing", "Databases", "Design of Algorithms",
                "Digital Speech Processing", "Distributed Data Base", "Distributed Knowledge-base Systems", "Distributed Multimedia"]
        },
        {
            title: "Computer Network",
            items: ["Ad hoc & sensor networks", "Adaptive applications", "Admission/Congestion/Flow Control", "Authentication, authorization, accounting",
                "Broadband Communications", "Broadband Networks", "Channel Estimation and Cancellation", "Communication", "Communication Software", "Communication Systems Architectures and Protocols", "Congestion & flow control", "Congestion Management", "Cross-layer optimization", "Embedded networks", "High-speed access networks", "Home and SOHO networks", "Interconnection Networks", "Internet and distributed computer systems", "Internet and Web Applications", "IPv6 deployment & migration",
                "Local area networks", "Location-dependent services", "Microwaves, Antennas, Propagation",]

        },
        {
            title: "Mobile Computing",
            items: ["Mobility management", "Distributed Real Time Systems", "E-commerce", "Education Technology and Training", "Educational Software", "Embedded Systems & Applications",
                "Environmental Protection", "Fault Tolerance", "Genetic Algorithms", "Genomics", "Granular Computing", "Grid & Parallel computing", "High performance computing", "High Performance Languages",
            ]
        },
        {
            title: "Multimedia Computing",
            items: ["AI and Image Recognition", "Audio Analysis, Modeling, Processing and Transformation", "Content-Based Image Retrieval", "Distributed Multimedia System", "Image Clustering", "Image Modeling and Editing", "Interfaces for Multimedia Creation",
                "Media Fusion for Communication and Presentation", "Modelling and Simulation", "Multimedia", "Multimedia Coding and Encryption", "Multimedia Databases", "Human Centered Transportation System (Special Session)", "Human computer Interaction",
                "Image Processing", "Industrial Applications", "Information Technology", "Information Theory", "Intelligent Agents", "Intelligent Internet System", "Intelligent Learning in Control System", "Intelligent Power & Energy System", "Intelligent Systems",
                "Intelligent Transportation System",
            ]
        },

        {
            title: "Computational Mathematics",
            items: ["Algorithms and Implementations", "Analysis of Mathematics", "Applications in CAGD / CAD, robotics, and computer vision", "Authoring languages and tools", "Automated mathematical reasoning", "Automated Reasoning",
                "Challenges and solutions for mathematical workflow", "Collaboration tools for mathematics", "Computational algebra and geometry", "Computational Differential Equations"
            ]
        },
        {
            title: "Computational Oriented",
            items: ["Cheminformatics", "Chemometrics", "Computational biology", "Computational chemistry",
                "Computational economics", "Computational electromagnetics", "Computational engineering", "Computational finance", "Computational fluid dynamics", "Computational forensics", "Computational geophysics", "Computational Intelligence",
                "Computational linguistics", "Computational mathematics", "Computational mechanics",
            ]
        },
        {
            title: "Software Engineering",
            items: ["The Software Process", "Software Engineering Practice", "Web Engineering", "Quality Management", "Managing Software Projects", "Advanced Topics in Software Engineering",
                "Multimedia and Visual Software Engineering", "Software Maintenance and Testing", "Languages and Formal Methods", "Web-based Education Systems and Learning Applications", "Software Engineering Decision Making", "Knowledge-based Systems and Formal Methods", "Search Engines"
            ]
        },
        {
            title: "Mechanical Engineering",
            items: [
                "Acoustics", "Active perception & 3-D perception", "Aerodynamics", "Analytical mechanics", "Applied Mechanics", "Artificial intelligence", "Automatic 3D buildings design", "Automation and control", "Automation, CNC Machines & Robotics", "Automobiles",
                "Automotive Engineering", "Autonomous robotic vehicles", "Ballistics", "Bioengineering materials", "Biomechanics", "Biomedical Engineering", "Biotribology", "Bulk deformation processes and sheet metal forming", "CAD/CAM/CIM", "CFD",
                "Combustion and Fuels", "Composite and Smart Materials", "Composites, ceramics, polymers / processing", "Compressible Flows", "Computational Mechanics", "Computational mechanics / FEM modelling and simulation", "Computational Techniques", "Computer-based manufacturing technologies: CNC, CAD, CAM, FMS, CIM",
                "Controls and Dynamics", "Decision Analysis and Methods", "Design and manufacture, medical device manufacturing", "Dynamics and Vibration", "E-Business and E-Commerce", "Energy Engineering and Management", "Engineering Economy and Cost Analysis",
                "Engineering Education and Training", "Engineering Materials", "Environmental Management", "Evolutionary robotics", "Facilities Planning and Management", "Fluid Dynamics", "Fluid mechanics", "Fluid Mechanics", "Fluid Mechanics and Machinery",
                "Fracture", "Friction and wear of materials, corrosion resistance", "Fuels and Combustion", "Functionality graded materials, cellular materials", "GA and neural networks for mobile robots", "Gaits of humanoids", "General mechanics",
                "Geomechanics", "Global Manufacturing and Management", "Hardware architecture for humanoids", "Health and Safety", "Heat and Mass Transfer", "Heat Transfer and Thermal Power", "Heat treatments, microstructure and materials properties",
                "Human Factors", "Humanoid motion planning", "HVAC", "Hydrostatic transmissions and pneumatic", "I.C. Engines & Automobile Engineering", "Industrial Economics & Management", "Industrial Robotics", "Information Processing and Engineering",
                "Instrumentation and Control", "Instrumentation and measurement", "Intelligent Control systems", "Intelligent Systems", "Internal Combustion Engines", "Joining and fracture mechanics", "Kinematics and dynamics of rigid bodies", "Legged locomotion",
                "Lubricants and lubrication", "Machinability and formability of materials", "Machine Design", "Machinery and Machine Design", "Machining (traditional and non-traditional processes)", "Manufacturing and Production Processes",
                "Manufacturing design for 3r 'reduce, reuse, recycling'", "Manufacturing Engineering", "Manufacturing Systems", "Marine System Design", "Material Engineering", "Quality Control and Management", "Rapid manufacturing technologies and prototyping, remanufacturing",
                "Recycling, materials and industrial wastes, products and recycling systems", "Refrigeration & Air-Conditioning", "Reliability and Maintenance Engineering", "Renewable energies technology", "Resistance and Propulsion", "Robot cognition, adaptation and learning",
                "Robotic Automation and Control", "Robotics and Robot Applications", "Rotor dynamics", "Safety, Security and Risk Management", "Service Innovation and Management", "SLAM Algorithms", "Solid Mechanics", "Solid mechanics", "Solid mechanics and structural mechanics",
                "Space robotics", "Structural Dynamics", "Supply Chain Management", "Sustainable and green manufacturing", "System Dynamics and Simulation", "Systems Modeling and Simulation", "Technology and Knowledge Management", "Textile and Leather Technology",
                "Thermodynamics and Combustion Engineering", "Thermodynamics and heat transfer", "Transport Phenomena", "Tribology and surface engineering", "Tribology and Terotechnolog", "Turbulence", "Vibration and acoustics", "Vibrations", "Wood and wood products",
                "Material Science & Metallurgy", "Material Science and Processing", "Mechanical Design", "Mechanical Power Engineering", "Mechanisms and machines", "Mechatronics", "Mechatronics and robotics",
                "MEMS and Nano Technology", "Metallic alloys and metal casting", "Micro and nanomechanics", "Microsensors and actuators", "Mobile robots", "Multibody Dynamics", "Multifunctional and smart materials", "Multi-robot systems", "Nanomaterial Engineering",
                "Nanomaterials and Nanomanufacturing", "Neural decoding algorithms", "New and Renewable Energy", "Noise and Vibration", "Noise Control", "Non-destructive Evaluation", "Nonlinear Dynamics", "Oil and Gas Exploration", "Operations Management",
                "Operations Research", "Operations Research and Industrial Management", "Optimization methods", "Path Planning", "PC guided design and manufacture", "Plasticity Mechanics", "Pollution and Environmental Engineering", "Precision mechanics, mechatronics",
                "Production Management", "Production Planning and Control", "Production Technology", "Project Management", "Quality assurance and environment protection", "Dynamics and Random Vibrations", "Fracture and Fatigue Mechanics", "Non-linear behavior of structures",
                "Finite Methods in Engineering", "Artificial Neural Network & Fuzzy logic Modeling", "Decision Support System (DSS)", "Heuristic Modeling"
            ]
        },
        {
            title: "Civil Engineering",
            items: [
                "Remote Sensing & GIS", "Structural Dynamics", "Structural health monitoring", "Structural control", "Earthquake resistant design", "Retrofitting of Structures", "Concrete Technology", "Surface and Ground Water Hydrology", "Computational open channel hydraulics",
                "Water resources planning", "Watershed Management", "Lakes and Reservoirs", "Water Resources Systems analysis", "Irrigation Management (Distribution, Pricing, PIM, IMT etc.)", "Dams and Barrages", "Soil dynamics", "Machine foundations", "Rock Mechanics & Rock Engineering",
                "Ground Improvement Techniques", "Geo-Environmental Engineering", "Foundation Engineering", "Concrete bridges", "Suspension bridges", "Steel and Girder Bridges", "Tunneling & Underground structures", "Construction Management", "Open Penstocks", "Hydropower structures",
                "Water Resources Structures", "Lake tapping", "Smart buildings", "Green buildings", "Tall structures", "Safety Engineering", "Environmental Geo-informatics", "Water and waste water Management", "Environmental Impact Assessment", "Solid waste Analysis & Management",
                "Bio-Degradation of Solid Wastes", "Air and Noise Pollution", "Traffic Engineering", "Town/City planning", "Demand Modeling", "Land use planning", "Traffic Safety"
            ]
        },
        {
            title: "Electrical Engineering",
            items: [
                "Electric Power Generation", "Transmission and Distribution", "Power Electronics", "Power Quality", "Power Economic", "FACTS", "Renewable Energy", "Electric Traction", "Electromagnetic Compatibility", "Electrical Engineering Materials", "High Voltage Insulation Technologies",
                "High Voltage Apparatuses", "Lightning Detection and Protection", "Power System Analysis", "SCADA", "Electrical Measurements", "Optimal", "Robust and Adaptive Controls", "Non Linear and Stochastic Controls", "Modeling and Identification", "Robotics", "Image Based Control", "Hybrid and Switching Control", "Process Optimization and Scheduling", "Control and Intelligent Systems", "Complex Adaptive Systems.",
                "Microelectronic System", "Electronic Materials", "ASIC", "System-on-a-Chip (SoC) Using CAD Tools", "Electronic Instrumentation Using CAD Tools.", "Antenna and Wave Propagation", "Modulation and Signal Processing for Telecommunication", "Wireless and Mobile Communications",
                "Information Theory and Coding", "Communication Electronics and Microwave", "Radar Imaging", "Distributed Platform", "Communication Network and Systems", "Telemetric Services", "Security Network", "Radio Communication.", "Biomedical Physics",
                "Biomedical Transducers and instrumentation",
                "Biomedical System Design and Projects",
                "Medical Imaging Equipment and Techniques",
                "Telemedicine System",
                "Biomedical Imaging and Image Processing",
                "Biomedical Informatics and Telemedicine",
                "Biomechanics and Rehabilitation Engineering",
                "Biomaterials and Drug Delivery Systems."
            ]
        },

    ];

    return (
        <section className="space-y-3 mt-15">
            <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8 ">
                Research Areas
            </h2>
            <p className="text-text-primary">
                <span className="font-bold">Aim-</span>The basic aim of this journal is to provide platform for the researcher, innovators, scholars and students to share their research through worldwide with us. We promote research in all disciplines and the advancement of knowledge and understanding. This journal will provide a quality readable and valuable addition to the knowledge this will serve as resources for researchers along with to provide support to the scholars to enable them to undertake and disseminate their research and to help them for development of their own skills of reasoning and understanding. It is a peer-reviewed journal aspiring to publish high quality of original Research Articles, Review Articles, Survey Articles, Case Study, Technical Notes and Short Communication. The preference will be given to the research articles and articles which contains advance research concepts which will be helpful to the society.
                <br /><br />
                <span className="font-bold">Scope-IJARMY</span> which is cross boundaries between different faculties. IJARMY is the place for exchange of information and research results within the following scope: (But are not limited to the following)
            </p>

            <div className="space-y-8 mt-6">
                {categories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h3 className="text-xl font-bold text-primary-blue mb-4 border-l-4 border-primary-blue pl-3">
                            {category.title}
                        </h3>
                        <ul className="list-disc pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-text-primary font-medium">
                            {category.items.map((item, index) => (
                                <li key={index} className="break-words">{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResearchArea;
