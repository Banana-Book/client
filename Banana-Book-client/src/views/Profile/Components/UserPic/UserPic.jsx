import React from "react";
import profilePic from "../../../../assets/img/Logo-minimalista.png";
import "./UserPic.css";

const UserPic = () => {
    return (
        <div className="user-profile-pic">
            <figure className="UserProfilePic">
                <img className="user-pic" src={profilePic} alt="profile-pic" />
            </figure>
        </div>
    );
};

export default UserPic;