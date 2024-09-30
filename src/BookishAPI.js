import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BookishAPI {
    static token;
    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BookishAPI.token}` };
        const params = (method === "get") ? data : {};
        try {
            const response = await axios({ url, method, data, params, headers });
            return response.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
    //--------------------------------------------Individual API Routes--------------------------------------------
    static async searchOpenLibrary(query) {
        let q = query.replace(/\s+/g, '+');
        const res = await axios.get(`https://openlibrary.org/search.json?title=${q}&limit=15`);
        const { docs } = res.data;
        if (docs) {
            const olids = docs.map(book => book.key.split('/').pop());
            const savedBooks = await Promise.all(olids.map(async (id) => {
                const bookDetails = await this.request(`books/${id}`);
                return bookDetails;  // Return the saved book object
            }));

            return savedBooks;  // Return all saved books
        }

        return null;
    }
    //-------------------------------------------- USER --------------------------------------------

    static async getAllUsers() {
        let res = await this.request("users");
        return res.users;
    }

    /** Get current user */
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /**Login user */
    static async login(data) {
        const { username, password } = data;
        try {
            let res = await this.request(`auth/login`, { username, password }, "post");
            if (!res.token) {
                throw new Error(res.message || "Login failed. Please check your credentials.");
            }
            return res.token;
        } catch (err) {
            throw new Error(err.message || "An unexpected error occurred during login.");
        }
    }

    /**Signup user*/
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /**Update user profile page */
    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;

    }

    static async followUser(followerId, userId) {
        let res = await this.request(`users/${userId}/follow`, { followerId }, "post");
        return res.follow;
    }

    static async getFollowers(userId) {
        let res = await this.request(`users/${userId}/followers`);
        return (res.followers ? res.followers : 0);
    }

    static async getFollowing(userId) {
        let res = await this.request(`users/${userId}/following`);
        return (res.following ? res.following : 0);
    }

    static async unfollowUser(followerId, userId) {
        await this.request(`users/${userId}/unfollow`, { followerId }, "delete");
    }

    //-------------------------------------------- BOOKS --------------------------------------------
    static async getAllBooks() {
        let res = await this.request("books");
        return res.books;
    }

    static async getBookById(bookId) {
        let res = await this.request(`books/${bookId}`);
        return res.book;
    }

    static async searchBooks(query) {
        let res = await this.request(`books/search`, { query });
        return res.books;
    }
    //-------------------------------------------- LISTS --------------------------------------------
    static async getUserLists(userId) {
        let res = await this.request(`lists/users/${userId}`);
        return res.lists;
    }

    static async getListById(listId) {
        let res = await this.request(`lists/${listId}`);
        return res;
    }

    static async getBooksOnList(listId) {
        let res = await this.request(`lists/${listId}/books`);
        return res.result;
    }

    static async createList({ userId, listName, isPrivate }) {
        let res = await this.request("lists", { userId, listName, isPrivate }, "post");
        return res.list;
    }

    static async updateList(listId, data) {
        let res = await this.request(`lists/${listId}`, data, "put");
        return res.list;

    }
    static async deleteList(listId) {
        await this.request(`lists/${listId}`, {}, "delete");
    }

    static async addBookToList(listId, bookId) {
        let res = await this.request(`lists/${listId}/books`, { bookId }, "post");
        return res.book;
    }

    static async removeBookFromList(listId, bookId) {
        await this.request(`lists/${listId}/${bookId}`, {}, "delete");
    }

    //-------------------------------------------- REVIEWS/RATINGS --------------------------------------------
    static async getAllReviews(bookId) {
        let res = await this.request(`books/${bookId}/reviews`);
        const reviews = {
            avgRating: res.avgRating,
            review: res.data
        }
        return reviews;
    }

    static async getReview(bookId, reviewId) {
        let res = await this.request(`books/${bookId}/reviews/${reviewId}`);
        return res.review;
    }


    static async addReview(bookId, reviewText, rating) {
        let res = await this.request(`books/${bookId}/reviews`, { reviewText, rating }, "post");
        const reviews = {
            avgRating: res.avgRating,
            review: res.data
        }
        return reviews;
    }

    static async deleteReview(bookId, reviewId) {
        await this.request(`books/${bookId}/reviews/${reviewId}`, {}, "delete");
    }

    static async updateReview(bookId, reviewId, reviewText, rating) {
        let res = await this.request(`books/${bookId}/reviews/${reviewId}`, { reviewText, rating }, "put");
        const reviews = {
            avgRating: res.avgRating,
            review: res.data
        }
        return reviews;
    }

}

export default BookishAPI;