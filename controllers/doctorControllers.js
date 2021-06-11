const Doctor = require(`${__dirname}/../models/doctorsModel.js`);

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({ status: 'success', data: doctors });
  } catch (err) {
    console.log(err);
  }
};
exports.addDoctor = async (req, res, next) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(200).json({ status: 'Added!', data: newDoctor });
  } catch (err) {
    next(err);
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    //Search the doctor by its id passed as a URL paramater
    const doctor = await Doctor.findById(req.params.id);
    //Raise an error if we can not find the doctor
    if (!doctor) throw new ErrorCreator(404, 'There is no doctor with that id');

    //On success , send the data to client with 200

    res.status(200).json({ status: 'Success', data: doctor });
  } catch (err) {
    //Handle errors that may occurr
    next(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    /**
     * Query the doctor by ID
     * and store the updated document to send it
     */
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    //Check if Doctor to update was found
    if (!doctor) throw new ErrorCreator(404, 'There is no doctor with that id');
    //On success, send the updated document
    res.status(201).json({ status: 'Success', data: doctor });
  } catch (err) {
    next(err);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    /**
         * Search document to be deleted by its id
         received as an URL parameter
         */

    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    /*If no doctor was found, raise an error */
    if (!doctor) throw new ErrorCreator(404, 'There is no doctor with that id');

    /* On success, send a 203 response */
    res.status(203).json();
  } catch (err) {
    next(err);
  }
};
