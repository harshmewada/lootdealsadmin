import { Alert, Card, CardContent, Divider } from "@mui/material";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    //   logErrorToMyService(error, info.componentStack);
    this.setState({ errorMsg: error.message });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Card variant="outlined">
          <CardContent>
            <Alert severity="error">Something went wrong</Alert>
          </CardContent>
          <Divider />
          <CardContent>{this.state.errorMsg}</CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
