import styled from "styled-components";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";

const Home = (props) => {
  return (
    <Container>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  max-width: 1128px;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px auto;
  @media (max-width: 1200px) {
    max-width: 960px;
  }
  @media (max-width: 992px) {
    max-width: 720px;
    grid-template-areas: "leftside main";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr);
  }
  @media (max-width: 769px) {
    max-width: 560px;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

export default Home;
