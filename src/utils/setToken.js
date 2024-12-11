const setToken = (res, tokenName, tokenValue) => {
    res.cookie(tokenName, tokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: tokenName ==='invoCloudAccessToken' ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
    })
}

export default setToken;