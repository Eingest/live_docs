"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};

// "use server";

// import { nanoid } from "nanoid";
// import { liveblocks } from "../liveblocks";
// import { revalidatePath } from "next/cache";
// import { parseStringify } from "../utils"; // Ensure parseStringify is correctly imported and defined

// // Function to log each character code
// function logCharacterCodes(input: string, label: string) {
//   if (typeof input !== "string") {
//     console.log(`${label} is not a string. It is of type: ${typeof input}`);
//     return;
//   }
//   console.log(
//     `${label} character codes:`,
//     input
//       .split("")
//       .map((char, index) => `Index ${index}: ${char.charCodeAt(0)}`)
//   );
// }

// // Function to identify and log hidden characters in a string
// function logHiddenCharacters(input: string, label: string) {
//   if (typeof input !== "string") {
//     console.log(`${label} is not a string. It is of type: ${typeof input}`);
//     return;
//   }

//   input.split("").forEach((char, index) => {
//     const code = char.charCodeAt(0);
//     if (code > 127) {
//       console.log(
//         `Hidden character in ${label} at index ${index}: '${char}' (code: ${code})`
//       );
//     }
//   });
// }

// // Function to remove non-ASCII characters
// function sanitizeString(input: string) {
//   return input.replace(/[^\x00-\x7F]/g, "");
// }

// // Function to log all environment variables and inputs
// function logEnvironmentAndInputs(label: string) {
//   console.log(`Logging environment variables and inputs for ${label}:`);
//   for (const key in process.env) {
//     if (process.env.hasOwnProperty(key)) {
//       logHiddenCharacters(process.env[key]!, `Environment Variable ${key}`);
//     }
//   }
// }

// export const createDocument = async ({
//   userId,
//   email,
// }: CreateDocumentParams) => {
//   const roomId = nanoid();

//   console.log(
//     "Creating document with roomId:",
//     roomId,
//     "userId:",
//     userId,
//     "email:",
//     email
//   );
//   logHiddenCharacters(userId, "User ID");
//   logHiddenCharacters(email, "Email");

//   try {
//     const metadata = {
//       creatorId: sanitizeString(userId),
//       email: sanitizeString(email),
//       title: "Untitled",
//     };

//     console.log("Sanitized Metadata:", metadata);
//     logCharacterCodes(metadata.creatorId, "Metadata creatorId");
//     logCharacterCodes(metadata.email, "Metadata email");

//     const usersAccesses: RoomAccesses = {
//       [sanitizeString(email)]: ["room:write"],
//     };

//     console.log("Sanitized Users Access object:", usersAccesses);
//     logCharacterCodes(Object.keys(usersAccesses)[0], "UsersAccesses email key");

//     const headers = {
//       "Content-Type": "application/json",
//     };

//     console.log("Headers to be used in request:", headers);
//     logCharacterCodes(headers["Content-Type"], "Content-Type header");

//     // Check if there's any unexpected data in the environment variables
//     logEnvironmentAndInputs("createDocument");

//     // Constructing the entire request object for logging
//     const requestData = {
//       roomId: roomId,
//       metadata: metadata,
//       usersAccesses: usersAccesses,
//       headers: headers,
//     };

//     console.log(
//       "Complete Request Data Object:",
//       JSON.stringify(requestData, null, 2)
//     );
//     logHiddenCharacters(
//       JSON.stringify(requestData),
//       "Complete Request Data Object"
//     );

//     // Correctly using liveblocks.createRoom with objects
//     const room = await liveblocks.createRoom(roomId, {
//       metadata,
//       usersAccesses,
//       defaultAccesses: ["room:write"],
//     });

//     console.log("Room created successfully:", room);

//     revalidatePath("/rooms");

//     // Return the room data as a serialized JSON string
//     return parseStringify(room);
//   } catch (error) {
//     console.error("Error creating room:", error);
//     throw error;
//   }
// };
