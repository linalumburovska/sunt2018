function getImageSrc(path) {
    return process.env.PUBLIC_URL + "/images/" + path;
}

export {getImageSrc}