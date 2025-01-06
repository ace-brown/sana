const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const User = require('../models/user')
const { Report, defaultStages } = require('../models/report')
const Idea = require('../models/idea')


// Get a spesific idea by a specific report id 
async function getIdeaById(req, res, next) {
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
async function getIdeasByUserId(req, res, next) {
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
async function createIdea(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new HttpError("Invalid input passed, please check your data", 422)
    }

    const {
        ownerId,
        fatherName,
        country,
        state,
        city,
        career,
        maritalStatus,
        gender,
        mobileNumber,
        age,
        branchOfStudy,
        branchDetail,
        ideaTitle,
        ideaDescription,
    } = req.body;


    const createdIdea = new Idea({
        ownerId,
        fatherName,
        country,
        state,
        city,
        career,
        maritalStatus,
        gender,
        mobileNumber,
        age,
        branchOfStudy,
        branchDetail,
        ideaTitle,
        ideaDescription,
    });

    let user;
    try {
        user = await User.findById(ownerId);
    } catch (err) {
        return next(new HttpError("Creating idea failed, please try again", 404))
    }

    if (!user) {
        return next(new HttpError("Could not find user, please check the user ID", 404))
    }

    const createdReport = new Report({
        ideaTitle,
        ideaId: createdIdea._id,
        ownerId,
        stages: defaultStages,
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        // Save the idea and report within the same transaction
        await createdIdea.save({ session: sess });
        await createdReport.save({ session: sess });

        // Link the report to the idea
        createdIdea.reportId = createdReport._id;
        await createdIdea.save({ session: sess });

        // Update the user with the created idea and report
        user.ideas.push(createdIdea);
        user.reports.push(createdReport);
        await user.save({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        console.log(err)
        return next(new HttpError("Creating idea and report failed, please try again later.", 500));
    }

    res.status(201).json({ idea: createdIdea });
}

// Update a specific idea
async function updateIdea(req, res, next) {
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

// Delete a specific idea
async function deleteIdea(req, res, next) {
    const ideaId = req.params.eid;

    let idea;
    try {
        idea = await Idea.findById(ideaId).populate('ownerId');
    } catch (err) {
        return next(new HttpError("Something went wrong, could not delete idea.", 500));
    }

    if (!idea) {
        return next(new HttpError("Could not find an idea for the provided id", 404));
    }

    let report;
    try {
        report = await Report.findOne({ ideaId: idea._id }).populate('ownerId');
    } catch (err) {
        return next(new HttpError("Something went wrong, could not delete idea.", 500));
    }


    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()

        // Delete the idea and report
        await idea.deleteOne({ session: sess });
        await report.deleteOne({ session: sess });

        // Update the user with the deleted idea and report
        idea.ownerId.ideas.pull(idea._id)
        report.ownerId.reports.pull(report._id)

        await idea.ownerId.save({ session: sess });
        await report.ownerId.save({ session: sess });
        await sess.commitTransaction()
    } catch (err) {
        await sess.abortTransaction();
        return next(new HttpError("Deleting idea failed.", 500));
    }

    res.status(200).json(
        {
            message: `idea with ideaId ${idea._id} and report with reportId ${report._id} deleted successfully.`
        });

}


exports.getIdeaById = getIdeaById
exports.getIdeasByUserId = getIdeasByUserId
exports.createIdea = createIdea
exports.updateIdea = updateIdea
exports.deleteIdea = deleteIdea