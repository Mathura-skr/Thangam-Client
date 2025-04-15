import { useState } from "react";
import { Button, TextField, Avatar, Box, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";

export default function AdminSettings() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("/default-avatar.png");
    const [error, setError] = useState("");

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        if (password && password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        console.log("Updated Username:", username);
        console.log("Updated Password:", password ? "********" : "No Change");
        console.log("Profile Picture:", profilePic ? profilePic.name : "No Change");
        alert("Settings Updated Successfully!");
    };

    return (

        <div className="flex flex-col h-screen">
        <AdminNav />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/5 bg-gray-100 h-full border-r">
            <Sidebar />
          </div>
  
         
          <div className="w-4/5 p-6 overflow-auto">
                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Admin Settings
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar src={preview} sx={{ width: 80, height: 80 }} />
                    <Button variant="contained" component="label" sx={{ mt: 3, bgcolor: "rgb(17, 24, 39)", "&:hover": { bgcolor: "black" } }}>
                        Change Profile Picture
                        <input hidden accept="image/*" type="file" onChange={handleProfilePicChange} />
                    </Button>
                </Box>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    error={!!error}
                    helperText={error}
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <Button
                    
                    variant="contained"
                sx={{ mt: 3, bgcolor: "rgb(17, 24, 39)", "&:hover": { bgcolor: "black" } }}
                onClick={handleSave}
                >
                Save Changes
            </Button>
        </div>
        </div>
        </div >
    );
}
