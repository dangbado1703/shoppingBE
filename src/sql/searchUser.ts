import { QueryTypes } from "sequelize";
import db from "../config/config";
import { FormSearchUser } from "../type/searchUser.type";

export const searchUser = async (searchObj: Partial<FormSearchUser>) => {
  let sql =
    "select user_id, username, phone_number, email, is_active,birthday from users where true ";
  if (searchObj) {
    if (searchObj.email) {
      sql += "and lower(email) like lower(concat ('%', $email, '%')) ";
    }
    if (searchObj.phone_number) {
      sql +=
        "and lower(phone_number) like lower(concat ('%', $phone_number, '%')) ";
    }
    if (searchObj.username) {
      sql += "and lower(username) like lower(concat ('%', $username, '%')) ";
    }
    if (searchObj.is_active === 1) {
      sql += "and is_active = 1 ";
    }
    if (searchObj.is_active === 0) {
      sql += "and is_active = '0' ";
    }
    if (searchObj.birthday_from) {
      sql += "and birthday>= $birthday_from ";
    }
    if (searchObj.birthday_to) {
      sql += "and birthday <= $birthday_to ";
    }
    const queryCount = `select count(*) as total from (${sql}) as search`;
    sql += `order by createdAt desc limit $size offset $offset`;
    const dataSearch = await db.sequelize?.query(sql, {
      bind: searchObj,
      type: QueryTypes.SELECT,
    });
    const dataCount = await db.sequelize?.query(queryCount, {
      bind: searchObj,
      type: QueryTypes.SELECT,
    });
    return { dataSearch, dataCount };
  }
};

// export const countUser = ({ id }: { id: string | undefined }) => {
//   const sql = "select count($id) as total from users";
//   return db.sequelize?.query(sql, {
//     bind: { id },
//     type: QueryTypes.SELECT,
//   });
// };
