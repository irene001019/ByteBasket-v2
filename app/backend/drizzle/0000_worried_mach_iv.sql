--> statement-breakpoint
CREATE TABLE
	users (
		`id` text PRIMARY KEY AUTOINCREMENT NOT NULL,
		`name` text NOT NULL,
		`email` text UNIQUE NOT NULL,
		`password` text NOT NULL
	);

CREATE TABLE
	Item (
		'ItemID' text PRIMARY KEY AUTOINCREMENT,
		'ItemName' TEXT NOT NULL,
		'Quantity' INTEGER DEFAULT 1,
		'Description' TEXT DEFAULT ' ',
	);

-- ShoppingList table
CREATE TABLE
	ShoppingList (
		'ShoppingListID' text UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
		'UserID' text NOT NULL,
		'ListName' TEXT NOT NULL,
		FOREIGN KEY (UserID) REFERENCES users (id) ON DELETE CASCADE
	);

-- ShoppingListItem table
CREATE TABLE
	ShoppingListItem (
		'ItemID' text NOT NULL,
		'ShoppingListID' text NOT NULL,
		'Priority' TEXT DEFAULT 'Medium',
		FOREIGN KEY (ItemID) REFERENCES Item (ItemID) ON DELETE CASCADE,
		FOREIGN KEY (ShoppingListID) REFERENCES ShoppingList (ShoppingListID) ON DELETE CASCADE
	);

-- PantryList table
CREATE TABLE
	PantryList (
		'PantryListID' text PRIMARY KEY AUTOINCREMENT,
		'UserID' text NOT NULL,
		FOREIGN KEY (UserID) REFERENCES users (id) ON DELETE CASCADE
	);

-- PantryListItem table
CREATE TABLE
	PantryListItem (
		'ItemID' text NOT NULL,
		'PantryListID' text NOT NULL,
		'ExpiryDate' text,
		FOREIGN KEY (ItemID) REFERENCES Item (ItemID) ON DELETE CASCADE,
		FOREIGN KEY (PantryListID) REFERENCES PantryList (PantryListID) ON DELETE CASCADE
	);

-- History table
CREATE TABLE
	HistoryList (
		'HistoryID' text PRIMARY KEY AUTOINCREMENT,
		'UserID' text NOT NULL,
		FOREIGN KEY (UserID) REFERENCES users (id) ON DELETE CASCADE
	);

-- HistoryListItem table
CREATE TABLE
	HistoryListItem (
		'ItemID' text NOT NULL,
		'HistoryID' text NOT NULL,
		'purchaseDate' text DEFAULT CURRENT_DATE,
		FOREIGN KEY (ItemID) REFERENCES Item (ItemID) ON DELETE CASCADE,
		FOREIGN KEY (HistoryID) REFERENCES HistoryList (HistoryID) ON DELETE CASCADE
	);