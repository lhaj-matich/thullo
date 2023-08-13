import LoginForm from "./components/LoginForm";
import AuthProvider from "./components/Providers/AuthProvider";
// import RegisterForm from "./components/RegisterForm";
// import ResetForm from "./components/ResetForm";

function App() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}

export default App;
