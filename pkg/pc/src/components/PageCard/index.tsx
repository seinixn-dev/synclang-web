import { Card } from 'antd'
import { CardProps } from 'antd/es/card/Card'
import { FC } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'

interface Props extends CardProps {}
const PageCard: FC<Props> = ({ children, className, ...otherProps }) => {
  return (
    <Card size={'small'} {...otherProps} className={classNames(styles.card, className)}>
      {children}
    </Card>
  )
}

export default PageCard
