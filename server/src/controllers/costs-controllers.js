const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const { Cost, predefinedServices } = require('../models/cost')

// Get a spesific idea by a specific report id 
async function getCostById(req, res, next) {
    const ideaId = req.params.eid;

    let idea;
    try {
        idea = await Idea.findById(ideaId);
    } catch (err) {
        return next(new HttpError("Something went wrong, couldn't find idea.", 500))
    }

    if (!idea) {
        return next(new HttpError("Could not find a idea for the provided id", 404))
    }

    res.json({ idea: idea.toObject({ getters: true }) })
}

// Get all ideas for a specific user with a userId
async function getCostsByUserId(req, res, next) {
    const userId = req.params.uid;

    let ideasForUser;
    try {
        ideasForUser = await Idea.find({ ownerId: userId })
    } catch (err) {
        return next(new HttpError("Fetching ideas faild, please try again later", 500))
    }

    if (!ideasForUser || ideasForUser.length === 0) {
        return next(new HttpError("Could not find ideas for the provided user id", 404))
    }

    res.json({ ideasForUser: ideasForUser.map(r => r.toObject({ getters: true })) })
}

// Create a new idea
async function createCost(req, res) {
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
                s => s.serviceName === service.service
            );
            if (!predefinedService) {
                throw new Error(`Invalid service: ${service.service}`);
            }
            return {
                service: predefinedService.serviceName,
                price: predefinedService.price,
                expert: predefinedService.expert
            };
        });

        const newCost = new Cost({
            userId,
            reportId,
            selectedServices: validatedServices
        });

        await newCost.save();

        res.status(201).json({ message: "Cost created successfully.", cost: newCost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong.", error: err.message });
    }
};

// Update a specific idea
async function updateCost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid input passed, please check your data", 422);
    }

    const ideaId = req.params.eid;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(ideaId)) {
            return next(new HttpError("Invalid idea ID", 400));
        }

        const idea = await Idea.findById(ideaId);
        if (!idea) {
            return next(new HttpError("Could not find an idea for the provided ID", 404));
        }

        // Check if the idea is for the user
        // if (idea.creator !== req.userData.userId) {
        //     const error = new HttpError(
        //         'You are not allowed to edit this idea.',
        //         401
        //     );
        //     return next(error);
        // }

        // Check if ideaTitle is being updated
        if (updates.ideaTitle && updates.ideaTitle !== idea.ideaTitle) {
            const report = await Report.findOne({ ideaId: idea._id });
            if (report) {
                report.ideaTitle = updates.ideaTitle;
                await report.save();
            }
        }

        // Update the Idea document
        const updatedIdea = await Idea.findByIdAndUpdate(
            ideaId,
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({ idea: updatedIdea.toObject({ getters: true }) });
    } catch (error) {
        console.error(error);
        return next(new HttpError("Updating idea failed, please try again later.", 500));
    }
}




exports.getCostById = getCostById
exports.getCostsByUserId = getCostsByUserId
exports.createCost = createCost
exports.updateCost = updateCost