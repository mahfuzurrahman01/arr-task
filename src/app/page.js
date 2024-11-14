import BillToggle from "@/components/BillToggle";
import FreePlan from "@/components/FreePlan";
import { Container, PackageContainer } from "@/Style/style-component";

export default function Home() {
  return (
    <Container>
      <BillToggle />
      <PackageContainer>
        <FreePlan />
        <FreePlan />
        <FreePlan />
        <FreePlan />
      </PackageContainer>
    </Container>
  );
}
