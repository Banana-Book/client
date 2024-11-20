import './profile.css';
import UserInfo from "./Components/UserInfo/UserInfo";
import UserPic from "./Components/UserPic/UserPic";
import UserPosts from "./Components/UserPosts/UserPosts";

const Profile = () => {

    return (
        <section className="profile">
            <div className="info">
                <UserInfo />
                <UserPic />
            </div>
            <UserPosts />
        </section>
    );
};

export default Profile;