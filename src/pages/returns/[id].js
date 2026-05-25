import { useRouter } from "next/router";
import ReturnDetailScreen from "@/screens/Returns/ReturnDetail";

export default function ReturnDetailPage() {
  const { query } = useRouter();
  return <ReturnDetailScreen returnId={query.id} />;
}
