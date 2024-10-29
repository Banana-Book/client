import React from "react";
import "./profilePic.css";
import ProfileP from '../../../../assets/img/Logo-minimalista.png'

const ProfilePic = () => {
    return (
        <div className="profile-pic">
            <figure className="ProfilePic">
                <img src={ProfileP} alt="profile-pic" />
            </figure>
        </div>
    );
};

export default ProfilePic;