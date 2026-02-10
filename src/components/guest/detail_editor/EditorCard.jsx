
const EditorCard = ({ editor }) => (
    <div className="border border-border rounded-sm p-3 md:p-6 md:shadow-sm bg-primary-foreground mb-4 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-primary mb-3">
            {editor.name} ({editor.editorRole})
            {editor.role && editor.role !== 'editor' && <span className="text-sm font-normal text-text-primary ml-2">({editor.role})</span>}
        </h3>
        <div className="space-y-3 text-sm text-text-primary font-semibold">
            {editor.address && (
                <div className="md:flex ">
                    <span className="font-bold w-40 shrink-0">Address</span>
                    <span className="break-words">: {editor.address}</span>
                </div>
            )}



            {editor.email && (
                <div className="md:flex ">
                    <span className="font-bold w-40 shrink-0">Email</span>
                    <a href={`mailto:${editor.email}`} className="text-blue-600 hover:underline break-all">
                        : {editor.email}
                    </a>
                </div>
            )}
        </div>
    </div>
);

export default EditorCard;
