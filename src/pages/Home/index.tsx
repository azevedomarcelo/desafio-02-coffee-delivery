import { Catalog } from "../../components/Catalog";
import { Intro } from "../../components/Intro";

export function Home() {
  return (
    <main>
      <Intro />
      <Catalog />
    </main>
  );
}