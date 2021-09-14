/**
 *
 *
 * This is a REST controller factory
 *  It provides basic controllers for CRUD functions.
 *
 */

import ErrorCreator from './../utils/ErrorCreator.js';
import Doctor from '../models/doctorsModel.js';

const getAll = async (req, res, next, Model) => {
	try {
		const data = await Model.find({}).populate('appointments');
		res.status(200).json({
			status: 'success',
			results: data.length,
			data,
		});
	} catch (err) {
		console.log(err);
	}
};
const addOne = async (req, res, next, Model) => {
	try {
		const newEntry = await Model.create(req.body);
		res.status(200).json({ status: 'Added!', data: newEntry });
	} catch (err) {
		next(err);
	}
};

const getOneById = async (req, res, next, Model) => {
	try {
		//Search the data by its id passed as a URL paramater
		let data;
		console.log(Model.modelName);
		if (Model.modelName == 'appointment') {
			data = await Model.findById(req.params.id).populate('doctor');
		} else {
			data = await Model.findById(req.params.id);
		}
		//Raise an error if we can not find the data
		if (!data)
			throw new ErrorCreator(404, 'There is no data with that id');

		//On success , send the data to client with 200

		res.status(200).json({ status: 'Success', data });
	} catch (err) {
		//Handle errors that may occurr
		next(err);
	}
};

const updateOneById = async (req, res, next, Model) => {
	try {
		/**
		 * Query the data by ID
		 * and store the updated document to send it
		 */
		const data = await Model.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		//Check if Model to update was found
		if (!data)
			throw new ErrorCreator(404, 'There is no data with that id');
		//On success, send the updated document
		res.status(201).json({ status: 'Success', data: data });
	} catch (err) {
		next(err);
	}
};

const deleteOneById = async (req, res, next, Model) => {
	try {
		/**
           * Search document to be deleted by its id
           received as an URL parameter
           */

		const data = await Model.findByIdAndDelete(req.params.id);
		/*If no data was found, raise an error */
		if (!data)
			throw new ErrorCreator(404, 'There is no data with that id');

		/* On success, send a 203 response */
		res.status(203).json();
	} catch (err) {
		next(err);
	}
};

export default {
	getAll,
	addOne,
	getOneById,
	updateOneById,
	deleteOneById,
};
