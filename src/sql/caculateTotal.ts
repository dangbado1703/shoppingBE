import { QueryTypes } from "sequelize";
import db from "../config/config";
import { Count, Total } from "../type";

export const caculateTotal: (product_id: number) => Promise<{
  dataTotal: Total[] | undefined;
  dataCount: Count[] | undefined;
}> = async (product_id: number) => {
  const total = `select sum(detail_rating.star) as totalItem from detail_rating where detail_rating.product_id = $product_id`;
  const count = `select count(*) as total from detail_rating where detail_rating.product_id = $product_id`;
  const dataTotal = await db.sequelize?.query<Total>(total, {
    bind: { product_id },
    type: QueryTypes.SELECT,
  });
  const dataCount = await db.sequelize?.query<Count>(count, {
    bind: { product_id },
    type: QueryTypes.SELECT,
  });
  return { dataTotal, dataCount };
};
