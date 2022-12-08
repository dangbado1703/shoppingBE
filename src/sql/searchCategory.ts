import { QueryTypes } from "sequelize";
import db from "../config/config";

export const searchCategory: (searchObj: {
  name: string | undefined;
  offset: string;
  size: string;
}) => Promise<{
  dataSearch: object[] | undefined;
  count: any;
}> = async (searchObj: {
  name: string | undefined;
  offset: string;
  size: string;
}) => {
  let sql = "select * from category where true ";
  if (searchObj.name) {
    sql += "and lower(name) like lower(concat('%', $name, '%')) ";
  }
  const countQuery = `select count(*) as total from (${sql}) as data`;
  sql += "order by name desc limit $size offset $offset";
  const dataSearch = await db.sequelize?.query(sql, {
    bind: searchObj,
    type: QueryTypes.SELECT,
  });
  const count = await db.sequelize?.query(countQuery, {
    bind: searchObj,
    type: QueryTypes.SELECT,
  });
  return { dataSearch, count };
};
