import AuthProvider from "./provider/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <ProtectedRoute />
    </AuthProvider>
  );
}

export default App;