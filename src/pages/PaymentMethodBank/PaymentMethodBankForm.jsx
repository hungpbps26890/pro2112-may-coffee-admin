import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import FormikControl from "../../components/FormControl/FormikControl";
import { toast } from "react-toastify";
import {
  fetchGetPaymentMethodBankById,
  postCreatePaymentMethodBank,
  putUpdatePaymentMethodBank,
} from "../../services/PaymentMethodBankService";
import { fetchAllPaymentMethods } from "../../services/PaymentMethodService";
import { fetchAllBanks } from "../../services/BankService";


const PaymentMethodBankForm = () => {
  const [formValues, setFormValues] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [banks, setBanks] = useState(null);

  const { id } = useParams();

  const navigator = useNavigate();

  const getPaymentMethodBankById = async (id) => {
    const res = await fetchGetPaymentMethodBankById(id);

    if (res && res.result) {
      setFormValues(res.result);
    }
  };

  const getPaymentMethods = async () => {
    const res = await fetchAllPaymentMethods();

    if (res && res.result) {
      setPaymentMethods(res.result)
    }
  }

  const getBanks = async () => {
    const res = await fetchAllBanks();

    if (res && res.result) {
      setBanks(res.result)
    }
  }

  useEffect(() => {
    if (id) {
      getPaymentMethodBankById(id);
    }
  }, [id]);

  useEffect(() => {
    getPaymentMethods();
    getBanks();
  }, []);

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data: ", values);

    if (id) {
      handleUpdatePaymentMethodBank(id, values);
    } else {
      handleSavePaymentMethodBank(values);
    }

    navigator("/admin/payment-method-banks");

    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const handleSavePaymentMethodBank = async (data) => {
    const res = await postCreateCategory(data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Add a new payment method bank successfull!");
    } else {
      toast.error("Error adding a new payment method bank!");
    }
  };

  const handleUpdatePaymentMethodBank = async (id, data) => {
    const res = await putUpdateCategory(id, data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Update payment method bank successfull!");
    } else {
      toast.error("Error updating a payment method bank!");
    }
  };

  return (
    <div className="templatemo-content-widget no-padding">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="text-uppercase">Payment Method Bank Form</h2>
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
                  label="Owner"
                  name="owner"
                />
                <FormikControl
                  control="input"
                  label="Credit Card"
                  name="creditCard"
                />
                <FormikControl
                  control="input"
                  label="Total Price"
                  name="totalPrice"
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

export default PaymentMethodBankForm;
