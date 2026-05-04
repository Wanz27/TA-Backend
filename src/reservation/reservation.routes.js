import express from 'express';
import * as reservationController from './reservation.controller.js';

const router = express.Router();

router.get('/', reservationController.getReservations);
router.get('/:id', reservationController.getReservation);
router.post('/', reservationController.createReservation);
router.put('/:id', reservationController.updateReservation);
router.patch('/:id/status', reservationController.updateStatus);
router.patch('/:id/cancel', reservationController.cancelReservation);
router.delete('/:id', reservationController.deleteReservation);

export default router;
