import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookishAPI from '../../BookishAPI';
import '../../css/login.css';

function Login({ login }) {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    //Handles form submission
    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.username.trim()) {
            setError('Username is required.');
            return;
        }
        if (!formData.password.trim()) {
            setError('Password is required.');
            return;
        }
        setError('');
        try {
            const checkUsers = await BookishAPI.getAllUsers();
            const usernames = checkUsers.map(u => u.username);
            if (!usernames.includes(formData.username)) {
                setError('Username or password is invald. Please try again.')
            } else {
                await login(formData);
                navigate("/");
            }
        } catch (error) {
            setError(error[0]);
        }
    };

    //Updates the form data state when input fields change.
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(data => (
            {
                ...data,
                [name]: value
            }));
        setError('');
    }

    return (
        <div id="login-form-container">
            <form id="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <label htmlFor='username'>Username:</label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required />
                <label htmlFor='password'>Password:</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required />
                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default Login;