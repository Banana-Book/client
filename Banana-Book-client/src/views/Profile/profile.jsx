import React from "react";
import './profile.css';
import UserInfo from "./Components/UserInfo/UserInfo";
import UserPic from "./Components/UserPic/UserPic";


const Profile = () => {
    return (
        <section className="profile">
        <div className="profile">
            <UserInfo />
            <UserPic />
            </div>
        </section>
    );
};

export default Profile;