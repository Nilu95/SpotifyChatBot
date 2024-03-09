import Image from "next/image";
import ServerComponent from "./ServerComponent";
import ClientComponent from "./ClientComponent";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <ClientComponent />
      </main>
   );
}
