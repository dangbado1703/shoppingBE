import { QueryTypes } from "sequelize";
import db from "../config/config";
import { Products } from "../models/products.model";
import { IFormSearchProducts } from "../type/products.type";

export const searchProducts: (
  searchObj: Partial<IFormSearchProducts>
) => Promise<{ dataSearch: object[] | undefined; count: any }> = async (
  searchObj: Partial<IFormSearchProducts>
) => {
  let sql =
    "select p.product_id, p.product_name, p.product_code, p.facturers, p.product_price, p.image, p.star, p.stock, p.sold, json_arrayagg(pc.category_name) as category_name from products as p left join product_category as pc on p.product_id = pc.product_id where true ";
  let index = 0;
  let result: any[] = [];
  if (searchObj.category_id && searchObj.category_id.length) {
    result = [...searchObj.category_id];
    sql += "and (false ";
    searchObj.category_id.forEach((item) => {
      sql += `or pc.category_name = $${++index} `;
    });
    sql += ") ";
  }
  if (searchObj.facturers) {
    result = result.concat(searchObj.facturers);
    sql += `and p.facturers = $${++index} `;
  }
  if (searchObj.price_from) {
    result = result.concat(searchObj.price_from);
    sql += `and p.product_price >= cast($${++index} as unsigned int) `;
  }
  if (searchObj.price_to) {
    result = result.concat(searchObj.price_to);
    sql += `and p.product_price <= cast($${++index} as unsigned int) `;
  }
  if (searchObj.product_code) {
    result = result.concat(searchObj.product_code);
    sql += `and p.product_code = $${++index} `;
  }
  if (searchObj.product_name) {
    result = result.concat(searchObj.product_name);
    sql += `and lower(p.product_name) like lower(concat('%', $${++index}, '%')) `;
  }
  if (searchObj.status) {
    result = result.concat(searchObj.status);
    sql += `and p.status = $${++index} `;
  }
  if (searchObj.stock_from) {
    result = result.concat(searchObj.stock_from);
    sql += `and p.stock >= cast($${++index} as unsigned int) `;
  }
  if (searchObj.stock_to) {
    result = result.concat(searchObj.stock_to);
    sql += `and p.stock <= cast($${++index} as unsigned int) `;
  }
  sql += "group by p.product_id ";
  const queryCount = `select count(*) as total from (${sql}) as search`;
  sql += `order by p.sold desc limit ${searchObj.size} offset ${searchObj.offset}`;
  const dataSearch = await db.sequelize?.query(sql, {
    bind: result,
    type: QueryTypes.SELECT,
  });
  const count = await db.sequelize?.query(queryCount, {
    bind: result,
    type: QueryTypes.SELECT,
  });
  return { dataSearch, count };
};

export const getCategoryName = async (searchObj: { product_id: string }) => {
  let sql = "select category_name from product_category where true ";
  if (searchObj.product_id) {
    sql += "and product_id = $product_id";
  }
  return await db.sequelize?.query(sql, {
    bind: searchObj,
    type: QueryTypes.SELECT,
  });
};

export const getBestSeller = async () => {
  const sql = "select * from products where sold > 0 limit 4 offset 0";
  return await db.sequelize?.query<Products>(sql, {
    type: QueryTypes.SELECT,
  });
};
