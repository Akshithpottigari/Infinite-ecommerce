export const JWT_CONFIG = {
    SECRET: "0Gtw]HAL[+,[Zc%.JUBQkQl;sXBWp{tj2EtLGmCXTT}C)P-M{J",
    access_token_expires_in: "20d",
    refresh_token_expires_in: "10h",
};
export const BCRYPT_CONFIG = {
    saltRounds: 10
}
export const dataStandards = {
    adminName: {
        min: 4,
        max: 25
    },
    password: {
        length: 16
    },
    categoryName: {
        min: 3,
        max: 36
    },
    productName: {
        min: 3,
        max: 45
    },
    productDescription: {
        min: 10,
        max: 255
    }
}