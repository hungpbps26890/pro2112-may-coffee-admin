import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAllReview } from "../../services/ReviewService";
import { Space, Table } from "antd";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  const getAllReviews = async () => {
    const res = await fetchAllReview();

    if (res && res.result) {
      const data = res.result.map((element, index) => ({
        ...element,
        key: index + 1,
      }));
      setReviews(data);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const navigator = useNavigate();

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
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
        <h2>Voucher Type Management</h2>
      </div>
      <div className="panel panel-default table-responsive">
        <Table columns={columns} dataSource={reviews} />
      </div>
    </div>
  );
};

export default ReviewTable;
