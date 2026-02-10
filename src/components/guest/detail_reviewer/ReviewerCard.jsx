
const ReviewerCard = ({ reviewer }) => (
    <div className="border border-border rounded-sm p-3 md:p-6 md:shadow-sm bg-primary-foreground mb-4 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-primary mb-4">
            {reviewer.name}
        </h3>
        <div className="space-y-2 text-sm text-text-primary font-semibold">
            {reviewer.designation && (
                <div className="md:flex ">
                    <span className="font-bold w-40 shrink-0">Designation</span>
                    <span>: {reviewer.designation}</span>
                </div>
            )}


            <div className="md:flex flex-col sm:flex-row">
                <span className="font-bold w-40 shrink-0">University</span>
                <span>: {reviewer?.university || "-"}</span>
            </div>


            {reviewer.researchInterests && (
                <div className=" flex  flex-row">
                    <span className="font-bold md:w-40 shrink-0">Research Interests</span>
                    <span className="line-clamp-2 ">: {reviewer.researchInterests}</span>
                </div>
            )}
        </div>
    </div>
);


export default ReviewerCard;