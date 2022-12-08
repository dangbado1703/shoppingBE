import { Request, Response, NextFunction } from "express";
import { validateRequired } from "../contants/contants";
import { FormResponse } from "../type";
import { userType } from "../type/user.type";
import validator from "validator";

export const validateUser = {
  create: (
    req: Request<{}, {}, userType>,
    res: Response<FormResponse<any>>,
    next: NextFunction
  ) => {
    const { email, password, phone_number, username } = req.body;
    const rules = [
      { name: "Email", required: true, value: email },
      { name: "Password", required: true, value: password },
      { name: "Phone Number", required: true, value: phone_number },
      { name: "Username", required: true, value: username },
    ];
    const { message, status_rules } = validateRequired(rules);
    if (message && status_rules)
      return res.status(status_rules).json({ message });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Không đúng định dạng email" });
    if (!validator.isMobilePhone(phone_number)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại không đúng định dạng" });
    }
    if (phone_number.length > 12)
      return res.status(400).json({ message: "Số điện thoại tối đa 12 ký tự" });
    if (phone_number.length < 4)
      return res
        .status(400)
        .json({ message: "Số điện thoại tối thiểu 4 ký tự" });
    if (password.length < 4)
      return res.status(400).json({ message: "Mật khẩu tối thiểu 4 ký tự" });
    if (password.length > 12)
      return res.status(400).json({ message: "Mật khẩu tối đa 12 ký tự" });
    if (username.length < 4)
      return res.status(400).json({ message: "Tài khoản tối thiểu 4 ký tự" });
    if (username.length > 12)
      return res.status(400).json({ message: "Tài khoản tối đa 12 ký tự" });
    return next();
  },
  update: (
    req: Request<{}, {}, userType>,
    res: Response<FormResponse<any>>,
    next: NextFunction
  ) => {
    const { email, password, phone_number, is_active } = req.body;
    const rules = [
      { name: "Email", required: true, value: email },
      { name: "Password", required: true, value: password },
      { name: "Phone Number", required: true, value: phone_number },
      { name: "Trạng thái hoạt động", required: true, value: is_active },
    ];
    const { message, status_rules } = validateRequired(rules);
    if (message && status_rules)
      return res.status(status_rules).json({ message });
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Không đúng định dạng email" });
    if (!validator.isMobilePhone(phone_number)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại không đúng định dạng" });
    }
    if (phone_number.length > 12)
      return res.status(400).json({ message: "Số điện thoại tối đa 12 ký tự" });
    if (password.length > 12)
      return res.status(400).json({ message: "Mật khẩu tối đa 12 ký tự" });
    if (phone_number.length < 4)
      return res
        .status(400)
        .json({ message: "Số điện thoại tối thiểu 4 ký tự" });
    if (password.length < 4)
      return res.status(400).json({ message: "Mật khẩu tối thiểu 4 ký tự" });
    if (!is_active)
      return res
        .status(400)
        .json({ message: "Trạng thái không được để trống" });
    return next();
  },
};
