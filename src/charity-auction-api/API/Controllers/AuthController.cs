using BLL.Constants;
using BLL.Models.Responses;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IRefreshTokenService refreshTokenService;

        public AuthController(IAuthService userService, IRefreshTokenService refreshTokenService)
        {
            this._authService = userService;
            this.refreshTokenService = refreshTokenService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.Login(loginDto);
            SetCookies(result.Data.Token, result.Data.RefreshToken.ToString());
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Error);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.Register(registerDto);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result.Error);
        }

        [HttpPost]
        [Route(nameof(Refresh))]
        public async Task<IActionResult> Refresh(AuthSuccessResponse model)
        {
            var refreshToken = this.Request.Cookies[ApiConstants.RefreshToken];
            var jwtToken = this.Request.Cookies[ApiConstants.JwtToken];

            if (refreshToken == null || jwtToken == null)
            {
                return this.Unauthorized();
            }

            model.RefreshToken = Guid.Parse(refreshToken);
            model.Token = jwtToken;
            var result = await refreshTokenService.RevokeRefreshToken(model);
            this.SetCookies(result.Data.Token, result.Data.RefreshToken.ToString());
            return this.Ok(result);
        }

        /// <summary>
        /// Invalidates jwt tokens and removes cookies - logout user
        /// </summary>
        [HttpPost]
        [Route(nameof(Logout))]
        public async Task<IActionResult> Logout()
        {
            this.Request.Cookies.TryGetValue(ApiConstants.RefreshToken, out var refreshToken);
            this.Response.Cookies.Delete(ApiConstants.JwtToken);
            this.Response.Cookies.Delete(ApiConstants.RefreshToken);

            await _authService.Logout(refreshToken);
            return this.Ok();
        }

        private void SetCookies(string jwtToken, string refreshToken)
        {
            this.SetJwtTokenCookie(jwtToken);
            this.SetRefreshTokenCookie(refreshToken);
        }

        private void SetRefreshTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTime.UtcNow.AddMonths(ApplicationConstants.RefreshTokenExpirationTimeInMonths)
            };

            this.Response.Cookies.Append(ApiConstants.RefreshToken, token, cookieOptions);
        }

        private void SetJwtTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                // It doesn't mater what time we will set since we check the expiration time later :)
                Expires = DateTimeOffset.MaxValue
            };

            this.Response.Cookies.Append(ApiConstants.JwtToken, token, cookieOptions);
        }
    }
}
