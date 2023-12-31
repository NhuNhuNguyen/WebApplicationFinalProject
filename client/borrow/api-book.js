const create = async (book) => {
  try {
    let response = await fetch("/api/books/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    let response = await fetch("/api/books/", {
      method: "GET",

      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/books/" + params.bookId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const readFromPub = async (params) => {
  try {
    let response = await fetch("/api/books/" + params.bookId, {
      method: "GET",
      //signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const read2 = async (params, signal) => {
  alert('read2');
  try {
    let response = await fetch("/api/booksT/" + params.bookTitle, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    alert('read2 err ' +err);
    console.log(err);
  }
};
const update = async (params, credentials, book) => {
  try {
    let response = await fetch("/api/books/" + params.bookId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(book),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/books/" + params.bookId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { create, list, read, read2, readFromPub, update, remove };
