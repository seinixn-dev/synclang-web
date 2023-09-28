import { Table as ATable, TableProps } from 'antd'
import { FC, ReactNode } from 'react'
import styles from './index.module.less'

interface Props<RecordType> extends TableProps<RecordType> {
  toolBarRender?: ReactNode[]
}
const Table: FC<Props<any>> = ({ pagination, toolBarRender, ...otherProps }) => {
  return (
    <>
      <section className={styles.toolbar}>
        <div></div>
        <div>{toolBarRender}</div>
      </section>
      <ATable
        rowKey={'id'}
        pagination={{
          hideOnSinglePage: true,
          ...pagination
        }}
        {...otherProps}
      />
    </>
  )
}

export default Table
