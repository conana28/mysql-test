// "use client";

export default function Page({ params }: { params: { slug: Array<string> } }) {
  console.log(params);
  return (
    <div>
      My Slug: {params.slug.length} parameters ( {params.slug} )
      {params.slug.map((p) => (
        <div>{p}</div>
      ))}
    </div>
  );
}
