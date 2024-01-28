async function fetchData(method, url, data, headers) {
    let response = null;
    try {
        response = await fetch(process.env.REACT_APP_BASEURL + url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
                ...headers,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.log("Error From fetchData functon");
        console.log(error);
    }

    if (!response) return;

    let result = await response?.json();
    return result;
}

export default fetchData;
