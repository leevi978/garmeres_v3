import { PreviewProps } from "sanity";

export default function BlogBrowserPreview(props: PreviewProps, other: any) {
  const { title } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "1em",
        justifyItems: "center",
      }}
    >
      <span>{`Blog post browser - ${title}`}</span>
    </div>
  );
}
