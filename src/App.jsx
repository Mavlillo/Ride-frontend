import { Switch, Route } from "wouter";
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/pages/NavBar/Navbar";
import Vehicle from "./components/pages/Vehicle";
import Student from "./components/pages/Student";

function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-[#fbfbfb]">
      <Navbar/>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/Vehicle" component={Vehicle} />
      <Route path="/Student" component={Student} />
      <Route component={NotFound} />
      </Switch>
    </div>
    </AuthProvider>
  );
}

export default App;
