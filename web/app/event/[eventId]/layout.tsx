export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default function layout({ children }) {
  return <>{children}</>;
}
