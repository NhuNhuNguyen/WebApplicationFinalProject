import Borrow from "../models/borrow.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";
const create = async (req, res) => {
  console.log(req.body);
  const borrow = new Borrow(req.body);
  try {
    await borrow.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let borrows = await Borrow.find();
    res.json(borrows);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const borrowByID = async (req, res, next, id) => {
  try {
    let borrow = await Borrow.findById(id);
    if (!borrow)
      return res.status("400").json({
        error: "Borrow not found",
      });
    req.profile = borrow;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve borrow",
    });
  }
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let borrow = req.profile;
    borrow = extend(borrow, req.body);
    borrow.updated = Date.now();
    await borrow.save();
    borrow.hashed_password = undefined;
    borrow.salt = undefined;
    res.json(borrow);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let borrow = req.profile;
    let deletedBorrow = await borrow.deleteOne();
    deletedBorrow.hashed_password = undefined;
    deletedBorrow.salt = undefined;
    res.json(deletedBorrow);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default { create, borrowByID, read, list, remove, update };
