import { Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { Category } from "../models/category.model";
import { searchCategory } from "../sql/searchCategory";
import { FormResponse } from "../type";
import { IFormCategory } from "../type/category.type";

export const createCategoryController = async (
  req: Request<{}, {}, Partial<IFormCategory>>,
  res: Response<FormResponse<any>>
) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Vui lòng nhập tên", status: 400 });
  try {
    const dataCategory = await Category.findOne({ where: { name } });
    if (dataCategory)
      return res
        .status(400)
        .json({ message: "Category đã tồn tại", status: 400 });
    await Category.create({ name });
    return res
      .status(200)
      .json({ message: "Tạo category thành công", status: 200 });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const updateCategoryController = async (
  req: Request<{}, {}, Partial<IFormCategory>>,
  res: Response<FormResponse<any>>
) => {
  const { id, name } = req.body;
  if (!id)
    return res.status(400).json({ message: "Thiếu id danh mục", status: 400 });
  if (!name)
    return res.status(400).json({ message: "Vui lòng nhập tên", status: 400 });
  try {
    const dataCategory = await Category.findOne({
      where: { name },
    });
    if (dataCategory)
      return res
        .status(400)
        .json({ message: "Category đã tồn tại", status: 400 });
    await Category.update({ name }, { where: { id } });
    return res
      .status(200)
      .json({ message: "Cập nhật category thành công", status: 200 });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const deleteCategoryController = async (
  req: Request<{}, {}, Partial<IFormCategory>>,
  res: Response<FormResponse<any>>
) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Thiếu id danh mục", status: 400 });
  try {
    await Category.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "Xóa danh mục thành công", status: 200 });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const searchCategoryController = async (
  req: Request<{}, {}, Partial<IFormCategory>, { page: string; size: string }>,
  res: Response<FormResponse<any>>
) => {
  const { name } = req.body;
  const { page, size } = req.query;
  try {
    const offset = (+page - 1) * +size;
    const searchObj = {
      name,
      size: size.toString(),
      offset: offset.toString(),
    };
    const { count, dataSearch } = await searchCategory(searchObj);
    return res.status(200).json({
      message: "Lấy thông tin thành công",
      data: dataSearch,
      status: 200,
      totalElements: count[0].total,
    });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};
