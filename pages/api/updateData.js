import {executeQuery} from '../../lib/db'

export default async function handler(req, res) {
  console.log(req.body[0])
  try {
    // TABLE - FIELD - IDLABEL - ID
    const query = `UPDATE ${req.body.table} SET ${req.body.field} WHERE ${req.body.IDLabel} = ${req.body.id}`
    const values = [];
    const data = await executeQuery(query, values)
    res.status(200).json({results: data})
  } catch (error) {
    console.log(error)
  }
}

//Frontend request should have params:
// table, field, IDLabel, id