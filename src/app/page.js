import BasicPlan from "@/components/BasicPlan";
import BillToggle from "@/components/BillToggle";
import FreePlan from "@/components/FreePlan";
import GrowthPlan from "@/components/GrowthPlan";
import ProPlan from "@/components/ProPlan";
import { PackageContainer } from "@/Styles/packageStyle";
import { Container } from "@/Styles/style-component";


export default function Home() {
  return (
    <Container>
      <BillToggle />
      <PackageContainer>
        <FreePlan />
        <BasicPlan />
        <ProPlan />
        <GrowthPlan />
      </PackageContainer>
    </Container>
  );
}
