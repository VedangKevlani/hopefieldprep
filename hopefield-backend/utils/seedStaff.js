// hopefield-backend/utils/seedStaff.js
import StaffMember from "../models/StaffMember.js";
import { STAFF_GROUPS } from "../data/staff.js";

export async function seedStaff() {
  try {
    const count = await StaffMember.countDocuments();
    if (count === 0) {
      const allMembers = STAFF_GROUPS.flatMap(group =>
        group.members.map(member => ({
          name: member.name,
          email: member.email || "",
          photo: member.photo || "/images/default-teacher.png",
          group: group.group,
        }))
      );

      await StaffMember.insertMany(allMembers);
      console.log("Staff seeded successfully!");
    }
  } catch (err) {
    console.error("Error seeding staff:", err);
  }
}
