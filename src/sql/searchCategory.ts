import { QueryTypes } from "sequelize";
import db from "../config/config";
import { IFormCategory } from "../type/category.type";
interface Count {
  total: number | undefined;
}

export const searchCategory: (searchObj: {
  name: string | undefined;
  offset: string;
  size: string;
}) => Promise<{
  dataSearch: IFormCategory[] | undefined;
  count: Count[] | undefined;
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
  const dataSearch = await db.sequelize?.query<IFormCategory>(sql, {
    bind: searchObj,
    type: QueryTypes.SELECT,
  });
  const count = await db.sequelize?.query<Count>(countQuery, {
    bind: searchObj,
    type: QueryTypes.SELECT,
  });
  return { dataSearch, count };
};
