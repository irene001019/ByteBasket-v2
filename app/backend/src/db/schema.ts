import { sql } from "drizzle-orm";
import { integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

//user table
export const usersTable = sqliteTable("users", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

// Item table
export const itemsTable = sqliteTable('Item', {
  itemId: text('ItemID').primaryKey().notNull(),
  itemName: text('ItemName').notNull(),
  quantity: integer('Quantity').default(1),
  description: text('Description').default(''),
});

// ShoppingList table
export const shoppingListTable = sqliteTable('ShoppingList', {
  shoppingListId: text('ShoppingListID').primaryKey().notNull(),
  userId: text('UserID').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  listName: text('ListName').notNull(),
});

// ShoppingListItem table
export const shoppingListItemsTable = sqliteTable('ShoppingListItem', {
  itemId: text('ItemID').notNull().references(() => itemsTable.itemId, { onDelete: 'cascade' }),
  bought: integer({ mode: 'boolean' }),
  priority: text('Priority').default('Medium'),
  shoppingListId: text('ShoppingListID')
    .notNull()
    .references(() => shoppingListTable.shoppingListId, { onDelete: 'cascade' }),
});

// PantryList table
export const pantryListTable = sqliteTable('PantryList', {
  pantryListId: text('PantryListID').primaryKey().notNull(),
  userId: text('UserID').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

// PantryListItem table
export const pantryListItemTable = sqliteTable('PantryListItem', {
  itemId: text('ItemID').notNull().references(() => itemsTable.itemId, { onDelete: 'cascade' }),
  pantryListId: text('PantryListID')
    .notNull()
    .references(() => pantryListTable.pantryListId, { onDelete: 'cascade' }),
  expiryDate: text("timestamp")
  .notNull()
  .default(sql`(current_timestamp)`),
});

// HistoryList table
export const historyListTable = sqliteTable('HistoryList', {
  historyId: text('HistoryID').primaryKey().notNull(),
  userId: text('UserID').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

// HistoryListItem table
export const historyListItemTable = sqliteTable('HistoryListItem', {
  itemId: text('ItemID').notNull().references(() => itemsTable.itemId, { onDelete: 'cascade' }),
  historyId: text('HistoryID')
    .notNull()
    .references(() => historyListTable.historyId, { onDelete: 'cascade' }),
  purchaseDate: text("timestamp")
      .notNull()
      .default(sql`(current_timestamp)`),
});
