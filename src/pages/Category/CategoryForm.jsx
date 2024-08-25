import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import FormikControl from "../../components/FormControl/FormikControl";
import { toast } from "react-toastify";
import {
  fetchGetCategoryById,
  postCreateCategory,
  putUpdateCategory,
} from "../../services/CategoryService";

const CategoryForm = () => {
  const [formValues, setFormValues] = useState(null);

  const { id } = useParams();

  const navigator = useNavigate();

  const getCategoryById = async (id) => {
    const res = await fetchGetCategoryById(id);

    if (res && res.result) {
      setFormValues(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryById(id);
    }
  }, [id]);

  const initialValues = {
    name: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data: ", values);

    if (id) {
      handleUpdateCategory(id, values);
    } else {
      handleSaveCategory(values);
    }

    navigator("/admin/categories");

    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const handleSaveCategory = async (data) => {
    const res = await postCreateCategory(data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Add a new category successfull!");
    } else {
      toast.error("Error adding a new category!");
    }
  };

  const handleUpdateCategory = async (id, data) => {
    const res = await putUpdateCategory(id, data);

    if (res && res.result) {
      console.log(res.result);
      toast.success("Update category successfull!");
    } else {
      toast.error("Error updating a category!");
    }
  };

  return (
    <div className="templatemo-content-widget no-padding">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="text-uppercase">Category Form</h2>
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
                  label="Category name"
                  name="name"
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

export default CategoryForm;
