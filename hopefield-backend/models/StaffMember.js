// src/models/StaffMember.js
import mongoose from "mongoose";

const StaffMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  photo: { type: String, default: "/images/default-teacher.png" },
  group: {
    type: String,
    enum: [
      "Administration",
      "K1",
      "K2",
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Special Subjects",
      "Ancillary",
    ],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("StaffMember", StaffMemberSchema);
