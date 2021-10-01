import { getOrdersForHomePage } from "../../repositories/orderRepo.js";
import { multipleMongooseToObj } from "../../helpers/mongooseHelper.js";
import { ORDER_PROCESSING, ORDER_DELIVERING, ORDER_DONE, ORDER_CANCELLED } from "../../../config/constants.js";

export const index = async (req, res) => {
    const result = await getOrdersForHomePage();

    const needActions = multipleMongooseToObj(result.needActions);

    return res.render('home', {
        needActions,
        processing: result.processingCount,
        delivering: result.deliveringCount,
        done: result.doneCount,
        cancelled: result.cancelledCount,
        lastMonthIncome: result.lastMonthIncome,
    });
}