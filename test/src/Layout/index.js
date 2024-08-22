import Container from "@mui/material/Container";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Container
          maxWidth="xl"
          sx={{
            py: 8,
          }}
        >
          {children}
        </Container>
      </ErrorBoundary>
    </>
  );
}

export default Layout;
