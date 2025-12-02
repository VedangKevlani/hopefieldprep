import mongoose from "mongoose";
import StaffMember from "../models/StaffMember.js";
import { STAFF_GROUPS } from "../data/staff.js";

export const seedStaff = async () => {
  const count = await StaffMember.countDocuments();
  if (count > 0) return; // Already seeded

  const allMembers = [];
  STAFF_GROUPS.forEach(group => {
    group.members.forEach(member => {
      allMembers.push({
        name: member.name,
        email: member.email || "",
        photo: member.photo || "/images/default-teacher.png",
        group: group.group
      });
    });
  });

  await StaffMember.insertMany(allMembers);
  console.log("Staff database seeded!");
};
