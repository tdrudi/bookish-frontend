import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Homepage";
import Login from "./auth/LoginForm";
import SignUpForm from "./auth/RegisterForm";
import Profile from "./Users/Profile";
import BookList from "./Books/BookList";
import BookDetail from "./Books/BookDetail";
import UserList from "./Lists/UserList";
import ListDetail from "./Lists/ListDetail";
import EditProfileForm from "./Users/EditProfileForm";
import ListForm from "./Lists/ListForm";
import SearchPage from "./Search/SearchPage";
import ReviewDetail from "./Books/ReviewDetails";

function RoutesList({ login, signup, isLoggedIn }) {

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {!isLoggedIn &&
                <>
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/signup" element={<SignUpForm signup={signup} />} />
                </>
            }

            {isLoggedIn &&
                <>
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/profile/:userId/edit" element={<EditProfileForm />} />

                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/:bookId" element={<BookDetail />} />
                    <Route path="/books/:bookId/reviews/:reviewId" element={<ReviewDetail />} />

                    <Route path="/lists/" element={<UserList />} />
                    <Route path="/lists/new" element={<ListForm />} />
                    <Route path="/lists/edit/:listId" element={<ListForm />} />
                    <Route path="/lists/:listId" element={<ListDetail />} />


                    <Route path="/search" element={<SearchPage />} />
                </>
            }
            <Route path="*" element={<Navigate to="/" />} />


        </Routes>
    )
}
export default RoutesList;