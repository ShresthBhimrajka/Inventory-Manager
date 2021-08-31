# Inventory_Manager
An android app to manage the inventory in a warehouse for small scale buisnesses.
Works on devices running android v4.1.0 or higher.

Inventory Manager v1.0:
	App will run offline and on the device with all the libraries required already packaged in the apk.
	
	-Task 1 (Back End):
		a.	Upgrade the database using SQLite. 
		b.	Need easier access of individual ids of the items to update in inventory.
		c.	Need to store the records from top down starting from latest to oldest updates.
		d.	Build function to read all the inventory items and records to display on TableView.
		e.	Build function to write/update new inventory items and records.
			
	-Task 2 (Front and Back End):
		a. Create a Sign in/ Sign out page for main screen.
		b. Create new databases for new users.
		c. Display the username in home screen.
		
	-Task 3	(Front End):
		a. Design proper UI and Theme.
		
	-Task 4 (Back End):
		a. Validation of scanned QR code.
		b. Current format:
			itemID
			Name
			Quantity
			Date
			IN/EX
			
build.gradle, gradle, local, settings.gradle go inside your main project folder InventoryManager/

The gradle scripts inside the app folder go inside InventoryManager/app

Copy paste the gradle/wrapper into maine folder InventoryManager/

The java, res and maifest file inside mainifest folder go inside InventoryManager/app/src/main/
