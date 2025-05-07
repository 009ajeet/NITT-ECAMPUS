const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * Find user by email and role
 */
const findUserByEmailAndRole = async (email, role) => {
  if (!email || !role) return null;
  return await User.findOne({ email, role });
};

/**
 * Update faculty profile
 */
router.put('/info', async (req, res) => {
  const { email, name, department, contact, bio } = req.body;

  try {
    const user = await findUserByEmailAndRole(email, "faculty");

    if (!user) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Only update fields if they are defined (null and empty string are valid)
    if (name !== undefined) user.name = name;
    if (department !== undefined) user.department = department;
    if (contact !== undefined) user.contact = contact;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.json({ message: "Faculty info updated successfully", faculty: user });
  } catch (error) {
    console.error("Error updating faculty info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Get all students
 */
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select('name email _id')
      .sort({ name: 1 });

    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Update student dashboard data
 */
router.put("/update-student", async (req, res) => {
  const {
    email,
    courses,
    cgpa,
    lastGpa,
    assignments,
    schedule,
    announcements,
    activity,
  } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Student email is required" });
  }

  try {
    const student = await findUserByEmailAndRole(email, "student");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Normalize dashboard data with defaults
    student.dashboardData = {
      courses: Array.isArray(courses) ? courses : [],
      cgpa: cgpa || "N/A",
      lastGpa: lastGpa || "N/A",
      assignments: Array.isArray(assignments) ? assignments : [],
      schedule: Array.isArray(schedule) ? schedule : [],
      announcements: announcements || "No announcements",
      activity: activity || "No activity",
    };

    await student.save();

    res.json({ message: "Student dashboard updated successfully" });
  } catch (error) {
    console.error("Error updating student dashboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Get faculty by email
 */
router.get('/info/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const faculty = await findUserByEmailAndRole(email, "faculty");

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department || "",
      contact: faculty.contact || "",
      bio: faculty.bio || ""
    });
  } catch (error) {
    console.error("Error fetching faculty info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Get student name by email
 */
router.get('/student-info/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const student = await findUserByEmailAndRole(email, "student");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ name: student.name });
  } catch (error) {
    console.error("Error fetching student info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;