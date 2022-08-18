import {executeQuery} from '../../lib/db'

export default async function handler(req, res) {

  try {
    const query = "SELECT * FROM feedback_clusters"
    const values = [];
    const data = await executeQuery(query, values)
    res.status(200).json({results: data})
  } catch (error) {
    console.log(error)
  }
}

