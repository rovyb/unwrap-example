import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/general.module.css'

export default function clusterID(props) {
  const [sentences, setSentences] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/sentences/' + router.query.id)
      const JSON = await response.json()
      setSentences(JSON.results)
    })()
  }, [router])

  console.log(sentences)
  return (
    <div className={styles.container}>
      <div>
        Cluster: {router.query.id}
      </div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.clusterDetail}>id</th>
            <th className={styles.clusterDetail}>Sentence</th>
            <th className={styles.clusterDetail}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sentences.map(sentence => {
            return <tr key={sentence.sentence_id} className={styles.tableItem}>
              <td className={styles.sentenceID}>{sentence.id}</td>
              <td className={styles.sentenceText}>{sentence.sentence_text}</td>
              <td className={styles.sentenceDate}>{sentence.feedback_date}</td>
              </tr>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )


}