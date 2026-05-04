import * as reservationService from './reservation.service.js';

export const getReservations = async (req, res) => {
    try {
        const filters = {
            status: req.query.status,
            user_id: req.query.user_id,
            room_id: req.query.room_id,
        };
        const reservations = await reservationService.getAllReservations(filters);
        return res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};

export const getReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await reservationService.getReservationById(id);
        return res.status(200).json({
            success: true,
            data: reservation,
        });
    } catch (error) {
        const statusCode = error.message === 'Reservation not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};

export const createReservation = async (req, res) => {
    try {
        const reservationData = req.body;
        const newReservation = await reservationService.createNewReservation(reservationData);
        return res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: newReservation,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to create reservation',
        });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservationData = req.body;
        const updatedReservation = await reservationService.editReservation(id, reservationData);
        return res.status(200).json({
            success: true,
            message: 'Reservation updated successfully',
            data: updatedReservation,
        });
    } catch (error) {
        const statusCode = error.message === 'Reservation not found' ? 404 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to update reservation',
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes_from_admin } = req.body;
        const updated = await reservationService.updateReservationStatus(id, { status, notes_from_admin });
        return res.status(200).json({
            success: true,
            message: 'Reservation status updated successfully',
            data: updated,
        });
    } catch (error) {
        const statusCode = error.message === 'Reservation not found' ? 404 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to update reservation status',
        });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const canceled = await reservationService.cancelReservation(id);
        return res.status(200).json({
            success: true,
            message: 'Reservation canceled successfully',
            data: canceled,
        });
    } catch (error) {
        const statusCode = error.message === 'Reservation not found' ? 404 : 400;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to cancel reservation',
        });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await reservationService.removeReservation(id);
        return res.status(200).json({
            success: true,
            message: 'Reservation deleted successfully',
        });
    } catch (error) {
        const statusCode = error.message === 'Reservation not found' ? 404 : 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to delete reservation',
        });
    }
};
