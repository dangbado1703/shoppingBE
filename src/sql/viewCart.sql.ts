import { QueryTypes } from "sequelize";
import db from "../config/config";
import { Count } from "../type";
import { IFormDataCart } from "../type/cart.type";

export const viewCartSQL: ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => Promise<{
  dataCart: IFormDataCart[] | undefined;
  dataCount: Count[] | undefined;
}> = async ({ page, size }: { page: number; size: number }) => {
  let sql = `select p.product_name, p.product_code, p.category_id, p.status, p.product_price, p.stock, p.image, p.sold, p.star, p.product_id, p.user_id,p.total, json_arrayagg(pc.category_name) as category_name from (
  select p.product_name, p.product_code, p.category_id, p.status, p.product_price, p.stock, p.image, p.sold, p.star, p.product_id, c.user_id, c.total 
  from products as p 
  left join cart as c 
  on p.product_id = c.product_id 
  where c.user_id = 2 ) as p 
  left join product_category as pc 
  on p.product_id = pc.product_id 
  group by p.product_id `;
  const count = `select count(*) as total from (${sql}) as data`;
  sql += "limit $size offset $page";
  const dataCart = await db.sequelize?.query<IFormDataCart>(sql, {
    bind: { page, size },
    type: QueryTypes.SELECT,
  });
  const dataCount = await db.sequelize?.query<Count>(count, {
    type: QueryTypes.SELECT,
  });
  return { dataCart, dataCount };
};
