const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const { Cost, predefinedServices } = require('../models/cost')

// Get a spesific cost by a specific cost id 
async function getCostById(req, res, next) {
    const costId = req.params.cid;

    let cost;
    try {
        cost = await Cost.findById(costId);
    } catch (err) {
        return next(new HttpError("Something went wrong, couldn't find cost.", 500))
    }

    if (!cost) {
        return next(new HttpError("Could not find a cost for the provided id", 404))
    }

    res.json({ cost: cost.toObject({ getters: true }) })
}

// Get all cost for a specific user with a userId
async function getCostsByUserId(req, res, next) {
    const userId = req.params.uid;

    let costsForUser;
    try {
        costsForUser = await Cost.find({ userId: userId })
    } catch (err) {
        return next(new HttpError("Fetching costs faild, please try again later", 500))
    }

    if (!costsForUser || costsForUser.length === 0) {
        return next(new HttpError("Could not find costs for the provided user id", 404))
    }

    res.json({ costsForUser: costsForUser.map(c => c.toObject({ getters: true })) })
}

// Create a new cost
async function createCost(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new HttpError("Invalid input passed, please check your data", 422)
    }

    const { userId, reportId, selectedServices } = req.body;

    try {
        const existingCost = await Cost.findOne({ reportId });
        if (existingCost) {
            return res.status(400).json({ message: "Cost for this report already exists." });
        }

        // Validate selectedServices
        if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
            return res.status(400).json({ message: "Selected services must be a non-empty array." });
        }

        const validatedServices = selectedServices.map(service => {
            const predefinedService = predefinedServices.find(
                s => s.serviceName === service.serviceName
            );
            if (!predefinedService) {
                throw new Error(`Invalid service: ${service.serviceName}`);
            }
            return {
                serviceName: predefinedService.serviceName,
                price: service.price ?? predefinedService.price,
                expert: service.expert || predefinedService.expert
            };
        });

        const newCost = new Cost({
            userId,
            reportId,
            selectedServices: validatedServices
        });

        await newCost.save();

        res.status(201).json({ cost: newCost });
    } catch (err) {
        console.error(err);
        return next(new HttpError("Creating cost failed, please try again later.", 500))
    }
};

// Update a specific cost
async function updateCost(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError("Invalid input passed, please check your data", 422)
    }

    const costId = req.params.cid;
    const { userId, reportId, selectedServices } = req.body;

    // Validate costId format
    if (!mongoose.Types.ObjectId.isValid(costId)) {
        return res.status(400).json({ message: "Invalid cost ID format." });
    }

    try {
        const cost = await Cost.findById(costId);
        if (!cost) {
            return res.status(404).json({ message: "Cost not found." });
        }

        // Update fields if provided in the request
        if (userId) cost.userId = userId;
        if (reportId) cost.reportId = reportId;

        if (selectedServices && Array.isArray(selectedServices)) {
            const validatedServices = selectedServices.map(service => {
                const predefinedService = predefinedServices.find(
                    s => s.serviceName === service.serviceName
                );

                if (!predefinedService) {
                    throw new Error(`Invalid service: ${service.service}`);
                }

                return {
                    service: predefinedService.serviceName,
                    price: service.price ?? predefinedService.price,
                    expert: service.expert || predefinedService.expert
                };
            });

            cost.selectedServices = validatedServices;
        }

        await cost.save();

        res.status(200).json({ message: "Cost updated successfully.", cost });
    } catch (err) {
        console.error(err);
        return next(new HttpError("Updating cost failed, please try again later.", 500))
    }
}


exports.getCostById = getCostById
exports.getCostsByUserId = getCostsByUserId
exports.createCost = createCost
exports.updateCost = updateCost