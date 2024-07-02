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
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import { uploadImageToCloudinary } from "../../services/upload-cloudinary";

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
        beginDate: format(new Date(voucher.beginDate), "MM/dd/yyyy"),
        endDate: format(new Date(voucher.endDate), "MM/dd/yyyy"),
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
    discountCode: "",
    amount: 0,
    beginDate: "",
    endDate: "",
    image: "",
    voucherTypeId: 1,
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
    discountCode: Yup.string().required("Required"),
    amount: Yup.number()
      .typeError("amount must be a number")
      .required("Required")
      .min(0, "Amount must equal or greater than 0"),
    beginDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    voucherTypeId: Yup.number().required("Required"),
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

  const handleImageChange = async (e, formik) => {
    const { target } = e;
    const { files } = target;
    const image = await uploadImageToCloudinary(files[0]);
    formik.setFieldValue("image", image);
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
                <div className="row form-group">
                  <div className="col-md-2">
                    <FormikControl
                      control="date"
                      label="Begin Date"
                      name="beginDate"
                    />
                  </div>
                  <div className="col-md-2">
                    <FormikControl
                      control="date"
                      label="End Date"
                      name="endDate"
                    />
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="image" className="control-label">
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, formik)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <img
                      src={formik.values.image}
                      className="img-thumbnail"
                      alt={formik.values.image}
                    />
                  </div>
                </div>
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
