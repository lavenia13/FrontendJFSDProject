import React, { useState, useEffect } from "react";
import "./ArtisanProfile.css";

function ArtisanProfile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    gender: "male",
    bio: "",
    contact: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);  // Added error state to handle errors

  useEffect(() => {
    fetchProfile();
  }, []); // Ensure this fetches the latest profile data on initial load

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:2030/api/artisan-profile");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setProfile(data);  // Update the state with fresh profile data
    } catch (error) {
      setError("Failed to load profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Reset error state on form submit

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch("http://localhost:2030/api/artisan-profile", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      // After saving, fetch the updated profile data
      fetchProfile();  // This will reload the profile with the latest data from the backend
      setIsEditing(false);  // Set editing mode off
    } catch (error) {
      setError(error.message);  // Set error state if request fails
    }
  };

  return (
    <div className="artisan-profile">
      <h1>Artisan Profile</h1>
      {error && <p className="error-message">{error}</p>}  {/* Display error message if present */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={profile.gender === "male"}
              onChange={handleInputChange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              checked={profile.gender === "female"}
              onChange={handleInputChange}
            />
            Female
          </div>
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={profile.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <div className="profile-picture">
            <img
              src="/artisanprofilelogo.png"
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
        </div>
        <button type="submit">{isEditing ? "Update Profile" : "Save Profile"}</button>
      </form>
    </div>
  );
}

export default ArtisanProfile;
