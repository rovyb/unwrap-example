import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/general.module.css'

export default function Home() {
  const [clusters, setClusters] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/getClusters/')
      const JSON = await response.json()
      setClusters(JSON.results)
    })()
  }, []) 

  const changeStatus = async (id, status) => {
    const newStatus = (status === 1 ? "0" : "1")
    const response = await fetch('/api/updateData', {
      method: 'POST',
      body: JSON.stringify({
        "table": "feedback_clusters",
        "field": `accepted = ${newStatus}`,
        "IDLabel": "id",
        "id": id,
      }),
    })
    const JSON = await response.json()
  }
  return (
    <div className={styles.container}>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.clusterDetail}>id</th>
            <th className={styles.clusterDetail}>Title</th>
            <th className={styles.clusterDetail}>Status</th>
            <th className={styles.clusterDetail}>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map(cluster => {
            return <tr key={cluster.id} className={styles.tableItem}>
              <td className={styles.clusterDetailID}>{cluster.id}</td>
              <td className={styles.clusterDetailTitle}>{cluster.title}</td>
              <td className={styles.clusterDetailAccepted}>{cluster.accepted === 1 ? "Accepted" : "Not accepted"}</td>
              <td><button onClick={() => changeStatus(cluster.id, cluster.accepted)}>Change</button></td>
              <td><Link className={styles.edit} href={`/cluster/${cluster.id}`}>See details</Link></td>
              </tr>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
