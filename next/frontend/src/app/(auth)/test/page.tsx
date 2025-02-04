import { sensitiveAction } from "@/lib/actions";
import { RenderData } from "../login/page";

export default async function page() {
   const { data } = await sensitiveAction();

   return <RenderData data={data} />;
}
