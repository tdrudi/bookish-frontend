API URL: https://openlibrary.org/developers/api Bookish Link:

Description: I created a platform where users can search for books, write and read reviews, and create personalized lists of books. It aims to provide an engaging and user-friendly experience for book lovers to explore literature, share insights, and keep track of their reading goals.

Features Implemented: Book Search: Allows users to search for books. This feature is essential for helping users discover new books and find specific titles quickly. Book Reviews: Users can write and read reviews. This fosters community engagement and helps users make informed reading choices based on others’ opinions. Reading Lists: Users can create and manage lists. This feature enables users to organize their reading preferences and track their reading journeys. User Profiles: Each user has a profile that displays their reviews, lists, and reading history. This personalizes the experience and encourages social interaction. Rating System: Users can rate books on a scale (e.g., 1 to 5 stars). This provides a quick visual cue for book quality and popularity.

Tests: Tests are located alongside the files they are testing, in the same directory. This structure helps maintain clarity and organization, making it easier to find and modify tests as the codebase evolves.

To run the tests, navigate to the root of your project and execute the following command: npm test

User Flow: Sign Up / Login: Users start by creating an account or logging in. Search for Books: Users can enter search terms in the search bar to find books. View Book Details: Clicking on a book displays detailed information, including reviews and ratings. Write a Review: Users can write their own review and submit a rating for the book. Create/Manage Lists: Users can create a new reading list or manage existing ones, adding books to their lists.

API: Openlibrary API URL: https://openlibrary.org/developers/api

Technology Stack: Frontend: React.js, HTML, CSS, Axios for API calls Backend: Node.js, Express.js Database: PSQL for storing user data, books, lists, and reviews Authentication: JSON Web Tokens (JWT) Testing: Jest and React Testing Library
