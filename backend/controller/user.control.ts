import express, { Express, Request, Response } from "express";
import { db } from "../lib/db";
import bcrypt from "bcrypt";


//@desc     Get a User 
//@route    GET /users/:id
//@access   Private

export const getUser = async (req: Request, res : Response) => {
  
  console.log("call getUser backend")
  console.log(req.params)

  const { id } = req.params;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.send(user);

};

//===================================================================================================

//@desc     Delete a User 
//@route    DELETE /users/:id
//@access   Private

export const deleteUser = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    const isMatch = await bcrypt.compare(body.password, body.user.password);
  
    if (!isMatch) {
      return res.status(400).send("Password is wrong");
    }
  
    const deleteRes = await db.user.delete({
      where: {
        id: id,
      },
    });
  
    if (deleteRes) {
      return res.send("Success");
    } else {
      return res.status(400).send("Something went wrong");
    }
  };

//===================================================================================================

//@desc     Update a User's Email 
//@route    PUT /users/:id/email
//@access   Private

export const updateEmail = async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const body = req.body;

  if (id != body.user.id) {
    return res.status(401).send("Unauthorized");
  }

  try {
    
    const newmail = body.newEmail;
    const oldmail = body.user.email;

    // Check if it is the same email as the old one
    if (newmail === oldmail) {
      return res
        .status(400)
        .send("The new email cannot be the same as the old one.");
    }

    // Check if the mail's already exist in DB
    const userEmailCount = await db.user.count({
      where: {
        email: newmail,
      },
    });
    if (userEmailCount > 0) {
      return res.status(400).send("The new email has already been used.");
    }

    // Change Email in DB
    const changeEmail = await db.user.update({
      where: {
        id: id,
      },
      data: {
        email: newmail,
      },
    });

    return res.status(200).send("Success");
    
  } catch (err) {
    return res.status(400).send(err);
  }
};

//===================================================================================================

//@desc     Update a User's Password 
//@route    PUT /users/:id/password
//@access   Private

export const updatePassword = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    const isMatch = await bcrypt.compare(body.oldPassword, body.user.password);
  
    if (!isMatch) {
      return res.status(400).send("Old password is wrong");
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(body.newPassword, salt);
  
      const changeRes = await db.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedNewPassword,
        },
      });
  
      return res.send("Success");
    } catch (err) {
      return res.status(400).send(err);
    }
};

// ===================================================================================================

//@desc     Get All Chats
//@route    GET /users/:id/chats
//@access   Private

export const getChats = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found");
    }
  
    try {
      const chatsRes = await db.chat.findMany({
        where: {
          OR: [
            {
              participantAId: id,
            },
            {
              participantBId: id,
            },
          ],
        },
        include: {
          participantA: {
            select: {
              id: true,
              displayName: true,
              imageURL: true,
            },
          },
          participantB: {
            select: {
              id: true,
              displayName: true,
              imageURL: true,
            },
          },
          messages: {
            orderBy: {
              sentAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          lastUpdated: "desc",
        },
      });
  
      const result = chatsRes.map((chat) => {
        if (chat.messages.length === 0) {
          const result: any = { ...chat };
          delete result.messages;
          return result;
        } else {
          const result: any = { ...chat, latestMessage: chat.messages[0] };
          delete result.messages;
          return result;
        }
      });
  
      return res.send(result);
  
      // return res.send(chatsRes)
    } catch (err) {
      return res.status(400).send(err);
    }
};

// ===================================================================================================

//@desc     GET all registered users
//@route    GET /users/
//@access   Private

export const getAllUser = async (req: Request, res : Response) => {

  try {
    const allUserRes = await db.user.findMany();
    res.send(allUserRes);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).send(err);
  }

};