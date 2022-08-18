import {executeQuery} from '../../../lib/db'


export default async function handler(req, res) {
  try {
    const query = `SELECT * FROM feedback_sentences WHERE id IN (SELECT sentence_id FROM sentence_cluster_mapping WHERE cluster_id = ${req.query.clusterid})`
    const values = [];
    const data = await executeQuery(query, values)
    res.status(200).json({results: data})
  } catch (error) {
    console.log(error)
  }
}

