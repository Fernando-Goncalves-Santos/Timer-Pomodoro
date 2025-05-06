import { Container } from "../../components/Container";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";
import { Logo } from "../../components/Logo";
import type { ReactNode } from "react";

type MainTemplateProps = {
  children: ReactNode;
};

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default MainTemplate;
