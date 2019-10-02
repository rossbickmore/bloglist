import React from 'react';

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleSubmit, errorMessage}) => {

    return (
        <div>
        <div style={ errorMessage == null ? null : {border: "3px solid red", backgroundColor: "grey", padding: 5}}>
              {errorMessage}
        </div>
        <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div>
                username
                  <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                password
                  <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit">login</button>
            </form>
        </div> 
    )
}


export default LoginForm;