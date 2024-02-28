using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Constants
{
    public static class Messages
    {
        public static class Auction
        {
            public static string AuctionNotFound = "Auction not found.";
            public static string AuctionCreated = "Auction has created.";
            public static string AuctionUpdated = "Auction has updated.";
            public static string AuctionDeleted = "Auction has deleted.";
            public static string AuctionsListed = "Auctions has listed.";
            public static string AuctionsListedByCategory = "Auctions has listed by category.";
            public static string AuctionStarted = "Auction cannot be updated because it has already been started";
            public static string AuctionEnded = "The auction has already ended.";
            public static string AuctionNotStarted = "The auction has not started yet.";
            public static string AuctionOwnerError = "You are not the owner of this auction";
            public static string AuctionDeleteError = "Auction cannot be deleted because it has already been bid on";
        }
        public static class Auth
        {
            public static string AuthorizationDenied = "You are not authorized.";
            public static string UserRegistered = "The user has registered.";
            public static string UserNotRegistered = "The user has not registered.";
            public static string UserNotFound = "User not found.";
            public static string SuccessfulLogin = "Login successful.";
            public static string PasswordError = "Bad password.";
            public static string UserAlreadyExists = "The user already exists.";
            public static string AccessTokenCreated = "Access token has created.";
            public static string UserUpdateError = "User update error.";
            public static string RefreshTokenInvalid = "Refresh token is invalid.";
            public static string RefreshTokenNotFound = "Refresh token not found.";
            public static string AccescTokenCanBeUsed = "Access token still can be used or refresh token is expired";

            public static string EmailInUse = "Email already in use.";
        }
        public static class Bid
        {
            public static string BidNotFound = "Bid not found.";
            public static string BidCreated = "Bid has created.";
            public static string BidUpdated = "Bid has updated.";
            public static string BidDeleted = "Bid has deleted.";
            public static string BidsListed = "Bids has listed.";
            public static string BidTooLow = "Your bid is too low.";
        }

        public static class Category
        {
            public static string CategoryNotFound = "Category not found.";
            public static string CategoryCreated = "Category has created.";
            public static string CategoryUpdated = "Category has updated.";
            public static string CategoryDeleted = "Category has deleted.";
            public static string CategoriesListed = "Categories has listed.";
        }

        public static class Picture
        {
            public static string PictureNotFound = "Picture not found.";
        }

        public static class SortOrder
        {
            public const string Price = "price";
            public const string PriceDesc = "price_desc";
            public const string Date = "date";
            public const string DateDesc = "date_desc";
            public const string IsActive = "isActive";
            public const string IsActiveDesc = "isActive_desc";
            public const string IsUnActive = "isUnActive";
            public const string IsUnActiveDesc = "isUnActive_desc";
        }
    }
}
