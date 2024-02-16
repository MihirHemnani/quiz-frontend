export const encrypt = (data, key) => {
    return (
        CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
    )
}

export const decrypt = (data, key) => {
    var bytes  = CryptoJS.AES.decrypt(data, key);
    return (
        JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    )
}