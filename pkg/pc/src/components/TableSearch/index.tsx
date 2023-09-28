import { Form, Input, Row, Col, Button, Space } from 'antd'
import { FC, ReactNode } from 'react'

interface Item {
  label?: ReactNode
  name?: string | number | (string | number)[]
  render?: () => ReactNode
}
interface Props {
  items: Item[]
  showReset?: boolean
  onSearch?: (values: any) => void
  onReset?: () => void
}
const TableSearch: FC<Props> = ({ items, showReset, onSearch, onReset }) => {
  const [form] = Form.useForm()
  const handleSearch = () => {
    const values = form.getFieldsValue()
    onSearch?.(values)
  }
  const handleReset = () => {
    form?.resetFields()
    onReset?.()
  }
  return (
    <Form layout={'inline'} form={form}>
      <Row gutter={16} style={{ width: '100%' }}>
        {items?.map((item, index) => {
          const key = item?.name?.toString() || index
          return (
            <Col span={6} style={{ marginBottom: items?.length > 3 ? 12 : 0 }} key={key}>
              <Form.Item {...item}>
                {item?.render ? item?.render?.() : <Input allowClear />}
              </Form.Item>
            </Col>
          )
        })}
        <Col span={6} key={'action'}>
          <Space>
            {showReset && <Button onClick={handleReset}>重置</Button>}
            <Button type={'primary'} onClick={handleSearch}>
              搜索
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default TableSearch
