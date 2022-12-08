import { Request, Response } from "express";
import { readFile } from "fs";
import path from "path";
import { ERROR_INTERNAL } from "../contants/contants";
import { Products } from "../models/products.model";
import { Product_Category } from "../models/product_category.model";
import {
  getBestSeller,
  getCategoryName,
  searchProducts,
} from "../sql/searchProducts";
import { FormResponse } from "../type";
import {
  IFormCreateProducts,
  IFormSearchProducts,
} from "../type/products.type";

export const searchProductsController = async (
  req: Request<{}, {}, IFormSearchProducts, { page: string; size: string }>,
  res: Response<FormResponse<any>>
) => {
  const searchObj = req.body;
  let { page, size } = req.query;
  if (!page) {
    page = "1";
  }
  if (!size) {
    size = "10";
  }
  const offset = (+page - 1) * +size;
  try {
    const { dataSearch, count } = await searchProducts({
      ...searchObj,
      offset: offset.toString(),
      size,
    });
    if (dataSearch?.length) {
      for (let data of dataSearch) {
        (data as any).image = `http://localhost:${process.env.PORT}/${
          (data as any).image
        }`;
      }
    }
    return res.status(200).json({
      message: "Tìm kiếm thành công",
      data: dataSearch,
      status: 200,
      totalElements: count[0].total,
    });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const createProductsController = async (
  req: Request<{}, {}, IFormCreateProducts>,
  res: Response<FormResponse<any>>
) => {
  let { product_name, product_price, facturers, stock, category_name } =
    req.body;
  try {
    const dataCreate = await Products.create({
      product_name,
      product_price,
      facturers,
      stock,
      user_id: req.user_id,
      createdAt: new Date(),
      product_code: Math.random().toString(),
      image: req.file?.filename,
    });
    if (typeof category_name === "string") {
      category_name = [category_name];
    }
    for (const item of category_name) {
      await Product_Category.create({
        category_name: item,
        product_id: dataCreate.dataValues.product_id,
        product_name,
      });
    }

    return res
      .status(200)
      .json({ message: "Tạo sản phẩm thành công", status: 200 });
  } catch (error) {
    console.log("error::", error);
    return ERROR_INTERNAL(res);
  }
};

export const detailProductController = async (
  req: Request<{}, {}, {}, Pick<Products, "product_id">>,
  res: Response<FormResponse<any>>
) => {
  const { product_id } = req.query;
  if (!product_id)
    return res.status(400).json({ message: "Thiếu id sản phẩm", status: 400 });
  try {
    const data = await Products.findOne({ where: { product_id } });
    if (!data)
      return res
        .status(400)
        .json({ message: "Không tồn tại sản phẩm này", status: 400 });
    const category = await getCategoryName({
      product_id,
    });
    const newCategory = category?.map((item: any) => item.category_name);
    console.log("newCategory:::", newCategory);
    data.image = `http://localhost:${process.env.PORT}/${data.image}`;
    (data as any).dataValues.category_name = newCategory;
    console.log("data:::", data);
    return res.status(200).json({
      message: "Lấy thông tin thành công",
      data,
      status: 200,
    });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const updateProductController = async (
  req: Request<{}, {}, IFormCreateProducts, {}>,
  res: Response<FormResponse<any>>
) => {
  const {
    product_id,
    product_name,
    product_price,
    facturers,
    stock,
    status,
    category_name,
  } = req.body;
  if (!product_id)
    return res.status(400).json({ message: "Thiếu id sản phẩm", status: 400 });
  try {
    await Product_Category.destroy({ where: { product_id } });
    for (const item of category_name) {
      await Product_Category.create({
        category_name: item,
        product_id,
        product_name,
      });
    }
    await Products.update(
      {
        product_name,
        product_price,
        facturers,
        stock,
        status,
        image: req.file?.filename,
        updatedAt: new Date(),
      },
      { where: { product_id } }
    );
    return res
      .status(200)
      .json({ message: "Cập nhật sản phẩm thành công", status: 200 });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const getBannerController = async (
  req: Request,
  res: Response<FormResponse<any>>
) => {
  try {
    const data = await Products.findAll({ where: { is_banner: 1 } });
    const newData = data?.map((item) => {
      return {
        ...item.dataValues,
        image: `http://localhost:${process.env.PORT}/${item.dataValues.image}`,
      };
    });
    return res.status(200).json({
      message: "Lấy danh sách banner thành công",
      data: newData,
      status: 200,
    });
  } catch (error) {
    console.log("error::", error);
    return ERROR_INTERNAL(res);
  }
};

export const getFeaturedController = async (
  req: Request,
  res: Response<FormResponse<any>>
) => {
  try {
    const data = await Products.findAll({ where: { is_featured: 1 } });
    const newData = data?.map((item) => {
      return {
        ...item.dataValues,
        image: `http://localhost:${process.env.PORT}/${item.dataValues.image}`,
      };
    });
    return res.status(200).json({
      message: "Lấy thông tin featured thành công",
      data: newData,
      status: 200,
    });
  } catch (error) {
    console.log("error::", error);
    return ERROR_INTERNAL(res);
  }
};

export const getBestSellerController = async (
  req: Request,
  res: Response<FormResponse<any>>
) => {
  try {
    const data = await getBestSeller();
    const newData = data?.map((item) => {
      console.log("item::::", item);
      return {
        ...item,
        image: `http://localhost:${process.env.PORT}/${item?.image}`,
      };
    });
    return res.status(200).json({
      message: "Lấy thông tin best seller thành công",
      data: newData,
      status: 200,
    });
  } catch (error) {
    console.log("error::", error);
    return ERROR_INTERNAL(res);
  }
};
