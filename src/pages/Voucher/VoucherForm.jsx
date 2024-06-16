import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import FormikControl from "../../components/FormControl/FormikControl";
import { toast } from "react-toastify";
import {
  fetchGetVoucherById,
  postCreateVoucher,
  putUpdateVoucher,
} from "../../services/VoucherService";
import { fetchAllCategories } from "../../services/CategoryService";
import { fetchAllVoucherTypes } from "../../services/VoucherTypeService";

const VoucherForm = () => {
  const [formValues, setFormValues] = useState(null);
  const [voucherTypes, setVoucherTypes] = useState([]);

  const { id } = useParams();

  const navigator = useNavigate();

  const getVoucherById = async (id) => {
    const res = await fetchGetVoucherById(id);

    if (res && res.result) {
      const voucher = res.result;
      setFormValues({
        ...voucher,
        voucherTypeId: voucher.voucherType.id,
      });
    }
  };

  const getVoucherTypes = async () => {
    const res = await fetchAllVoucherTypes();

    if (res && res.result) {
      setVoucherTypes(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      getVoucherById(id);
    }
  }, [id]);

  useEffect(() => {
    getVoucherTypes();
  }, []);

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data: ", values);

    if (id) {
      handleUpdateVoucher(id, values);
    } else {
      handleSaveVoucher(values);
    }

    navigator("/admin/vouchers");

    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const handleSaveVoucher = async (data) => {
    const res = await postCreateVoucher(data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Add a new voucher successfull!");
    } else {
      toast.error("Error adding a new voucher!");
    }
  };

  const handleUpdateVoucher = async (id, data) => {
    const res = await putUpdateVoucher(id, data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Update voucher successfull!");
    } else {
      toast.error("Error updating a voucher!");
    }
  };

  return (
    <div className="templatemo-content-widget no-padding">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="text-uppercase">Voucher Form</h2>
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
                <div className={`form-group`}>
                  <label htmlFor="voucherTypeId" className="control-label">
                    Voucher Type
                  </label>
                  <Field
                    as="select"
                    id="voucherTypeId"
                    name="voucherTypeId"
                    className="form-control"
                  >
                    {voucherTypes.map((voucherType) => {
                      return (
                        <option key={voucherType.id} value={voucherType.id}>
                          {voucherType.name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
                <FormikControl
                  control="input"
                  label="Discount Code"
                  name="discountCode"
                />
                <FormikControl control="input" label="Amount" name="amount" />
                <FormikControl
                  control="input"
                  label="Begin Date"
                  name="beginDate"
                />
                <FormikControl
                  control="input"
                  label="End Date"
                  name="endDate"
                />
                <FormikControl control="input" label="Image" name="image" />

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

export default VoucherForm;
