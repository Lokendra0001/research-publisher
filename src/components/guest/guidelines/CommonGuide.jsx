const CommonGuide = ({ data }) => {
  return (
    <section className="space-y-3 mt-15">
      {/* Title */}
      {data.title && (
        <h2 className="text-[28px] font-bold text-primary-blue border-b-2 border-primary mb-8">
          {data.title}
        </h2>
      )}

      {/* Content blocks */}
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <>
                {block.heading &&
                  <h3 className=" text-xl font-bold text-primary-blue  my-6 ">
                    {block?.heading}
                  </h3>
                }
                <p key={index} className="text-text-primary leading-relaxed font-medium">
                  {block.text}
                </p>
              </>
            );

          case "list":
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 font-medium">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case "ordered":
            return (
              <ol
                key={index}
                type={block.orderType || "1"}
                className="list-decimal pl-6 space-y-2"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </section>
  );
};

export default CommonGuide;
