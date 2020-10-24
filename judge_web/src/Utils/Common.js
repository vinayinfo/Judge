// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
}

// set the token and user from the session storage
export const setUserSession = (objs) => {
  Object.keys(objs).forEach((item, i) => {
    if(typeof objs[item] === "object") {
        sessionStorage.setItem(item, JSON.stringify(objs[item]));
    } else {
        sessionStorage.setItem(item, objs[item]);
    }
  });
}

export const getUserSession = (key) => {
    let session = sessionStorage.getItem(key);
    try {
      return JSON.parse(session)
    } catch (e) {
      return session
    }
}
