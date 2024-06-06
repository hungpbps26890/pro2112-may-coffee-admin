import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import FormikControl from "../../components/FormControl/FormikControl";
import { toast } from "react-toastify";
import {
  fetchGetOrderById,
  postCreateOrder,
  putUpdateOrder,
} from "../../services/OrderService";

const OrderForm = () => {
  const [formValues, setFormValues] = useState(null);

  const { id } = useParams();

  const navigator = useNavigate();

  const getOrderById = async (id) => {
    const res = await fetchGetOrderById(id);

    if (res && res.result) {
      setFormValues(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id]);

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data: ", values);

    if (id) {
      handleUpdateOrder(id, values);
    } else {
      handleSaveOrder(values);
    }

    navigator("/admin/orders");

    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const handleSaveOrder = async (data) => {
    const res = await postCreateOrder(data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Add a new order successfull!");
    } else {
      toast.error("Error adding a new order!");
    }
  };

  const handleUpdateOrder = async (id, data) => {
    const res = await putUpdateOrder(id, data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Update order successfull!");
    } else {
      toast.error("Error updating an order!");
    }
  };

  return (
    <div className="templatemo-content-widget no-padding">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="text-uppercase">Order Form</h2>
        </div>
        <div className="panel-body">
          <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            enableReinitialize
          >
            {(formik) => (
              <Form className="templatemo-login-form">
                <FormikControl
                  control="input"
                  label="Total Price"
                  name="totalPrice"
                />
                <FormikControl
                  control="input"
                  label="User Name"
                  name="userName"
                />
                <FormikControl
                  control="input"
                  label="Create Date"
                  name="createDate"
                />
                <FormikControl
                  control="input"
                  label="Payment Status"
                  name="paymentStatus"
                />
                <FormikControl
                  control="input"
                  label="Table Number"
                  name="tableNumber"
                />
                <FormikControl
                  control="input"
                  label="Delivery Charge"
                  name="deliveryCharge"
                />
                <FormikControl
                  control="input"
                  label="Payment Method Bank"
                  name="paymentMethodBankId"
                />
                <FormikControl
                  control="input"
                  label="Order Status"
                  name="orderStatusId"
                />

                <div className="form-group">
                  <button
                    type="submit"
                    className="templatemo-blue-button margin-right-15"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="templatemo-white-button margin-right-15"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
