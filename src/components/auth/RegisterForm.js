import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/signup.css';

function SignUpForm({ signup }) {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
    });

    const navigate = useNavigate();

    //Handle form submission
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
        if (!formData.firstName.trim()) {
            setError('First name is required.');
            return;
        }
        if (!formData.lastName.trim()) {
            setError('Last name is required.');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email is required.');
            return;
        } if (!formData.email.trim()) {
            setError('Email is required.');
            return;
        }


        setError('');
        try {
            await signup(formData);
            setFormData({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                isAdmin: false,
            });
            navigate("/");
        } catch (err) {
            setError(err[0]);
        }
    }

    //Handle input change
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
        setError('');
    }


    return (
        <div id="signup">
            <form id="signup-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && <p className="error-message">{error}</p>}

                <label htmlFor="username">Username: </label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password: </label>
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name: </label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email: </label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;