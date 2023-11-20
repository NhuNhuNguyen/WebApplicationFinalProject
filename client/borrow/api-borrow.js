const create = async (borrow) => {
  try {
    let response = await fetch("/api/borrows/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrow),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    let response = await fetch("/api/borrows/", {
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
    let response = await fetch("/api/borrows/" + params.borrowId, {
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
//const update = async (params, credentials, borrow) => {
const update = async (params, borrow) => {
  try {
    let response = await fetch("/api/borrows/" + params.borrowId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(borrow),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
//const remove = async (params, credentials) => {
const remove = async (params) => {
  try {
    let response = await fetch("/api/borrows/" + params.borrowId, {
      method: "DELETE",
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
export { create, list, read, update, remove };
