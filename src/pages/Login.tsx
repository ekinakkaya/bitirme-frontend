import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  //const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const onLoginButtonClick = () => {
    fetch(`http://127.0.0.1:8081/api/login/authenticate?username=${email}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify({ username: email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          navigate("/Anasayfa")
        } else {
          // handle login failure
          alert("Wrong email or password.")
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };





  return (
    <>
      <img src="public/Login_Icon.png" alt="Login_Icon" />
      <form>
        <div className="form-group">
          <input
            value={email}
            type="email"
            className="mail"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            value={password}
            type="password"
            className="pass"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={ev => setPassword(ev.target.value)}
          />
        </div>
        <button type="button" className="logB" onClick={onLoginButtonClick}>
          Log in
        </button>
      </form>
    </>
  );
}

export default Login;
