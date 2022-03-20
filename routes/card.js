const router = require("express").Router();

const Card = require("../models/card");

const isOnlyNumbers = require("../helpers/is-only-numbers");

router.post("/add-card", async (req, res) => {
  try {
    const { cardNumber, expirationDateMonth, expirationDateYear, CVV, amount } =
      req.body;

    if (
      !cardNumber ||
      !expirationDateMonth ||
      !expirationDateYear ||
      !CVV ||
      !amount
    ) {
      return res
        .status(403)
        .json({ ok: false, message: "Все поля объязательны" });
    }

    if (!isOnlyNumbers(cardNumber)) {
      return res.status(403).json("Номер карты должен содержать только числа");
    }

    if (
      !isOnlyNumbers(expirationDateMonth) ||
      !isOnlyNumbers(expirationDateYear)
    ) {
      return res.status(403).json("Дата должна содержать только числа");
    }

    if (!isOnlyNumbers(CVV)) {
      return res.status(403).json("CVV должна содержать только числа");
    }

    if (!isOnlyNumbers(amount)) {
      return res.status(403).json("Сумма должна содержать только числа");
    }

    if (cardNumber.length !== 16) {
      return res.status(403).json("Длина номера карты должна быть равна 16");
    }

    if (expirationDateMonth > 12) {
      return res
        .status(403)
        .json({ ok: false, message: "Месяц не может быть больше 12" });
    }

    if (expirationDateYear < new Date().getFullYear()) {
      return res.status(403).json({ ok: false, message: "Время истекло" });
    }

    if (CVV.length !== 3) {
      return res
        .status(403)
        .json({ ok: false, message: "Длина CVV должна быть равна 3" });
    }

    const expirationDate = new Date(
      expirationDateYear,
      expirationDateMonth - 1,
      1
    );

    if (Date.now() > expirationDate) {
      return res.status(403).json({ ok: false, message: "Время истекло" });
    }

    const newCard = new Card({ cardNumber, expirationDate, CVV, amount });

    const savedCard = await newCard.save();

    return res.status(201).json({ ok: true, id: savedCard._id });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
