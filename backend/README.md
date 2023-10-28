# Thullo API Version 1.0 Tasks List

### Backend API v1 for the trello clone project, its connected to postgresql database using prisma ORM which handles all the data management operations

## Boards:

- [x] Handler for getting all the boards
- [x] Handler for getting all the board information by id including the lists
- [x] Handler for updating the board information might the be the visibility or name, description etc.
- [x] Handler for deleting a board by id \*\* after disconnecting all the users and list associated with that board
- [x] Allow to search for a board by name

## Users:

- [x] Handler for getting all the users available
- [x] Handler for getting the user information
- [x] Handler for updating user information name or email, profilePicture
- [x] Handler for deleting a user by id \*\* before that the user should be disconnected from every card or table
- [x] Allow to search for user by name

## Lists:

- [x] Handler for getting all the lists available with cards included
- [x] Handler for getting list information
- [x] Handler for updating list information
- [x] Handler for deleting list by id \*\* before that we should remove any cards associated with list

## Cards:

- [x] Handler for getting the cards lists
- [x] Handler for displaying card information including comments, attachment, labels and list information
- [x] Handler for updating a card details
- [x] Handler for deleting card by id
- [ ] Save the cards order

## Labels:

- [x] Handler for creating label using nested cards route
- [x] Get label using nested cards route
- [x] Get the list of labels available

## Comments:

- [x] Handler for creating comment using nested cards route
- [x] Handler for creating comment using nested cards route
- [x] Handler for getting comment using nested cards route
- [x] Handler for getting the list of comments available

## Attachments:

- [x] Handler for creating attachment using nested cards route
- [x] Handler for getting attachment using nested cards route
- [x] Handler for getting the list of attachments available

## Checklists:

- [x] Handler for creating a checklist
- [x] Handler for getting a checklist using nested cards route
- [x] Handler for getting the list of checklists available

## Tasks:

- [x] Handler for creating a task
- [x] Handler for getting a task using nested checklist and card route
- [x] Handler for getting the list of all tasks available

## Authentication & security

- [x] Sign up route
- [x] Login route
- [x] Password reset route
- [x] Update password route
- [x] Logout route
- [x] Implement rate limiting
- [x] Add security headers
- [x] Add authorization middleware
- [x] Email sender function for the reset password functionality
- [x] Filter action based on the role of the user
- [x] Base the filter process on the encrypted board id which is provided by cookie

## Upload

- [x] File upload functionality
- [x] File validation
- [x] Build an image processing middlware for resizing images

## Error Handling

- [x] Global error handling middleware
- [x] Global asynchronous function error handler
- [x] Add custom error handler for database events based on the name

## Invite system

- [x] Get all the invites for a user
- [x] Get invite information route
- [x] Create a new invite
- [x] Handler for accepting invites
- [x] Handler for deleting an invite

## Validation

- [x] Integrate a validation library to validate user input
