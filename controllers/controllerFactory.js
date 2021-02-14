const { reset } = require("nodemon");

const ErrorCreator = require(`${__dirname}/../utils/errorHandler`);

//Here common functions are created an used for CRUD operations

exports.getAll = async (req, res, next, Model) => {
  try {
    const results = await Model.find({});
    res.status(200).json({
      status: "Success",
      results: results.length,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
exports.createOne = async (req, res, next, Model) => {
  try {
    const data = req.body;
    const result = await Model.create(data);
    res.status(201).json({ status: "Succes!", data });
  } catch (err) {
    next(err);
  }
};

exports.updateOne = async (req, res, next, Model) => {
  try {
    const data = req.body;
    const id = req.params.id;
    console.log(id);
    const result = await Model.findByIdAndUpdate(id, data);
    res.status(200).json({ status: "Succesfully updated", data });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next, Model) => {
  try {
    const id = req.params.id;
    const result = await Model.findById(id);
    res.status(200).json({
      status: "Success",
      result,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next, Model) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Model.findByIdAndDelete(id);
    res.status(204).json({ status: "Success" });
  } catch (err) {
    next(err);
  }
};
