import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    if (!firstName || !lastName || !email || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Auto-register: use email as default password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(email, salt);

      user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: "user",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback_secret_key_change_in_production",
      { expiresIn: "7d" }
    );

    return Response.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
