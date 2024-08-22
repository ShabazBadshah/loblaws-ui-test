import Typography from "@mui/material/Typography";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <Typography variant="body1">Something went horribly wrong</Typography>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}
