import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  deleteDrinkById,
  fetchGetAllDrinks,
} from "../../services/DrinkService";
import { Table } from "antd";

const DrinkTableAnt = () => {
  const [drinks, setDrinks] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getAllDrinks = async () => {
    const res = await fetchGetAllDrinks();

    if (res && res.result) {
      const data = res.result.map((result, index) => ({
        ...result,
        key: index + 1,
      }));
      console.log("Drink data: ", data);
      setDrinks(data);
    }
  };

  useEffect(() => {
    getAllDrinks();
  }, []);

  const navigator = useNavigate();

  const deleteDrink = async (id) => {
    const res = await deleteDrinkById(id);

    if (res && res.message) {
      toast.success(res.message);
      getAllDrinks();
    } else {
      toast.error("Error deleting drink");
    }
  };

  const columns = [
    {
      key: "1",
      title: "#",
      dataIndex: "key",
      sorter: (drink1, drink2) => {
        return drink1.key > drink2.key;
      },
    },
    {
      key: "2",
      title: "Drink Name",
      dataIndex: "name",
      sorter: (drink1, drink2) => {
        return drink1.name > drink2.name;
      },
    },
    {
      key: "3",
      title: "Price",
      dataIndex: "price",
      sorter: (drink1, drink2) => {
        return drink1.price > drink2.price;
      },
    },
    {
      key: "4",
      title: "Active",
      dataIndex: "isActive",
      render: (isActive) => <p>{isActive ? "Active" : "Inactive"}</p>,
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => {
        return record.isActive === value;
      },
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => navigator(`/admin/edit-drink/${record.id}`)}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => deleteDrink(record.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="templatemo-content-widget white-bg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Drink Management</h2>
        <button
          className="templatemo-blue-button"
          onClick={() => navigator("/admin/drinks/add")}
        >
          Add new drink
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={drinks}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          onChange: (pageNumber, pageSize) => {
            setPageNumber(pageNumber), setPageSize(pageSize);
          },
        }}
      ></Table>
    </div>
  );
};

export default DrinkTableAnt;
