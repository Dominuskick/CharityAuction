using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Constants
{
    public static class Messages
    {
        public static string AuctionNotFound = "Auction not found.";
        public static string AuctionCreated = "Auction has created.";
        public static string AuctionUpdated = "Auction has updated.";
        public static string AuctionDeleted = "Auction has deleted.";
        public static string AuctionsListed = "Auctions has listed.";
        public static string AuctionsListedByCategory = "Auctions has listed by category.";

        public static string AuthorizationDenied = "You are not authorized.";
        public static string UserRegistered = "The user has registered.";
        public static string UserNotFound = "User not found.";
        public static string SuccessfulLogin = "Login successful.";
        public static string PasswordError = "Bad password.";
        public static string UserAlreadyExists = "The user already exists.";
        public static string AccessTokenCreated = "Access token has created.";
    }
}
