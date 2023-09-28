import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import PageCard from '@/components/PageCard'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const List = () => {
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>
    }
  ]

  const searchItems = [
    {
      label: '项目名称',
      name: 'name'
    }
  ]

  return (
    <div>
      <PageCard>
        <TableSearch items={searchItems} />
      </PageCard>
      <PageCard>
        <Table
          toolBarRender={[
            <Button key={'add'} type={'primary'} icon={<PlusOutlined />}>
              新增
            </Button>
          ]}
          columns={columns}
          dataSource={[]}
        />
      </PageCard>
    </div>
  )
}

export default List
