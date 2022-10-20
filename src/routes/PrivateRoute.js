import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // useLocation ব্যাবহার করলে আমি যেই route টা private করেছি সেই route এর location নিয়ে নিবে এবং পরে navigate এর সাথে state  নামক prop  এর মধ্যে property of object হিসেবে from: location দিয়ে ব্যাবহার করতে পারবো
    const location = useLocation();

    if (loading) {
        return <div>loading...</div>
    }
    if (user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    // navigate এর পর একটা  prop সেট করে দেবো state, যার মধ্যে object of property থাকবে from, তার মধ্যে current location দিয়ে দেবো

};

export default PrivateRoute;