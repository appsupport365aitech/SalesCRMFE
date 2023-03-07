import React from "react";
import Navigation from "@/components/app/Navigation";
import ProfilePage from "@/components/Profile/ProfilePage";

//Manya will make this page

const Profile = () => {
  return (
    <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
      <Navigation
        buttons={[
          {
            text: "Take Action",
            dropdown: false,
            id: 1,
            icon: "Plus",
            light: false,
          },
        ]}
      />
      <div className="w-[100%] flex  ">
        <div className="w-[280px] min-h-[70vh] bg-white rounded-xl p-[20px]">
          <ProfilePage />
        </div>
      </div>
      {/* write your code here for profile page manya! */}
    </div>
  );
};

export default Profile;