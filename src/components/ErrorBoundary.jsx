const ErrorBoundary = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

export default ErrorBoundary