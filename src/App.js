import "./App.css";
import { Form, Input, Button, Table, Modal } from "antd";
import React, { useState } from "react";
import { Select, DatePicker, Tag } from "antd";
import moment from "moment";
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

function App() {
  const [form] = Form.useForm()
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: moment(),
    tags: [],
    status: "OPEN",
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true
  });


  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };


  const columns = [
    {
      title: "Timestamp created",
      dataIndex: "timestamp",
      key: `timestamp ${Math.floor((Math.random() * 1000) + 1)}`,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: `title ${Math.floor((Math.random() * 1000) + 1)}`,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Search Here"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        )
      },

      filterIcon: () => {
        return <SearchOutlined />;
      },

      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: `description ${Math.floor((Math.random() * 1000) + 1)}`,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: `dueDate ${Math.floor((Math.random() * 1000) + 1)}`,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: `tags ${Math.floor((Math.random() * 1000) + 1)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: `status ${Math.floor((Math.random() * 1000) + 1)}`,
    }, //test
    {
      title: "Action",
      key: `action" ${Math.floor((Math.random() * 1000) + 1)}`, 
    }
  ];


  const addTask = () => {
    setTasks([
      ...tasks,
      {
        timestamp: moment().format("MM/DD/YYYY h:mm:ss a"),
        ...task,
      },
    ]);
    setTask({
      title: "",
      description: "",
      dueDate: moment(),
      tags: [],
      status: "OPEN"
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form form={form}>
          <Form.Item name="title" label="Title">
            <Input
              value={task.title}
              required
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={task.description}
              required
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              value={task.dueDate}
              onChange={(date) => setTask({ ...task, dueDate: date })}
            />
          </Form.Item>
          <Form.Item label="Tags">
            <Select
              mode="tags"
              value={task.tags}
              onChange={(tags) => setTask({ ...task, tags })}
            />
          </Form.Item>

          <Form.Item label="Status">
            <Select
              value={task.status}
              onChange={(status) => setTask({ ...task, status })}
            />
          </Form.Item>


          <Form.Item>
            <Button block type="primary" htmlType='submit' onClick={addTask}>
              Add Task
            </Button>
          </Form.Item>
        <Table columns={columns} dataSource={tasks} pagination={pagination} onChange={handleTableChange} />
        </Form>
      </header>
    </div>
  );
}

export default App;
