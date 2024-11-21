import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import * as schema from "../db/schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6,'Password should be at least 6 characters long'),
});

const itemSchema = z.object({
  name: z.string().min(2).max(50),
  quantity: z.number().int().min(1),
  description: z.string().optional(),
});

export type CreateUser = z.infer<typeof userSchema>;

export const usersRoute = new Hono()
//get user by id
  .get("/:id{[0-9]+}", async (c) => {
    const userId = String(c.req.param("id"));

    const user = await db
      .select({
        id: schema.usersTable.id,
        name: schema.usersTable.name,
        email: schema.usersTable.email,
      })
      .from(schema.usersTable)
      .where(eq(schema.usersTable.id, userId));

    return c.json(user);
  })
  //create new user
  .post("/", zValidator("json", userSchema), async (c) => {
    const user = await c.req.valid("json");

    try {
      await db
        .insert(schema.usersTable)
        .values({
          id: randomUUID(),
          name: user.firstName + " " + user.lastName,
          email: user.email,
          password: user.password,
        })
        .execute();

      return c.json({ message: "User created successfully" }, 201);
    } catch (error) {
      // Check for unique constraint violations
      if (
        error instanceof Error &&
        error.message.includes("UNIQUE constraint failed")
      ) {
        return c.json(
          {
            error: "Email or username already exists",
          },
          409
        );
      }

      // Generic error handling
      console.error("Error creating user:", error);
      return c.json(
        {
          error: "Failed to create user",
        },
        500
      );
    }
  })
  //update user by ID
  .put("/:id{[0-9]+}", zValidator("json", userSchema), async (c) => {
    const userId = String(c.req.param("id"));
    const user = await c.req.valid("json");

    try {
      const result = await db
        .update(schema.usersTable)
        .set({
          name: user.firstName + " " + user.lastName,
          email: user.email,
          password: user.password,
        })
        .where(eq(schema.usersTable.id, userId))
        .execute();

      if (!result) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json({ message: "User updated successfully" });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("UNIQUE constraint failed")
      ) {
        return c.json(
          {
            error: "Email already exists",
          },
          409
        );
      }

      console.error("Error updating user:", error);
      return c.json(
        {
          error: "Failed to update user",
        },
        500
      );
    }
  })
  //get all items
  .get("/", async(c) =>{
    const items = await db
      .select()
      .from(schema.itemsTable).execute();

    return c.json(items);
  })
  //create new item
  .post("/",zValidator("json", itemSchema), async (c) =>{
    const item = await c.req.valid("json");

    try {
    await db.insert(schema.itemsTable)
    .values({
      itemId: randomUUID(),
      itemName: item.name,
      quantity: item.quantity,
      description: item.description

    })
    .execute();
    return c.json({message: "Item created successfully", 201}); 
  }catch (error) {
     // Generic error handling
      console.error("Error creating user:", error);
      return c.json(
        {
          error: "Failed to create user",
        },
        500
      );
  }
  })
  
  //get shopping list for user
  .get("/:id{[0-9]+}/shopping-list", async (c) => {
    const owner = String(c.req.param("id"));

    const shoppingList = await db
      .select({
        shoppingListId: schema.shoppingListTable.shoppingListId,
        listName: schema.shoppingListTable.listName,
        userId: schema.shoppingListTable.userId,
      })
      .from(schema.shoppingListItemsTable)
      .where(eq(schema.shoppingListTable.userId, owner));

    return c.json(shoppingList);
  })
  //add an item to the shopping list
  .post(
    "/:id{[0-9]+}/shopping-list",
    zValidator("json", itemSchema),
    async (c) => {
      const owner = Number(c.req.param("id"));
      const shoppingListItem = await c.req.valid("json");

      await db
        .insert(schema.shoppingListItemsTable)
        .values({
          name: shoppingListItem.name,
          bought: false,
          quantity: shoppingListItem.quantity,
          section: shoppingListItem.section,
          owner: owner,
        })
        .execute();

      return c.json(
        {
          message: "Shopping list item created successfully",
        },
        201
      );
    }
  )
  .delete("/:id{[0-9]+}/shopping-list/:itemId{[0-9]+}", async (c) => {
    const owner = Number(c.req.param("id"));
    const itemId = Number(c.req.param("itemId"));

    await db
      .update(schema.shoppingListItemsTable)
      .set({ bought: true })
      .where(
        and(
          eq(schema.shoppingListItemsTable.owner, owner),
          eq(schema.shoppingListItemsTable.id, itemId)
        )
      );

    return c.json(
      {
        message: "Item marked as bought",
      },
      200
    );
  })
  .put(
    "/:id{[0-9]+}/shopping-list/:itemId{[0-9]+}",
    zValidator("json", shoppingListItemSchema),
    async (c) => {
      const owner = Number(c.req.param("id"));
      const itemId = Number(c.req.param("itemId"));

      const shoppingListItem = await c.req.valid("json");

      const result = await db
        .update(schema.shoppingListItemsTable)
        .set({
          name: shoppingListItem.name,
          quantity: shoppingListItem.quantity,
          section: shoppingListItem.section,
        })
        .where(
          and(
            eq(schema.shoppingListItemsTable.owner, owner),
            eq(schema.shoppingListItemsTable.id, itemId)
          )
        )
        .execute();

      if (!result) {
        return c.json({ error: "Item not found" }, 404);
      }

      return c.json({ message: "Item updated successfully" });
    }
  );
