import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Unhandled application error", error, errorInfo); }
  render() {
    if (this.state.hasError) return <main className="page-main empty-state"><h1>Something went wrong</h1><p>Our kitchen ran into an unexpected problem. Please try again.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload Mesob House</button></main>;
    return this.props.children;
  }
}
