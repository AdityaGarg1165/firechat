import React from 'react'
import styles from '../styles/Home.module.css'
export default function Invalid() {
  return (
    <div>
      <h1 className={styles.fzf}>
        404
      </h1>
      <h2 className={styles.gnf}>
        The requested page is not found
      </h2>
    </div>
  )
}
