import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "../lib/jwtGenerator";

//===================================================================================================

const max_age = 3 * 24 * 60 * 60;  

const Schema_User = z.object({
    email: z.string().trim().email(),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
    displayName: z.string().trim().min(1, { message: "Fill display name" }),
});

const Schema_Update_User = z.object({
  displayName: z.string().trim().min(1, { message: "Fill display name" }),
  imageURL: z.string().optional(),
});

//===================================================================================================

//@desc     Register
//@route    PUT /auth/user
//@access   Public

export const register = async (req: Request, res: Response) => {
  
  const data = req.body;
  const user = Schema_User.safeParse(data);
  if (!user.success) {
    res.status(400).send("Body is not match requirements");
    return;
  }

  const {email, password, displayName} = user.data;

  //check whether user existed or not
  const user_finder = await db.user.count({
    where: {
      email: email,
    },
  });
  if (user_finder != 0) {
    res.status(400).send("User is already existed!");
    return;
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    
    const result = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        displayName: displayName
      },
    });

    const token = generateJWT(result.id, displayName);
    res.cookie("auth", token, { httpOnly: true, maxAge: max_age * 1000 });
    
    res.status(201).send({
      ...result,
      token: token,
    });

  } catch (error) {
    
    res.status(400).send(error);

  }
};

//===================================================================================================

//@desc     Login User 
//@route    POST /auth/login
//@access   Public

export const login = async (req: Request, res: Response) => {
  
  // find email in db
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Email or password is wrong");
  }

  // cookie
  const token = generateJWT(user.id, user.displayName);
  res.cookie("auth", token, { httpOnly: true, maxAge: max_age * 1000 });
  return res.status(200).send({
    ...user,
    token: token,
  });

};

//===================================================================================================

//@desc     Update User 
//@route    PUT /auth/user
//@access   Private

export const update = async (req: Request, res: Response) => {
  const { user, ...data } = req.body;
  const query = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
  });
  if (!query) {
    return res.status(400).clearCookie("auth").send("Not Found");
  }

  const update_data = Schema_Update_User.safeParse(data);
  if (!update_data.success) return res.status(403).send("Invalid Data");

  const result = await db.user.update({
    where: {
      id: user.id as string,
    },
    data: update_data.data,
  });
  const token = generateJWT(result.id, result.displayName);
  res.cookie("auth", token, { httpOnly: true, maxAge: max_age * 1000 });
  res.status(201).send({
    ...result,
    token: token,
  });
};

// ===================================================================================================

//@desc     Logout User 
//@route    POST /auth/logout
//@access   Private

export const logout = async (req: Request, res: Response) => {
  return res.status(200).clearCookie("auth").send("logout");
};

// ===================================================================================================

//@desc     Get User Info
//@route    GET /auth/user
//@access   Private

export const getUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  const query = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
  });
  if (!query) {
    return res.status(400).clearCookie("auth").send("Not Found");
  }

  const { password, ...data } = query;

  res.status(200).send(data);
};
