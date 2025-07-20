import { z } from "zod";
import bcrypt from "bcryptjs";

import User from "../model/user.model.js";
import { generateToken } from "../lib/gen.js";
import cloudinary from "../lib/cloudinary.js";

const schemaSignUp = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  fullName: z.string({ message: "Full name is required" }),
});

const schemaSignIn = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signup = async (req, res) => {
  try {
    const result = schemaSignUp.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    const { email, password, fullName } = result.data;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }

    generateToken(newUser._id, res);
    return res.status(201).json({
      details: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!!!",
    });
    console.log("error in signup controller", error.message);
  }
};

export const signin = async (req, res) => {
  try {
    const result = schemaSignIn.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    generateToken(user._id, res);
    return res.status(200).json({
      details: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "User signed in successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!!!",
    });
    console.log("error in signin controller", error.message);
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    return res.status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!!!",
    });
    console.log("error in signout controller", error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { profilePic, fullName, email } = req.body;
    const userId = req.user.userId;
    console.log("Updating user with ID:", userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }
    // At least one field must be provided
    if (!profilePic && !fullName && !email) {
      return res
        .status(400)
        .json({
          message:
            "At least one field (profilePic, fullName, email) is required",
        });
    }
    // Prepare update object
    const updateObj = {};
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      console.log("Cloudinary profilePic URL:", uploadResponse.secure_url);
      updateObj.profilePic = uploadResponse.secure_url;
    }
    if (fullName) updateObj.fullName = fullName;
    if (email) updateObj.email = email;
    console.log("Update object:", updateObj);
    // update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });
    console.log("Updated user:", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error!!!" });
    console.log("error in updateUser controller", error.message);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error!!!",
    });
    console.log("error in checkAuth controller", error.message);
  }
};
